import numpy as np
import faiss
import requests
from typing import List, Optional


class RAGService:
    """Service for RAG operations: chunking, embedding, retrieval"""

    def __init__(self, agent_url: str, embedding_model: str = "nomic-embed-text"):
        self.agent_url = agent_url
        self.embedding_model = embedding_model
        self.index = None
        self.chunks = []

    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """Split text into overlapping chunks"""
        chunks = []
        start = 0
        text_length = len(text)

        while start < text_length:
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start += (chunk_size - overlap)

        return chunks

    def get_embedding(self, text: str) -> np.ndarray:
        """Get embedding from Ollama API"""
        url = f"{self.agent_url}/api/embed"
        payload = {
            "model": self.embedding_model,
            "input": text
        }
        response = requests.post(url, json=payload)
        response.raise_for_status()
        result = response.json()
        if "embeddings" in result:
            embedding = result["embeddings"][0] if isinstance(result["embeddings"][0], list) else result["embeddings"]
        elif "embedding" in result:
            embedding = result["embedding"]
        else:
            raise ValueError(f"Unexpected response format from Ollama: {result}")
        return np.array(embedding, dtype="float32")

    def build_index(self, chunks: List[str]) -> None:
        """Build FAISS index from text chunks."""
        self.chunks = chunks

        embeddings = []
        for chunk in chunks:
            emb = self.get_embedding(chunk)
            embeddings.append(emb)

        embeddings_array = np.array(embeddings).astype("float32")
        dimension = embeddings_array.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings_array)

    def retrieve(self, query: str, k: int = 3) -> List[tuple]:
        """Retrieve top-k most relevant chunks"""
        if self.index is None or len(self.chunks) == 0:
            return []

        query_embedding = self.get_embedding(query)
        query_embedding = query_embedding.reshape(1, -1)

        k = min(k, len(self.chunks))
        distances, indices = self.index.search(query_embedding, k)

        return [(self.chunks[i[0]], i[1]) for i in zip(indices[0], distances[0])]

    def augment_prompt(self, query: str, context_chunks: List[str], rag_prompt: str) -> str:
        """Create augmented prompt with context"""
        context = "\n\n".join([f"Context {i+1}:\n{chunk}" for i, chunk in enumerate(context_chunks)])

        augmented_prompt = rag_prompt.replace("[context]", context)
        augmented_prompt = augmented_prompt.replace("[query]", query)

        return augmented_prompt
