from fastapi import FastAPI, UploadFile, File
from fastapi import Form

from pydantic import BaseModel

import shutil
import os
import uuid

from app.services.whisper_service import transcribe_audio
from app.services.retrieval_service import retrieve_chunks
from app.services.rag_service import generate_rag_answer
from app.services.yt_service import get_youtube_transcript
from app.services.pipeline_service import process_transcript,process_media_file

from app.services.chroma_service import (
    clear_collection
)

app = FastAPI()


# request model
class YTRequest(BaseModel):
    url: str


@app.get("/")
def read_root():

    return {
        "message": "Transcription AI Backend Running"
    }


# folders
UPLOAD_FOLDER = "uploads/media"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# upload local media
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # remove all old uploads
    clear_collection()

    # allowed file types
    allowed_extensions = [
        ".mp3",
        ".mp4",
        ".wav",
        ".m4a",
        ".mov"
    ]

    # extension
    extension = os.path.splitext(
        file.filename
    )[1].lower()

    # validate extension
    if extension not in allowed_extensions:

        return {
            "error": (
                "Only mp3, mp4, wav, m4a "
                "and mov files are allowed"
            )
        }

    # unique id
    unique_id = str(uuid.uuid4())

    # unique filename
    unique_filename = unique_id + extension

    # save path
    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )

    # save uploaded file
    with open(file_path, "wb") as buffer:

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

    # remove all old uploads
    clear_collection()

    # fetch youtube transcript
    transcript = get_youtube_transcript(
        data.url
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


# rag chat
@app.post("/chat")
def chat(query: str):

    user_id = "user_1"

    response = generate_rag_answer(
        query=query
    )

    return response