import chromadb

# create persistent chroma client
client = chromadb.PersistentClient(
    path="chroma_db"
)

# collection
collection = client.get_or_create_collection(
    name="transcription_chunks"
)


def store_embedding(
    chunk_id,
    embedding,
    chunk_text,
    metadata
):

    collection.add(

        ids=[chunk_id],

        embeddings=[embedding],

        documents=[chunk_text],

        metadatas=[metadata]
    )