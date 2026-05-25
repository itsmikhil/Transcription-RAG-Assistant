import os

from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embedding
from app.services.chroma_service import store_embedding
from app.services.whisper_service import (
    transcribe_audio
)

TRANSCRIPT_FOLDER = "uploads/transcripts"
CHUNKS_FOLDER = "uploads/chunks"

os.makedirs(TRANSCRIPT_FOLDER, exist_ok=True)
os.makedirs(CHUNKS_FOLDER, exist_ok=True)

def process_media_file(

    file_path: str,

    source_name: str,

    unique_id: str
):

    # generate transcript using whisper
    transcript = transcribe_audio(file_path)

    # pass transcript into pipeline
    result = process_transcript(

        transcript=transcript,

        source_name=source_name,

        unique_id=unique_id
    )

    return result

def process_transcript(

    transcript: str,

    source_name: str,

    unique_id: str
):

    # save transcript
    transcript_filename = unique_id + ".txt"

    transcript_path = os.path.join(
        TRANSCRIPT_FOLDER,
        transcript_filename
    )

    with open(transcript_path, "w", encoding="utf-8") as f:

        f.write(transcript)

    # chunking
    chunks = chunk_text(transcript)

    chunk_metadata = []

    for index, chunk in enumerate(chunks):

        chunk_number = index + 1

        chunk_filename = (
            f"{unique_id}_chunk_{chunk_number}.txt"
        )

        chunk_path = os.path.join(
            CHUNKS_FOLDER,
            chunk_filename
        )

        # save chunk
        with open(chunk_path, "w", encoding="utf-8") as f:

            f.write(chunk)

        # embedding
        embedding = generate_embedding(chunk)

        # store in chroma
        store_embedding(

            chunk_id=(
                f"{unique_id}_chunk_{chunk_number}"
            ),

            embedding=embedding,

            chunk_text=chunk,

            metadata={

                "source_file": source_name,

                "chunk_number": chunk_number
            }
        )

        chunk_metadata.append({

            "chunk_number": chunk_number,

            "chunk_file": chunk_filename
        })

    return {

        "transcript_path": transcript_path,

        "total_chunks": len(chunks),

        "chunk_metadata": chunk_metadata
    }