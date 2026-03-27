import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Model Configuration
    EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
    GEMINI_MODEL_NAME = "gemini-flash-latest"
    
    # RAG Configuration
    CHUNK_SIZE = 150
    CHUNK_OVERLAP = 50
    TOP_K = 2
    
    # Gemini Configuration
    TEMPERATURE = 0.2
    MAX_OUTPUT_TOKENS = 512
    
    # Paths
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_DIR = os.path.join(BASE_DIR, "data")
    RAW_DOCS_DIR = os.path.join(DATA_DIR, "raw_docs")
    PROCESSED_CHUNKS_PATH = os.path.join(DATA_DIR, "processed_chunks.json")
    EMBEDDINGS_DIR = os.path.join(BASE_DIR, "embeddings")
    FAISS_INDEX_PATH = os.path.join(EMBEDDINGS_DIR, "faiss_index.bin")
    
    # API Settings
    API_KEY = os.getenv("GEMINI_API_KEY")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

config = Config()
