"""
Legal Document Processing Microservice
Uses InLegalBERT embeddings with FAISS for semantic search
"""
import os
import io
import logging
from typing import List, Dict
from contextlib import asynccontextmanager

import torch
import numpy as np
import faiss
import PyPDF2
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoTokenizer, AutoModel
from dotenv import load_dotenv

# Import your Gemini client
try:
    from gemini_client import query_gemini
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    logging.warning("gemini_client not available - will use fallback responses")

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --------------------------
# CPU-safe setup
# --------------------------
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
torch.set_num_threads(1)
faiss.omp_set_num_threads(1)

# --------------------------
# Global state (will be initialized in lifespan)
# --------------------------
class AppState:
    """Application state container"""
    def __init__(self):
        self.tokenizer = None
        self.model = None
        self.faiss_index = None
        self.file_mapping: Dict[int, str] = {}
        self.text_mapping: Dict[int, str] = {}
        self.current_index: int = 0
        self.embedding_dim: int = 768

app_state = AppState()

# --------------------------
# Pydantic models
# --------------------------
class TextRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=100000)
    filename: str = Field(..., min_length=1, max_length=255)

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    k: int = Field(default=3, ge=1, le=20)

class GeminiQuery(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    top_k_files: int = Field(default=3, ge=1, le=10)

# --------------------------
# Lifespan context manager
# --------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize resources on startup and cleanup on shutdown"""
    logger.info("Initializing application...")
    
    # Load model
    try:
        MODEL_NAME = "law-ai/InLegalBERT"
        API_KEY = os.getenv("HUGGINGFACE_API_KEY")
        
        if not API_KEY:
            raise RuntimeError("HUGGINGFACE_API_KEY not set in environment")
        
        logger.info("Loading InLegalBERT model...")
        app_state.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_NAME,
            token=API_KEY
        )
        
        app_state.model = AutoModel.from_pretrained(
            MODEL_NAME,
            token=API_KEY
        )
        app_state.model.eval()  # Set to evaluation mode
        
        logger.info("✅ InLegalBERT model loaded successfully!")
        
        # Initialize FAISS index
        app_state.faiss_index = faiss.IndexFlatL2(app_state.embedding_dim)
        logger.info("✅ FAISS index initialized")
        
    except Exception as e:
        logger.error(f"Failed to initialize application: {e}")
        raise
    
    yield
    
    # Cleanup
    logger.info("Shutting down application...")
    app_state.model = None
    app_state.tokenizer = None
    app_state.faiss_index = None

# --------------------------
# FastAPI app
# --------------------------
app = FastAPI(
    title="InLegalBERT + FAISS Microservice",
    description="Legal document processing with semantic search",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Helper functions
# --------------------------
def get_embedding(text: str) -> np.ndarray:
    """Convert text to embedding using InLegalBERT"""
    if not text or not text.strip():
        raise ValueError("Text cannot be empty")
    
    try:
        inputs = app_state.tokenizer(
            text, 
            return_tensors="pt", 
            truncation=True, 
            padding=True, 
            max_length=512
        )
        
        with torch.no_grad():
            outputs = app_state.model(**inputs)
            embeddings = outputs.last_hidden_state.mean(dim=1)
        
        return embeddings.cpu().numpy().astype("float32").reshape(-1)
    
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate embedding: {str(e)}"
        )

def create_legal_summary(text: str) -> str:
    """Create a simple summary of legal document"""
    key_terms = [
        "agreement", "contract", "employee", "company", "confidentiality",
        "terms", "conditions", "employment", "salary", "benefits", "termination"
    ]
    
    text_lower = text.lower()
    found_terms = [term for term in key_terms if term in text_lower]
    
    doc_type = "employment agreement" if "employee" in found_terms else "legal contract"
    
    return (
        f"Legal document analysis: {len(text)} chars, {len(text.split())} words. "
        f"Document type: {doc_type}. "
        f"Key legal terms: {', '.join(found_terms[:5]) if found_terms else 'none found'}."
    )

