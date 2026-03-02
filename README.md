# ⚖️ ClauseBuddy — LegalAI

> **Submitted for:** Google Gen AI Hackathon 2025
>
> **⚠️ Disclaimer:** This project was originally submitted for the Google Gen AI Hackathon 2025. Subsequent changes have been made to the codebase as per our own requirements and preferences — the current version may no longer satisfy the original hackathon submission conditions.

---

## 🎬 Demo & Presentation

| Resource               | Link                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| 📽️ Demo Video          | [ClauseBuddy Demo](https://github.com/user-attachments/assets/95c71770-e999-4da0-abb6-ff471c3df41c) |
| 📊 Presentation Slides | [Prompt Pirates.pdf](https://github.com/user-attachments/files/25678977/Prompt.Pirates.pdf)         |

---

## What is ClauseBuddy?

ClauseBuddy is an AI-powered legal document assistant that helps lawyers, students, and professionals analyze, summarize, and query legal documents using natural language.

It combines **domain-specific embeddings (InLegalBERT)**, **semantic vector search (FAISS)**, and **Google Gemini** to turn dense legal text into fast, searchable, and conversational insights.

---

## Features

- Upload legal PDFs and extract structured text
- Semantic search over document content using FAISS + InLegalBERT
- Natural language Q&A and summarization via Gemini
- Chat-style frontend with upload and history support
- Google OAuth authentication
- Multilingual-ready architecture

---

## How It Works

```
User (Frontend)
    │
    ▼
Upload PDF / Ask Question
    │
    ▼
Node.js Backend (API)
    ├── Auth (JWT + Google OAuth)
    ├── File handling & storage
    └── Forwards text to Python Microservice
            │
            ▼
    Python Microservice
        ├── PDF text extraction
        ├── Chunking
        ├── InLegalBERT embeddings → FAISS index
        └── Gemini API (Summarization / QnA)
            │
            ▼
    Response → Backend → Frontend → User
```

---

## Tech Stack

| Layer     | Technologies                                     |
| --------- | ------------------------------------------------ |
| Frontend  | React, Vite, Tailwind CSS, shadcn/ui             |
| Backend   | Node.js, Express, MongoDB, Passport.js           |
| AI/ML     | Google Gemini, InLegalBERT (Hugging Face), FAISS |
| Auth      | Google OAuth 2.0, JWT                            |
| Dev Tools | Postman, Git/GitHub                              |

---

## Project Structure

```
ClauseBuddy/
├── Backend/            # Node.js REST API
├── Frontend/           # React + Vite UI
├── Microservice/       # Python AI/ML service
├── TESTING.js          # Integration / API tests
├── .gitignore
└── README.md
```

See each subfolder's `README.md` for detailed setup instructions.

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ClauseBuddy.git
cd ClauseBuddy
```

### 2. Set up each service

```bash
# Backend
cd Backend && npm install

# Frontend
cd ../Frontend && npm install

# Microservice
cd ../Microservice
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

### 3. Run all three services concurrently

```bash
# Terminal 1
cd Backend && npm start

# Terminal 2
cd Frontend && npm run dev

# Terminal 3
cd Microservice && python microservice.py
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

Each service has its own `.env` file. See the respective READMEs for the full list.

| Service      | Key Variables                                                  |
| ------------ | -------------------------------------------------------------- |
| Backend      | `PORT`, `MONGODB_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID/SECRET` |
| Frontend     | `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`                        |
| Microservice | `HUGGINGFACE_API_KEY`, `GOOGLE_API_KEY`                        |

---

## Documentation & References

- [Google Gemini API](https://ai.google.dev/docs)
- [InLegalBERT on Hugging Face](https://huggingface.co/law-ai/InLegalBERT)
- [FAISS by Meta](https://github.com/facebookresearch/faiss)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

## License

MIT License — free to use, modify, and distribute.

---

_Built with ❤️ for the Google Gen AI Hackathon 2025._
