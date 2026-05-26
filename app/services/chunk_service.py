from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(text: str):
    # keeps breaking into smaller chunks until target is met ==> thats why Recursive
    text_splitter = RecursiveCharacterTextSplitter(

        chunk_size=500,
        chunk_overlap=100, #overalp for continued context
        # splitting priority
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    chunks = text_splitter.split_text(text)

    return chunks