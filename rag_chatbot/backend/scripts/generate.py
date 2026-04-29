import os
import sys
import time
import google.generativeai as genai
from typing import List, Dict, Optional

# Add backend directory to sys.path for sibling imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import config
from scripts.retrieve import Retriever

class Generator:
    def __init__(self, api_key: str = config.API_KEY, model_name: str = config.GEMINI_MODEL_NAME):
        if not api_key:
            raise ValueError("Gemini API Key not found. Please set it in .env file.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)
        self.generation_config = {
            "temperature": config.TEMPERATURE,
            "max_output_tokens": config.MAX_OUTPUT_TOKENS,
        }

    def format_prompt(self, query: str, context_chunks: List[Dict]) -> str:
        """Format the grounded prompt with context and query."""
        context_text = "\n\n".join([f"Source: {c['source']}\nContent: {c['text']}" for c in context_chunks])
        
        prompt = f"""
You are an expert academic research assistant. Use the provided context to answer the user's query.
Follow these rules strictly:
1. Ground your answer ONLY in the provided context.
2. If the answer is not contained within the context, state: "I'm sorry, but I don't have enough information in the provided documents to answer that question."
3. Maintain a formal, academic tone.
4. Cite the source names when referencing information.

---
CONTEXT:
{context_text}
---

USER QUERY: {query}

ACADEMIC RESPONSE:
"""
        return prompt

    def generate_response(self, query: str, context_chunks: List[Dict], max_retries: int = 3) -> Dict:
        """Generate a response using Gemini grounded in context with exponential backoff."""
        prompt = self.format_prompt(query, context_chunks)
        
        start_time = time.time()
        delay = 2  # Initial delay for backoff
        
        for attempt in range(max_retries):
            try:
                response = self.model.generate_content(
                    prompt,
                    generation_config=self.generation_config
                )
                latency = time.time() - start_time
                
                return {
                    "answer": response.text.strip(),
                    "latency": latency,
                    "model": config.GEMINI_MODEL_NAME
                }
            except Exception as e:
                error_msg = str(e)
                if "429" in error_msg and attempt < max_retries - 1:
                    print(f"Rate limit (429) hit. Retrying in {delay} seconds... (Attempt {attempt + 1}/{max_retries})")
                    time.sleep(delay)
                    delay *= 2  # Exponential backoff
                    continue
                
                return {
                    "answer": f"An error occurred during generation: {error_msg}",
                    "latency": time.time() - start_time,
                    "model": config.GEMINI_MODEL_NAME
                }

def main():
    try:
        retriever = Retriever()
        generator = Generator()
        
        query = "Explain document loading in RAG."
        print(f"User: {query}")
        
        context = retriever.retrieve(query, k=3)
        print("Retrieved context...")
        
        response = generator.generate_response(query, context)
        print(f"\nResponse:\n{response['answer']}")
        print(f"\nLatency: {response['latency']:.2f}s")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
