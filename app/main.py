from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from app.services.whisper_service import transcribe_audio
from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embedding
from app.services.chroma_service import store_embedding
from app.services.retrieval_service import retrieve_chunks
from app.services.rag_service import generate_rag_answer

import shutil
import os
import uuid

app = FastAPI()


# custom request model
class YTRequest(BaseModel):
    url: str


@app.get("/")
def read_root():
    return {
        "message": "Transcription AI Backend Running"
    }


# youtube url endpoint
@app.post("/yt")
def read_yt_url(data: YTRequest):

    return {
        "url": data.url
    }


# folders
UPLOAD_FOLDER = "uploads/media"
TRANSCRIPT_FOLDER = "uploads/transcripts"
CHUNKS_FOLDER = "uploads/chunks"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TRANSCRIPT_FOLDER, exist_ok=True)
os.makedirs(CHUNKS_FOLDER, exist_ok=True)


# upload endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # allowed file types
    allowed_extensions = [".mp3", ".mp4", ".wav"]

    # extract extension
    extension = os.path.splitext(file.filename)[1].lower()

    # validate extension
    if extension not in allowed_extensions:

        return {
            "error": "Only mp3, mp4 and wav files are allowed"
        }

    # generate unique id
    unique_id = str(uuid.uuid4())

    # unique audio filename
    unique_filename = unique_id + extension

    # final audio path
    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )

    # save uploaded file
    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    # transcription
    transcript = transcribe_audio(file_path)

    # transcript filename
    transcript_filename = unique_id + ".txt"

    # transcript path
    transcript_path = os.path.join(
        TRANSCRIPT_FOLDER,
        transcript_filename
    )

    # save transcript
    with open(transcript_path, "w", encoding="utf-8") as f:

        f.write(transcript)
    
    # generate chunks
    chunks = chunk_text(transcript)
    chunk_files = []
    chunk_metadata = []

    for index, chunk in enumerate(chunks):

        chunk_number = index + 1

        chunk_filename = f"{unique_id}_chunk_{chunk_number}.txt"

        chunk_path = os.path.join(
            CHUNKS_FOLDER,
            chunk_filename
        )

        with open(chunk_path, "w", encoding="utf-8") as f:

            f.write(chunk)

        chunk_files.append(chunk_filename)

        # generate embedding
        embedding = generate_embedding(chunk)

        store_embedding(

            chunk_id=f"{unique_id}_chunk_{chunk_number}",

            embedding=embedding,

            chunk_text=chunk,

            metadata={

                "source_file": file.filename,

                "chunk_number": chunk_number

            }
        )

        chunk_metadata.append({

            "chunk_number": chunk_number,

            "chunk_file": chunk_filename,

            "chunk_text": chunk,

            "embedding_dimension": len(embedding)

        })

    return {
        "message": "File uploaded successfully",

        # original filename from user
        "original_filename": file.filename,

        # stored unique filenames
        "stored_audio_file": unique_filename,
        "stored_transcript_file": transcript_filename,

        "audio_path": file_path,
        "transcript_path": transcript_path,

        "type": file.content_type,
        "total_chunks": len(chunks),
        "chunk_files": chunk_files,

        "transcript": transcript
    }

@app.get("/search")
def search(query: str):

    results = retrieve_chunks(query)

    return {
        "query": query,
        "results": results
    }

@app.post("/chat")
def chat(query: str):

    response = generate_rag_answer(query)

    return response