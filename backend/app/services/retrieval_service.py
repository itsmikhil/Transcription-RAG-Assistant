from app.services.chroma_service import (
    get_collection
)


# find the most similar chunk
def retrieve_chunks(query: str):

    # Lazy import to avoid loading SentenceTransformer during app startup
    from app.services.embedding_service import generate_embedding

    # query embedding
    query_embedding = generate_embedding(
        query
    )

    # latest collection
    collection = get_collection()

    # search
    results = collection.query(

        query_embeddings=[query_embedding],

        n_results=3
    )

    formatted_results = []

    documents = results["documents"][0]

    metadatas = results["metadatas"][0]

    distances = results["distances"][0]

    for doc, metadata, distance in zip(

        documents,

        metadatas,

        distances
    ):

        formatted_results.append({

            "text": doc,

            "source_file": (
                metadata["source_file"]
            ),

            "chunk_number": (
                metadata["chunk_number"]
            ),

            "distance": distance
        })

    return formatted_results