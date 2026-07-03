import whisper

# Lazy-loaded Whisper model
model = None

# for transcript extraction from video or audio files
# ffmpeg is a package is a multimedia processing tool.
# It is used for:
# audio conversion
# video conversion
# extracting audio from video
# compression
# format handling

def get_model():
    global model

    if model is None:
        model = whisper.load_model("tiny")

    return model


def transcribe_audio(audio_path: str):
    whisper_model = get_model()

    result = whisper_model.transcribe(audio_path)

    return result["text"]