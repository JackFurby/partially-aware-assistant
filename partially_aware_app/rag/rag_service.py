import numpy as np
import faiss
import requests
from typing import List


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
		# Handle both single embedding and batch embeddings
		if 'embeddings' in result:
			embedding = result['embeddings'][0] if isinstance(result['embeddings'][0], list) else result['embeddings']
		elif 'embedding' in result:
			embedding = result['embedding']
		else:
			raise ValueError(f"Unexpected response format from Ollama: {result}")
		return np.array(embedding, dtype='float32')

	def build_index(self, chunks: List[str]) -> None:
		"""Build FAISS index from text chunks.

		Faiss is a library by Meta for efficient similarity search and clustering of dense vectors
		"""
		self.chunks = chunks

		# Get embeddings for all chunks
		embeddings = []
		for chunk in chunks:
			emb = self.get_embedding(chunk)
			embeddings.append(emb)

		# Convert to numpy array
		embeddings_array = np.array(embeddings).astype('float32')

		# Create FAISS index
		dimension = embeddings_array.shape[1]
		self.index = faiss.IndexFlatL2(dimension)  # L2 distance
		self.index.add(embeddings_array)

	def retrieve(self, query: str, k: int = 3) -> List[str]:
		"""Retrieve top-k most relevant chunks"""
		if self.index is None or len(self.chunks) == 0:
			return []

		# Get query embedding
		query_embedding = self.get_embedding(query)
		query_embedding = query_embedding.reshape(1, -1)

		# Search
		k = min(k, len(self.chunks))  # set k (number of chunks to return) to either user provided k or number of chunks. The smallest value will be used
		distances, indices = self.index.search(query_embedding, k)  # get nearest embedings to the query embedding

		# Return chunks
		return [self.chunks[i] for i in indices[0]]  # return chunks matching nearest embedings

	def augment_prompt(self, query: str, context_chunks: List[str]) -> str:
		"""Create augmented prompt with context"""
		context = "\n\n".join([f"Context {i+1}:\n{chunk}" for i, chunk in enumerate(context_chunks)])

		augmented_prompt = f"""You are a helpful assistant. Use the following context to answer the user's question. If the context doesn't contain relevant information, say so.

{context}

User Question: {query}

Answer:"""
		return augmented_prompt
