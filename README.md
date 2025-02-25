# AI-Powered Legal & Video Assistant

## 📌 Overview
This project provides an AI-powered **Legal Document Analyzer**, **Video Content Analyzer**, and **Legal Chatbot** using FastAPI as the backend and Streamlit as the frontend. The system can:
- Extract and summarize legal documents (PDFs)
- Perform **legal risk assessment** with visualizations
- Process **videos**, extract speech, and generate transcripts
- Provide **AI-powered legal answers** using Falcon-7B

## 🚀 Features
- **📄 Legal Document Analysis:** Extracts text, summarizes content, and performs legal risk assessment.
- **⚖️ Legal Risk Assessment:** Detects liability, termination clauses, indemnification, payment risks, and insurance risks.
- **🎬 Video Content Analyzer:** Extracts audio from videos and performs speech-to-text conversion.
- **🤖 AI Legal Chatbot:** Uses Falcon-7B for answering legal questions.
- **🖥️ Web Interface:** Built using Streamlit.

## 🛠️ Tech Stack
- **Backend:** FastAPI, Transformers, PyTorch, Spacy, Sentence-Transformers
- **Frontend:** Streamlit
- **Speech Processing:** Whisper (OpenAI)
- **File Handling:** pdfplumber, moviepy, librosa
- **Visualization:** Matplotlib
- **Deployment:** Ngrok

## 📂 Project Structure
```
├── app.py                  # Backend API using FastAPI
├── app_ui.py               # Streamlit frontend
├── requirements.txt        # Required Python packages
├── static/                 # Stores risk assessment charts
└── README.md               # Project documentation
```

## ⚡ Installation & Setup
### 1️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 2️⃣ Run Backend (FastAPI)
```bash
python app.py
```
FastAPI will be available at `http://localhost:8500`

### 3️⃣ Run Frontend (Streamlit UI)
```bash
streamlit run app_ui.py
```
The web interface will open in your browser.

## 🔥 API Endpoints
### 📄 Legal Document Analysis
**POST /analyze_legal_document**
- Input: PDF file
- Output: Summary, Risk Analysis, Risk Chart

### 🎬 Video Analysis
**POST /analyze_video**
- Input: MP4, AVI, MOV file
- Output: Speech-to-Text Transcript

### 🤖 Legal Chatbot
**POST /chatbot**
- Input: User Query
- Output: AI-generated legal response

## 🔗 Deployment
- **Ngrok Tunnel:** Required for exposing the API (`ngrok http 8500`)
- **Cloud Deployment:** Can be hosted on AWS, GCP, or Azure

## 📝 Notes
- Ensure **GPU support** for better performance (especially for Whisper & Falcon-7B models)
- Use **a valid ngrok URL** in `app_ui.py` before running Streamlit
- Increase timeout settings for handling larger files (videos/PDFs)

## 🙌 Contributors
- **[Tejash pandey]** - Developer

## 📜 License
MIT License © 2025. Free to use and modify for research and non-commercial projects.

