import os

ffmpeg_path = r"C:\Users\Mikhil\OneDrive\Desktop\ffmpeg-8.1.1-essentials_build\ffmpeg-8.1.1-essentials_build\bin"

os.environ["PATH"] = ffmpeg_path + os.pathsep + os.environ["PATH"]

import whisper

model = whisper.load_model("base")

result = model.transcribe("uploads/harvard.wav")

print(result["text"])