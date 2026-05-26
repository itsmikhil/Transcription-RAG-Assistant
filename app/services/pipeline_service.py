import os

from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embedding
from app.services.chroma_service import store_embedding
from app.services.whisper_service import (
    transcribe_audio
)

# folder setup
TRANSCRIPT_FOLDER = "uploads/transcripts"
CHUNKS_FOLDER = "uploads/chunks"

os.makedirs(
    TRANSCRIPT_FOLDER,
    exist_ok=True
)

os.makedirs(
    CHUNKS_FOLDER,
    exist_ok=True
)


# media pipeline
def process_media_file(

    file_path: str, #where file is stored

    source_name: str, #orginal file name

    unique_id: str #unique number which we are giving to file
):

    # generate transcript
    transcript = transcribe_audio(
        file_path
    )

    # process transcript
    result = process_transcript(

        transcript=transcript,

        source_name=source_name,

        unique_id=unique_id
    )

    return result


# transcript pipeline for yt video transcripts
def process_transcript(

    transcript: str, 

    source_name: str,

    unique_id: str
):

    # unique file name
    transcript_filename = (
        unique_id + ".txt"
    )
    # destination where we need to store it
    transcript_path = os.path.join(

        TRANSCRIPT_FOLDER,

        transcript_filename
    )

    # saving it locally in folder
    with open(

        transcript_path,

        "w",

        encoding="utf-8"
    ) as f:

        f.write(transcript)

    # chunking process
    chunks = chunk_text(transcript)

    # metadata list
    chunk_metadata = []

    # process chunks
    for index, chunk in enumerate(chunks):
        # giving number to chunks
        chunk_number = index + 1

        # filename for chunks
        chunk_filename = (
            f"{unique_id}_chunk_{chunk_number}.txt"
        )
        # path where we need to store them
        chunk_path = os.path.join(

            CHUNKS_FOLDER,

            chunk_filename
        )

        # writing data
        with open(

            chunk_path,

            "w",

            encoding="utf-8"
        ) as f:

            f.write(chunk)

        # embedding genration
        embedding = generate_embedding(
            chunk
        )

        # storing embedding in chromadb
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

        # save metadata
        chunk_metadata.append({

            "chunk_number": chunk_number,

            "chunk_file": chunk_filename
        })

    return {

        "transcript_path": transcript_path,

        "total_chunks": len(chunks),

        "chunk_metadata": chunk_metadata
    }