def extract_text_from_pdf(pdf_content: bytes) -> str:
    """Extract text from PDF bytes"""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
        text = ""
        
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        
        return text.strip()
    
    except Exception as e:
        logger.error(f"Error extracting PDF text: {e}")
        raise ValueError(f"Failed to extract PDF text: {str(e)}")

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """Split text into overlapping chunks"""
    if not text:
        return []
    
    chunks = []
    start = 0
    text_len = len(text)
    
    while start < text_len:
        end = start + chunk_size
        chunk = text[start:end]
        
        if chunk.strip():
            chunks.append(chunk)
        
        start += (chunk_size - overlap)
    
    return chunks

def generate_fallback_answer(query: str, chunks: List[str]) -> str:
    """Generate a simple answer when Gemini is unavailable"""
    import re
    
    # Combine chunks
    context = " ".join(chunks)
    
    # Split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', context)
    
    # Score sentences by query token overlap
    query_tokens = set(
        t.lower() for t in re.findall(r"\w+", query) 
        if len(t) > 2
    )
    
    def score_sentence(sentence: str) -> int:
        sentence_tokens = set(t.lower() for t in re.findall(r"\w+", sentence))
        return len(query_tokens & sentence_tokens)
    
    # Find best matching sentence
    best_sentence = None
    best_score = 0
    
    for sentence in sentences:
        score = score_sentence(sentence)
        if score > best_score:
            best_score = score
            best_sentence = sentence
    
    if best_sentence and best_score > 0:
        return f"Based on indexed documents: {best_sentence.strip()}"
    else:
        return f"Most relevant excerpt from documents:\n\n{chunks[0][:500]}"

# --------------------------
# API Endpoints
# --------------------------

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "InLegalBERT Legal Document Microservice is running 🚀",
        "status": "healthy",
        "indexed_documents": app_state.faiss_index.ntotal if app_state.faiss_index else 0
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": app_state.model is not None,
        "faiss_initialized": app_state.faiss_index is not None,
        "total_chunks": app_state.faiss_index.ntotal if app_state.faiss_index else 0,
        "gemini_available": GEMINI_AVAILABLE
    }

@app.post("/process-text")
async def process_text(req: TextRequest):
    """Process and index a text document"""
    try:
        # Create summary
        summary = create_legal_summary(req.text)
        
        # Create chunks
        chunks = chunk_text(req.text)
        
        if not chunks:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid text chunks could be created"
            )
        
        # Index each chunk
        chunks_indexed = 0
        for chunk in chunks:
            embedding = get_embedding(chunk).reshape(1, -1)
            app_state.faiss_index.add(embedding)
            
            app_state.file_mapping[app_state.current_index] = req.filename
            app_state.text_mapping[app_state.current_index] = chunk
            app_state.current_index += 1
            chunks_indexed += 1
        
        logger.info(f"Indexed {chunks_indexed} chunks from {req.filename}")
        
        return {
            "summary": summary,
            "indexed": True,
            "chunks_indexed": chunks_indexed
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing text: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process text: {str(e)}"
        )

@app.post("/api/upload")
async def upload_pdfs(files: List[UploadFile] = File(...)):
    """Upload and index multiple PDF files"""
    if not files:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No files provided"
        )
    
    results = []
    
    for file in files:
        try:
            # Validate file type
            if not file.filename.lower().endswith('.pdf'):
                results.append({
                    "filename": file.filename,
                    "error": "Only PDF files are supported"
                })
                continue
            
            # Read file content
            contents = await file.read()
            
            if not contents:
                results.append({
                    "filename": file.filename,
                    "error": "Empty file"
                })
                continue
            
            # Extract text
            text = extract_text_from_pdf(contents)
            
            if not text or not text.strip():
                results.append({
                    "filename": file.filename,
                    "error": "No text could be extracted from PDF"
                })
                continue
            
            # Create chunks
            chunks = chunk_text(text)
            
            # Index each chunk
            for chunk in chunks:
                embedding = get_embedding(chunk).reshape(1, -1)
                app_state.faiss_index.add(embedding)
                
                app_state.file_mapping[app_state.current_index] = file.filename
                app_state.text_mapping[app_state.current_index] = chunk
                app_state.current_index += 1
            
            logger.info(f"Successfully indexed {len(chunks)} chunks from {file.filename}")
            
            results.append({
                "filename": file.filename,
                "chunks_indexed": len(chunks),
                "text_length": len(text)
            })
        
        except Exception as e:
            logger.error(f"Error processing {file.filename}: {e}")
            results.append({
                "filename": file.filename,
                "error": str(e)
            })
    
    return {"results": results}

