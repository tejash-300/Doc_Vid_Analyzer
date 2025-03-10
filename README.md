# Legal Document & Video Analyzer Frontend

This is the frontend for the AI-powered Legal Document & Video Analyzer project. It provides a user-friendly interface for analyzing legal documents and videos, extracting insights, and getting AI-powered answers to legal questions.

## Features

- **Document Analysis**: Upload and analyze legal documents (PDFs) to extract key information, identify risks, and generate summaries.
- **Video Analysis**: Upload videos to transcribe speech and analyze the content for legal insights.
- **Legal Q&A**: Ask questions about your analyzed documents and get AI-powered answers.
- **Risk Visualization**: View interactive charts and visualizations of legal risks in your documents.

## Technologies Used

- **React**: Frontend framework
- **Material UI**: Component library for modern UI design
- **Axios**: HTTP client for API requests
- **React Router**: For navigation between pages
- **Chart.js**: For data visualization

## Setup and Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/tejash-300/Doc_Vid_Analyzer.git
   cd Doc_Vid_Analyzer
   ```

2. **Install dependencies**:
   ```
   cd frontend
   npm install
   ```

3. **Configure the backend URL**:
   - Open `src/config.js`
   - Update the `API_BASE_URL` with your backend URL

4. **Start the development server**:
   ```
   npm start
   ```

5. **Build for production**:
   ```
   npm run build
   ```

## Backend Connection

This frontend connects to a FastAPI backend that provides the following services:
- Document analysis (PDF)
- Video analysis and transcription
- Legal question answering
- Risk visualization

Make sure the backend is running and accessible at the URL specified in `src/config.js`.

## Project Structure

```
frontend/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── config.js        # Configuration
│   └── App.js           # Main application component
└── README.md            # This file
```

## Usage

1. **Document Analysis**:
   - Navigate to the Document Analyzer page
   - Upload a PDF file
   - View the summary, risk assessment, and visualizations

2. **Video Analysis**:
   - Navigate to the Video Analyzer page
   - Upload a video file
   - View the transcript, summary, and risk assessment

3. **Legal Q&A**:
   - Navigate to the Legal Q&A page
   - Enter the Task ID from a previous analysis
   - Ask legal questions about the document or video

## License

MIT License © 2025. Free to use and modify for research and non-commercial projects.

## Credits

Developed by Tejash Pandey
