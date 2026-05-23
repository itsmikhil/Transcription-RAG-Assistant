import os
import whisper

ffmpeg_path = r"C:\Users\Mikhil\OneDrive\Desktop\ffmpeg-8.1.1-essentials_build\ffmpeg-8.1.1-essentials_build\bin"

os.environ["PATH"] = ffmpeg_path + os.pathsep + os.environ["PATH"]

model = whisper.load_model("base")

def transcribe_audio(audio_path: str):
    result = model.transcribe(audio_path)
    return result["text"]