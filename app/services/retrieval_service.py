from app.services.chroma_service import collection
from app.services.embedding_service import generate_embedding


def retrieve_chunks(query: str):

    # convert query to embedding
    query_embedding = generate_embedding(query)

    # chroma search
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

            "source_file": metadata["source_file"],

            "chunk_number": metadata["chunk_number"],

            "distance": distance
        })

    return formatted_results