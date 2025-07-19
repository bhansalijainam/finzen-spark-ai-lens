# Integration Plan: React Frontend + Python Hackathon Agent

## Current Architecture

### Frontend (finzen-spark-ai-lens)
- React + TypeScript + Vite
- Shadcn/ui components
- Financial management interface
- Running on http://localhost:8082/

### Backend (hackathon-agent)
- Python FastAPI server
- Google ADK (Agent Development Kit)
- AI agent capabilities
- Designed for Google Cloud Run deployment

## Integration Strategy

### Option 1: Separate Services (Recommended)
- Keep frontend and backend as separate services
- Frontend communicates with backend via HTTP API
- Deploy both to Google Cloud Run
- Use environment variables for configuration

### Option 2: Monolithic Approach
- Embed Python backend within React app
- Use Python subprocess or API calls
- More complex but single deployment

## Implementation Steps

### Phase 1: Backend Setup
1. Set up Python environment for hackathon-agent
2. Configure environment variables
3. Test backend API endpoints
4. Add CORS support for frontend communication

### Phase 2: Frontend Integration
1. Create API service layer in React
2. Add agent interaction components
3. Integrate with existing financial features
4. Add error handling and loading states

### Phase 3: Deployment
1. Create Docker configurations
2. Set up Google Cloud Run services
3. Configure environment variables
4. Set up CI/CD pipeline

## File Structure After Integration

```
finzen-spark-ai-lens/
├── src/                    # React frontend
├── public/
├── package.json
├── vite.config.ts
├── backend/               # Python backend (copied from hackathon-agent)
│   ├── server.py
│   ├── hackathon_agent/
│   ├── pyproject.toml
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml     # For local development
├── cloudbuild.yaml        # Google Cloud Build
└── README.md
```

## Next Steps
1. Set up Python backend environment
2. Test backend API
3. Create API integration layer in React
4. Deploy to Google Cloud Run 