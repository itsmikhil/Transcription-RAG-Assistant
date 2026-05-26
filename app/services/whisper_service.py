import os
import whisper

# for transcript extraction from video or audio files
# ffmpeg is a package is a multimedia processing tool.
# It is used for:
# audio conversion
# video conversion
# extracting audio from video
# compression
# format handling



ffmpeg_path = r"C:\Users\Mikhil\OneDrive\Desktop\ffmpeg-8.1.1-essentials_build\ffmpeg-8.1.1-essentials_build\bin"

os.environ["PATH"] = ffmpeg_path + os.pathsep + os.environ["PATH"]

model = whisper.load_model("base")

def transcribe_audio(audio_path: str):
    result = model.transcribe(audio_path)
    return result["text"]