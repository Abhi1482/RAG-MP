import json
import numpy as np
import faiss
from typing import List, Dict
from sentence_transformers import SentenceTransformer
from config import config

class Retriever:
    def __init__(self, index_path: str = config.FAISS_INDEX_PATH, 
                 chunks_path: str = config.PROCESSED_CHUNKS_PATH,
                 model_name: str = config.EMBEDDING_MODEL_NAME):
        
        self.model = SentenceTransformer(model_name)
        self.index = faiss.read_index(index_path)
        
        with open(chunks_path, 'r', encoding='utf-8') as f:
            self.chunks = json.load(f)

    def retrieve(self, query: str, k: int = config.TOP_K) -> List[Dict]:
        """Retrieve top k relevant chunks for a query."""
        query_vector = self.model.encode([query], convert_to_numpy=True).astype('float32')
        distances, indices = self.index.search(query_vector, k)
        
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.chunks):
                chunk = self.chunks[idx].copy()
                chunk['score'] = float(dist)
                results.append(chunk)
                
        return results

def main():
    try:
        retriever = Retriever()
        query = "What are the components of RAG?"
        print(f"Query: {query}")
        
        results = retriever.retrieve(query)
        for i, res in enumerate(results):
            print(f"\nResult {i+1} (Score: {res['score']:.4f}):")
            print(f"Source: {res['source']}")
            print(f"Text: {res['text'][:200]}...")
    except Exception as e:
        print(f"Error: {e}. Ensure you have run preprocess.py and embed.py first.")

if __name__ == "__main__":
    main()
