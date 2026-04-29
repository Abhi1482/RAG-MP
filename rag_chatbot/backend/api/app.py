import os
import sys
import time
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

# Add backend directory to sys.path for sibling imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import config
from scripts.retrieve import Retriever
from scripts.generate import Generator

# Logging Setup
logging.basicConfig(
    level=config.LOG_LEVEL,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("RAG_API")

app = FastAPI(title="Research-Grade RAG Chatbot API")

# CORS — required for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Components
try:
    retriever = Retriever()
    generator = Generator()
    logger.info("RAG components initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize RAG components: {e}")
    retriever = None
    generator = None

class ChatRequest(BaseModel):
    query: str
    k: int = config.TOP_K

class ChatResponse(BaseModel):
    answer: str
    retrieved_docs: List[Dict[str, Any]]
    scores: List[float]
    latency_ms: float
    model: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if retriever is None or generator is None:
        raise HTTPException(status_code=503, detail="RAG components not initialized. Check logs.")
    
    start_time = time.time()
    
    try:
        # 1. Retrieval
        context_chunks = retriever.retrieve(request.query, k=request.k)
        
        # 2. Generation
        gen_result = generator.generate_response(request.query, context_chunks)
        
        latency = (time.time() - start_time) * 1000 # convert to ms
        
        # 3. Logging
        logger.info(f"Query: {request.query}")
        logger.info(f"Retrieved Chunk IDs: {[c['id'] for c in context_chunks]}")
        logger.info(f"Gemini Latency: {gen_result['latency']:.2f}s")
        logger.info(f"Total API Latency: {latency:.2f}ms")
        
        return ChatResponse(
            answer=gen_result['answer'],
            retrieved_docs=context_chunks,
            scores=[c['score'] for c in context_chunks],
            latency_ms=latency,
            model=gen_result['model']
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