@app.post("/api/query")
async def query_embeddings(req: QueryRequest):
    """Query indexed documents using semantic search"""
    try:
        if app_state.faiss_index.ntotal == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No documents indexed yet. Please upload documents first."
            )
        
        # Generate query embedding
        query_embedding = get_embedding(req.query).reshape(1, -1)
        
        # Search FAISS index
        distances, indices = app_state.faiss_index.search(query_embedding, req.k)
        
        # Build results
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx == -1 or idx not in app_state.text_mapping:
                continue
            
            results.append({
                "filename": app_state.file_mapping[idx],
                "distance": float(dist),
                "text": app_state.text_mapping[idx],
                "chunk_id": int(idx)
            })
        
        return {
            "query": req.query,
            "results": results,
            "total_results": len(results)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying embeddings: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to query embeddings: {str(e)}"
        )

@app.post("/api/gemini-answer")
async def gemini_answer(req: GeminiQuery):
    # ✅ SAFETY CHECK: do not error if nothing indexed
    if app_state.faiss_index is None or app_state.faiss_index.ntotal == 0:
        return {
            "answer": None,
            "error": "NO_DOCUMENTS_INDEXED",
            "message": "Please upload and index documents before asking questions."
        }

    # 1️⃣ Create query embedding
    query_vector = get_embedding(req.query).reshape(1, -1)

    # 2️⃣ Search FAISS
    distances, indices = app_state.faiss_index.search(
        query_vector, req.top_k_files
    )

    # 3️⃣ Filter valid indices
    valid_indices = [
        i for i in indices[0]
        if i != -1 and i in app_state.text_mapping
    ]

    if not valid_indices:
        return {
            "answer": "No relevant content found in uploaded documents.",
            "retrieved_chunks": 0
        }

    # 4️⃣ Retrieve chunks
    retrieved_chunks = [app_state.text_mapping[i] for i in valid_indices]
    context = "\n\n".join(retrieved_chunks)

    # 5️⃣ Prompt
    prompt = f"""
You are a legal assistant. Answer in simple, layman language.

Documents:
{context}

User Question:
{req.query}
"""

    # 6️⃣ Gemini or fallback
    if GEMINI_AVAILABLE:
        try:
            answer = query_gemini(prompt, max_tokens=300)
        except Exception:
            answer = generate_fallback_answer(req.query, retrieved_chunks)
    else:
        answer = generate_fallback_answer(req.query, retrieved_chunks)

    return {
        "answer": answer,
        "retrieved_chunks": len(retrieved_chunks),
        "source_files": list(
            set(app_state.file_mapping[i] for i in valid_indices)
        )
    }

@app.get("/api/status")
@app.get("/api/status")
async def status_endpoint():
    return {
        "total_chunks": app_state.faiss_index.ntotal if app_state.faiss_index else 0,
        "current_index": app_state.current_index,
        "model_loaded": app_state.model is not None
    }

@app.delete("/api/reset")
async def reset_index():
    """Reset the entire index (use with caution)"""
    try:
        app_state.faiss_index.reset()
        app_state.file_mapping.clear()
        app_state.text_mapping.clear()
        app_state.current_index = 0
        
        logger.info("Index reset successfully")
        
        return {
            "message": "Index reset successfully",
            "total_chunks": 0
        }
    
    except Exception as e:
        logger.error(f"Error resetting index: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to reset index: {str(e)}"
        )

# --------------------------
# Run server
# --------------------------
if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"🚀 Starting InLegalBERT + FAISS Microservice on {host}:{port}")
    
    uvicorn.run(
        app, 
        host=host, 
        port=port,
        log_level="info"
    )