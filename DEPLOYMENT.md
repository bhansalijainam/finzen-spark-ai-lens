# Deployment Guide: Google Cloud Run

This guide will help you deploy the Finzen Spark AI Lens application to Google Cloud Run.

## Prerequisites

1. **Google Cloud SDK** installed and configured
2. **Docker** installed locally
3. **Google Cloud Project** with billing enabled
4. **Required APIs** enabled:
   - Cloud Run API
   - Cloud Build API
   - Container Registry API
   - Secret Manager API (for API keys)

## Setup Instructions

### 1. Initialize Google Cloud

```bash
# Set your project ID
export PROJECT_ID=agentic-466414

# Configure gcloud
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com
```

### 2. Store API Keys Securely

```bash
# Store your Google API key in Secret Manager
echo -n "AIzaSyCGv4jLUk3GTS4xZ8Wq_OZR5YAenu8_a7A" | \
gcloud secrets create google-api-key --data-file=-

# Grant Cloud Run access to the secret
gcloud secrets add-iam-policy-binding google-api-key \
    --member="serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

### 3. Build and Deploy Backend

```bash
# Navigate to backend directory
cd backend

# Build and push the backend image
gcloud builds submit --tag gcr.io/$PROJECT_ID/finzen-backend

# Deploy to Cloud Run
gcloud run deploy finzen-backend \
  --image gcr.io/$PROJECT_ID/finzen-backend \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=europe-west4,GOOGLE_GENAI_USE_VERTEXAI=FALSE" \
  --set-secrets="GOOGLE_API_KEY=google-api-key:latest"
```

### 4. Build and Deploy Frontend

```bash
# Navigate back to project root
cd ..

# Build and push the frontend image
gcloud builds submit --tag gcr.io/$PROJECT_ID/finzen-frontend

# Deploy to Cloud Run
gcloud run deploy finzen-frontend \
  --image gcr.io/$PROJECT_ID/finzen-frontend \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated \
  --port 80 \
  --set-env-vars="VITE_API_URL=https://finzen-backend-xxxxx-ew.a.run.app"
```

### 5. Update Frontend API URL

After deploying the backend, get its URL and update the frontend:

```bash
# Get the backend URL
BACKEND_URL=$(gcloud run services describe finzen-backend --region=europe-west4 --format="value(status.url)")

# Redeploy frontend with correct backend URL
gcloud run deploy finzen-frontend \
  --image gcr.io/$PROJECT_ID/finzen-frontend \
  --platform managed \
  --region europe-west4 \
  --allow-unauthenticated \
  --port 80 \
  --set-env-vars="VITE_API_URL=$BACKEND_URL"
```

## Automated Deployment

Use the provided `cloudbuild.yaml` for automated deployment:

```bash
# Submit build to Cloud Build
gcloud builds submit --config cloudbuild.yaml
```

## Environment Variables

### Backend Environment Variables
- `GOOGLE_CLOUD_PROJECT`: Your Google Cloud Project ID
- `GOOGLE_CLOUD_LOCATION`: Cloud region (europe-west4)
- `GOOGLE_GENAI_USE_VERTEXAI`: Set to FALSE for API access
- `GOOGLE_API_KEY`: Stored in Secret Manager

### Frontend Environment Variables
- `VITE_API_URL`: Backend service URL

## Monitoring and Logs

```bash
# View backend logs
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=finzen-backend" --limit=50

# View frontend logs
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=finzen-frontend" --limit=50
```

## Scaling Configuration

```bash
# Configure scaling for backend
gcloud run services update finzen-backend \
  --region=europe-west4 \
  --min-instances=0 \
  --max-instances=10 \
  --cpu=1 \
  --memory=512Mi

# Configure scaling for frontend
gcloud run services update finzen-frontend \
  --region=europe-west4 \
  --min-instances=0 \
  --max-instances=5 \
  --cpu=1 \
  --memory=256Mi
```

## Custom Domain Setup

```bash
# Map custom domain to frontend
gcloud run domain-mappings create \
  --service=finzen-frontend \
  --domain=your-domain.com \
  --region=europe-west4
```

## Cost Optimization

1. **Set minimum instances to 0** for both services
2. **Use appropriate CPU/memory** allocations
3. **Monitor usage** with Cloud Monitoring
4. **Set up billing alerts** in Google Cloud Console

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows frontend domain
2. **API Key Issues**: Check Secret Manager permissions
3. **Build Failures**: Verify Dockerfile configurations
4. **Service Unavailable**: Check Cloud Run quotas and limits

### Debug Commands

```bash
# Check service status
gcloud run services list --region=europe-west4

# View service details
gcloud run services describe finzen-backend --region=europe-west4

# Test backend health
curl https://finzen-backend-xxxxx-ew.a.run.app/health

# Check logs in real-time
gcloud logs tail --service=finzen-backend
```

## Security Best Practices

1. **Use Secret Manager** for API keys
2. **Enable Cloud Audit Logs**
3. **Set up IAM roles** properly
4. **Use HTTPS** for all communications
5. **Regular security updates**

## Performance Optimization

1. **Enable CDN** for static assets
2. **Use appropriate instance sizes**
3. **Implement caching** strategies
4. **Monitor response times**
5. **Optimize Docker images**

## Backup and Recovery

1. **Backup environment variables**
2. **Store Docker images** in Container Registry
3. **Document deployment procedures**
4. **Test recovery procedures** regularly 