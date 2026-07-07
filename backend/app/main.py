
from fastapi import FastAPI, UploadFile, File
from fastapi import HTTPException

from pydantic import BaseModel
import shutil
import os
import uuid

from app.services.whisper_service import transcribe_audio
from app.services.retrieval_service import retrieve_chunks
from app.services.rag_service import generate_rag_answer
from app.services.yt_service import get_youtube_transcript
from app.services.pipeline_service import process_transcript,process_media_file
from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI
from fastapi.middleware.cors import CORSMiddleware



from app.services.chroma_service import (
    clear_collection
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://echoscribe-beta.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# request model
class YTRequest(BaseModel):
    url: str

class TranscriptRequest(BaseModel):
    filePath: str

class SummaryRequest(BaseModel):
    filePath: str

# root endpoint
@app.get("/")
def read_root():

    return {
        "message": "Transcription AI Backend Running"
    }


# making sure folders are there
# this creates the folder if its not there
os.makedirs("uploads/media", exist_ok=True)
os.makedirs("uploads/transcripts", exist_ok=True)
os.makedirs("uploads/chunks", exist_ok=True)


# upload local media
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # here we are removing all the prev collections because 
    clear_collection()

    # allowed file types
    allowed_extensions = [
        ".mp3",
        ".mp4",
        ".wav",
        ".m4a",
        ".mov"
    ]

    # finding the extension type
    extension = os.path.splitext(
        file.filename
    )[1].lower()

    # validate extension
    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Only mp3, mp4, wav, m4a and mov files are allowed."
        )

    # to handle same file uploads
    # unique id
    unique_id = str(uuid.uuid4())

    # creating unique file name
    unique_filename = unique_id + extension

    # save path
    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )

    # saving uploaded file
    # using python's inbuilt library :- shutil
    # used for performing all file operations
    # Create/open file in WRITE BINARY(wb) mode
    with open(file_path, "wb") as buffer:
        # shutil.copyfileobj(source, destination)
        shutil.copyfileobj(
            file.file,
            buffer
        )

    pipeline_result = process_media_file(

        file_path=file_path,

        source_name=file.filename,

        unique_id=unique_id
    )

    return {

        "message": (
            "File uploaded and processed successfully"
        ),

        "original_filename": file.filename,

        "stored_file": unique_filename,

        "transcript_path": (
            pipeline_result["transcript_path"]
        ),

        "total_chunks": (
            pipeline_result["total_chunks"]
        ),

        "chunk_metadata": (
            pipeline_result["chunk_metadata"]
        )
    }


# youtube processing
@app.post("/yt")
def process_youtube_video(data: YTRequest):

    clear_collection()

    # fetch youtube transcript
    try:
        transcript = get_youtube_transcript(
            data.url
        )
    except:
        print(f"YouTube transcript error: {e}")

        raise HTTPException(
            status_code=400,
            detail="Transcript is not available for this YouTube video."
        )

    # unique id
    unique_id = str(uuid.uuid4())

    # process transcript pipeline
    pipeline_result = process_transcript(

        transcript=transcript,

        source_name=data.url,

        unique_id=unique_id
    )

    return {

        "message": (
            "YouTube video processed successfully"
        ),

        "youtube_url": data.url,

        "transcript_path": (
            pipeline_result["transcript_path"]
        ),

        "total_chunks": (
            pipeline_result["total_chunks"]
        ),

        "chunk_metadata": (
            pipeline_result["chunk_metadata"]
        )
    }


# semantic search
@app.get("/search")
def search(query: str):

    results = retrieve_chunks(query)

    return {

        "query": query,

        "results": results
    }

class ChatRequest(BaseModel):
    query: str

# rag chat
@app.post("/chat")
def chat(data: ChatRequest):

    response = generate_rag_answer(
        query=data.query
    )

    return response

# this is the endpoint for getting summary
# jab jab hum kuch upload karte hai toh kaise apne aap summary aati hai
# ye wahi hai 
# ye bass by default mai aane waali short summary hai
# jo detailed waali aayegi woh /chat se aayegi
@app.post("/summary")
def generateSummary(data: SummaryRequest):
    with open(data.filePath, "r", encoding="utf-8") as f:
        transcript_text = f.read()

    llm = ChatMistralAI(
        model="mistral-small-latest",
        temperature=0
    )
    prompt = ChatPromptTemplate.from_template("""
        You are an expert summarizer.

        Transcript:
        {transcript_text}

        Generate a concise summary in exactly 3-5 sentences.
        Do not use headings.
        Do not use bullet points.
        Return plain text only.
        """)
    chain = prompt | llm

    summary = chain.invoke({
        "transcript_text": transcript_text
    })

    return{
        "summary": summary.content
    }

# to show transcript on frontend
@app.post("/transcript")
def get_transcript(data: TranscriptRequest):

    with open(data.filePath, "r", encoding="utf-8") as f:
        transcript = f.read()

    return {
        "transcript": transcript
    }