import chromadb

# persistent client
client = chromadb.PersistentClient(
    path="chroma_db"
)

COLLECTION_NAME = "transcription_chunks"


def get_collection():

    return client.get_or_create_collection(
        name=COLLECTION_NAME
    )


# store embedding
def store_embedding(

    chunk_id,

    embedding,

    chunk_text,

    metadata
):

    collection = get_collection()

    collection.add(

        ids=[chunk_id],

        embeddings=[embedding],

        documents=[chunk_text],

        metadatas=[metadata]
    )


# clear vector database
def clear_collection():

    try:

        client.delete_collection(
            name=COLLECTION_NAME
        )

    except:

        pass

    # recreate empty collection
    get_collection()