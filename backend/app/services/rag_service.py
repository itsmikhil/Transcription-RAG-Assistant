import os

from dotenv import load_dotenv

from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import PromptTemplate

from app.services.retrieval_service import retrieve_chunks

load_dotenv()

llm = None


def get_llm():
    global llm

    if llm is None:
        llm = ChatMistralAI(
            model="mistral-small-latest",
            api_key=os.getenv("MISTRAL_API_KEY"),
        )

    return llm


prompt_template = PromptTemplate(
    input_variables=["context", "question"],
    template="""
You are an AI assistant.

Answer the question ONLY using the provided context.

Context:
{context}

Question:
{question}
""",
)


def generate_rag_answer(query: str):
    retrieved_chunks = retrieve_chunks(query)

    context = "\n\n".join(
        [chunk["text"] for chunk in retrieved_chunks]
    )

    final_prompt = prompt_template.format(
        context=context,
        question=query,
    )

    response = get_llm().invoke(final_prompt)

    return {
        "query": query,
        "answer": response.content,
        "retrieved_chunks": retrieved_chunks,
    }