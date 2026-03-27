import os
import json
import re
from typing import List, Dict
from pypdf import PdfReader
from config import config

class Preprocessor:
    def __init__(self, chunk_size: int = config.CHUNK_SIZE, overlap: int = config.CHUNK_OVERLAP):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def load_pdf(self, file_path: str) -> str:
        """Extract text from a PDF file."""
        text = ""
        try:
            reader = PdfReader(file_path)
            for page in reader.pages:
                text += page.extract_text() + " "
        except Exception as e:
            print(f"Error reading PDF {file_path}: {e}")
        return text

    def load_txt(self, file_path: str) -> str:
        """Extract text from a TXT file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"Error reading TXT {file_path}: {e}")
            return ""

    def clean_text(self, text: str) -> str:
        """Basic text cleaning."""
        # Replace multiple spaces/newlines with single space
        text = re.sub(r'\s+', ' ', text)
        # Remove non-printable characters
        text = "".join(filter(lambda x: x.isprintable(), text))
        return text.strip()

    def chunk_text(self, text: str, source_name: str) -> List[Dict]:
        """Split text into overlapping chunks."""
        words = text.split()
        chunks = []
        
        if not words:
            return []
            
        i = 0
        chunk_id = 0
        while i < len(words):
            end = i + self.chunk_size
            chunk_words = words[i:end]
            chunk_text = " ".join(chunk_words)
            
            chunks.append({
                "id": f"{source_name}_{chunk_id}",
                "text": chunk_text,
                "source": source_name,
                "start_word": i,
                "end_word": min(i + len(chunk_words), len(words))
            })
            
            chunk_id += 1
            # Move index forward by chunk_size - overlap
            i += (self.chunk_size - self.overlap)
            
            # Prevent infinite loop if overlap >= chunk_size
            if self.chunk_size <= self.overlap:
                break
                
        return chunks

    def process_directory(self, directory_path: str) -> List[Dict]:
        """Process all supported files in a directory."""
        all_chunks = []
        for filename in os.listdir(directory_path):
            file_path = os.path.join(directory_path, filename)
            text = ""
            
            if filename.endswith(".pdf"):
                text = self.load_pdf(file_path)
            elif filename.endswith(".txt"):
                text = self.load_txt(file_path)
            else:
                continue
                
            if text:
                cleaned_text = self.clean_text(text)
                chunks = self.chunk_text(cleaned_text, filename)
                all_chunks.extend(chunks)
                print(f"Processed {filename}: {len(chunks)} chunks generated.")
                
        return all_chunks

    def save_chunks(self, chunks: List[Dict], output_path: str):
        """Save chunks to a JSON file."""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(chunks, f, indent=4)
        print(f"Saved {len(chunks)} chunks to {output_path}")

def main():
    preprocessor = Preprocessor()
    print(f"Scanning directory: {config.RAW_DOCS_DIR}")
    chunks = preprocessor.process_directory(config.RAW_DOCS_DIR)
    if chunks:
        preprocessor.save_chunks(chunks, config.PROCESSED_CHUNKS_PATH)
    else:
        print("No documents found or no chunks generated.")

if __name__ == "__main__":
    main()
