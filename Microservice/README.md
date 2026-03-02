# Microservice — ClauseBuddy AI Engine

Python FastAPI service handling PDF processing, embedding generation, vector search, and LLM-powered Q&A for ClauseBuddy.

---

## Purpose

This is the AI brain of ClauseBuddy. It:

- Extracts and chunks text from uploaded PDFs
- Generates legal-domain embeddings using **InLegalBERT**
- Indexes chunks in a **FAISS** vector store for semantic search
- Queries **Google Gemini** for summarization and natural language answers

---

## File Structure

```
Microservice/
├── microservice.py         # Main FastAPI app + all endpoints
├── gemini_client.py        # Google Gemini API integration
├── requirements.txt        # Python dependencies
├── deploy.sh               # Production deployment script
├── tests/
│   ├── check_packages.py   # Dependency availability checker
│   ├── test_faiss.py       # FAISS index unit tests
│   ├── test_inlegalbert.py # InLegalBERT embedding tests
│   └── test_query.py       # End-to-end query pipeline tests
├── .env                    # Environment variables (not committed)
├── .gitignore
└── README.md
```

---

## Architecture

```
POST /api/upload  (PDF file)
    │
    ▼
PyPDF2 — text extraction
    │
    ▼
Text chunking (fixed-size with overlap)
    │
    ▼
InLegalBERT  (Hugging Face Transformers)
→ dense embedding per chunk
    │
    ▼
FAISS index — stores & retrieves embeddings
    │
    ▼
POST /process-text  (query string from Backend)
    │
    ▼
FAISS similarity search → top-k relevant chunks
    │
    ▼
Google Gemini API
→ summarize / answer using retrieved chunks as context
    │
    ▼
JSON response → Backend (port 5000) → Frontend
```

---

## Setup

### Prerequisites

- Python 3.10+
- A virtual environment (strongly recommended)

### Install & Run

```bash
cd Microservice

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate          # Linux / Mac
# .\venv\Scripts\Activate.ps1    # Windows PowerShell

# Install all dependencies
pip install -r requirements.txt

# Start the service
python microservice.py
```

Service runs on `http://localhost:8000`

---

## Environment Variables

Create a `.env` file in the `Microservice/` directory:

```env
HUGGINGFACE_API_KEY=your-huggingface-api-key
GOOGLE_API_KEY=your-gemini-api-key
```

### Getting API Keys

- **Hugging Face:** [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) — create a read token
- **Google Gemini:** [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — generate an API key

---

## API Endpoints

| Method | Route           | Description                                    |
| ------ | --------------- | ---------------------------------------------- |
| POST   | `/api/upload`   | Upload a PDF for extraction and indexing       |
| POST   | `/process-text` | Receive text query from Backend, return answer |
| GET    | `/health`       | Health check                                   |
| GET    | `/docs`         | Auto-generated Swagger UI (FastAPI)            |

---

## Running Tests

```bash
# From Microservice/ with venv activated
python tests/check_packages.py      # Verify all dependencies are installed
python tests/test_faiss.py          # Test vector indexing
python tests/test_inlegalbert.py    # Test embedding generation
python tests/test_query.py          # Test full query pipeline end-to-end
```

---

## Deployment

A deployment script is included for production use:

```bash
chmod +x deploy.sh
./deploy.sh
```

The script supports three modes — development (uvicorn with reload), production (gunicorn with multiple workers), and Docker. Follow the prompts after running.

---

## External Services & Documentation

| Service           | Purpose                      | Documentation                                                                  |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| **Google Gemini** | Summarization & Q&A          | [ai.google.dev/docs](https://ai.google.dev/docs)                               |
| **InLegalBERT**   | Legal-domain text embeddings | [huggingface.co/law-ai/InLegalBERT](https://huggingface.co/law-ai/InLegalBERT) |
| **FAISS**         | Vector similarity search     | [github.com/facebookresearch/faiss](https://github.com/facebookresearch/faiss) |

---

## Dependencies

| Package               | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `fastapi`             | API framework                                       |
| `uvicorn`             | ASGI server                                         |
| `PyPDF2`              | PDF text extraction                                 |
| `transformers`        | InLegalBERT model loading                           |
| `torch`               | PyTorch for model inference                         |
| `faiss-cpu`           | Vector index (use `faiss-gpu` if CUDA is available) |
| `numpy`               | Embedding array operations                          |
| `google-generativeai` | Gemini API client                                   |
| `python-dotenv`       | Load `.env` variables                               |
| `pydantic`            | Request/response data validation                    |
| `python-multipart`    | Multipart form / file upload parsing                |

---

## Notes

- First run will download InLegalBERT weights from Hugging Face (~400 MB) — ensure a stable internet connection
- FAISS index is held in memory by default; it resets on restart — persist the index to disk for production use
- Swap `faiss-cpu` for `faiss-gpu` if a CUDA-enabled GPU is available for significantly faster inference
- Never commit `.env` to version control — it is listed in `.gitignore`

---
