from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import shutil
import os
import subprocess
from app.services.whisper_service import transcribe_audio

app=FastAPI()

#created a custom class 
class YTRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"Note":"Hello I am learning FastApi"}

# we had to use pydantic to tell that url will come in json body otherwise it searches in query params => /yt?url=abc
@app.post("/yt")
def read_yt_url(data: YTRequest):
    print(data.url)
    return {"url": data.url}


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    allowed_extensions = [".mp3", ".mp4", ".wav"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        return {
            "error": "Only mp3, mp4 and wav files are allowed"
        }

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # transcription
    transcript = transcribe_audio(file_path)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "path": file_path,
        "type": file.content_type,
        "transcript": transcript
    }