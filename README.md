# Finzen Spark AI Lens

A comprehensive financial management application with AI agent capabilities, built with React frontend and Python FastAPI backend.

## 🚀 Features

- **Financial Management**: Track expenses, income, and transactions
- **AI Agent Integration**: Powered by Google ADK (Agent Development Kit)
- **Modern UI**: Built with React, TypeScript, and Shadcn/ui
- **Cloud Ready**: Designed for Google Cloud Run deployment

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

### Backend (Python FastAPI)
- **Framework**: FastAPI with Google ADK
- **AI**: Google Generative AI integration
- **Deployment**: Google Cloud Run ready

## 📁 Project Structure

```
finzen-spark-ai-lens/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   └── lib/               # Utilities
├── backend/               # Python FastAPI backend
│   ├── server.py          # Main FastAPI server
│   ├── hackathon_agent/   # AI agent implementation
│   ├── pyproject.toml     # Python dependencies
│   └── .env.example       # Environment template
├── public/                # Static assets
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- uv (Python package manager)
- Google Cloud Project with API access

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
uv sync

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
# Add your Google Cloud Project ID and API key

# Start backend server
uv run uvicorn server:app --host 0.0.0.0 --port 8083 --reload
```

## 🔧 Environment Variables

Create a `.env` file in the `backend/` directory with:

```env
GEMMA_URL=
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=europe-west4
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GOOGLE_API_KEY=your-api-key-here
```

## 🚀 Development

### Running Locally
1. Start the backend: `cd backend && uv run uvicorn server:app --host 0.0.0.0 --port 8083 --reload`
2. Start the frontend: `npm run dev`
3. Access the application at `http://localhost:8082`

### API Endpoints
- `GET /health` - Health check
- `POST /feedback` - Submit feedback
- Additional ADK endpoints available

## 🐳 Docker Deployment

### Backend Docker
```bash
cd backend
docker build -t finzen-backend .
docker run -p 8083:8080 finzen-backend
```

### Frontend Docker
```bash
docker build -t finzen-frontend .
docker run -p 8082:80 finzen-frontend
```

## ☁️ Google Cloud Run Deployment

### Prerequisites
- Google Cloud SDK installed
- Project with Cloud Run API enabled
- Docker images built and pushed

### Deploy Backend
```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/finzen-backend

# Deploy to Cloud Run
gcloud run deploy finzen-backend \
  --image gcr.io/PROJECT_ID/finzen-backend \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated
```

### Deploy Frontend
```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/finzen-frontend

# Deploy to Cloud Run
gcloud run deploy finzen-frontend \
  --image gcr.io/PROJECT_ID/finzen-frontend \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0.

## 🔗 Links

- [Google ADK Documentation](https://github.com/google/adk)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
