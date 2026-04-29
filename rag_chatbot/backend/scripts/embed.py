import os
import sys
import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# Add backend directory to sys.path for sibling imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import config

class Embedder:
    def __init__(self, model_name: str = config.EMBEDDING_MODEL_NAME):
        print(f"Loading embedding model: {model_name}...")
        self.model = SentenceTransformer(model_name)
        self.dimension = self.model.get_sentence_embedding_dimension()

    def generate_embeddings(self, texts: list[str]) -> np.ndarray:
        """Generate embeddings for a list of texts."""
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        return embeddings

    def create_faiss_index(self, embeddings: np.ndarray) -> faiss.Index:
        """Create a FAISS index from embeddings."""
        index = faiss.IndexFlatL2(self.dimension)
        index.add(embeddings.astype('float32'))
        return index

    def save_index(self, index: faiss.Index, path: str):
        """Save FAISS index to disk."""
        os.makedirs(os.path.dirname(path), exist_ok=True)
        faiss.write_index(index, path)
        print(f"FAISS index saved to {path}")

    def load_index(self, path: str) -> faiss.Index:
        """Load FAISS index from disk."""
        if not os.path.exists(path):
            raise FileNotFoundError(f"Index file not found: {path}")
        return faiss.read_index(path)

def main():
    # Load processed chunks
    if not os.path.exists(config.PROCESSED_CHUNKS_PATH):
        print(f"No processed chunks found at {config.PROCESSED_CHUNKS_PATH}. Please run preprocess.py first.")
        return

    with open(config.PROCESSED_CHUNKS_PATH, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    texts = [chunk['text'] for chunk in chunks]
    
    embedder = Embedder()
    embeddings = embedder.generate_embeddings(texts)
    
    index = embedder.create_faiss_index(embeddings)
    embedder.save_index(index, config.FAISS_INDEX_PATH)
    
    print(f"Successfully processed {len(texts)} chunks and created FAISS index.")

if __name__ == "__main__":
    main()
