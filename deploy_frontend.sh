#!/bin/bash

# Configuration
API_URL="https://match4action-api-o9ma.vercel.app"
PROJECT_NAME="match4action-web"

echo "🚀 Starting Deployment for $PROJECT_NAME"
echo "🔗 Connecting to Backend: $API_URL"

# Ensure Vercel CLI is logged in
echo "👤 Checking Vercel identity..."
vercel whoami
if [ $? -ne 0 ]; then
  echo "⚠️  'vercel whoami' failed or returned an error."
  echo "👉 Trying to proceed, but if it fails, please run 'vercel login' manually."
fi

# Link Project
echo "🛠️  Linking project..."
vercel link --yes --project "$PROJECT_NAME"

# Helper function to add env var
add_env() {
  local key=$1
  local value=$2
  if [ -z "$value" ]; then
    echo "⚠️  Skipping $key (value is empty)"
    return
  fi
  
  echo "🔑 Setting $key..."
  # Try to remove existing first to avoid error (ignore failure)
  vercel env rm "$key" production --yes > /dev/null 2>&1
  
  echo -n "$value" | vercel env add "$key" production > /dev/null 2>&1
}

# Add API Path
add_env "NEXT_PUBLIC_API_PATH" "$API_URL"

# Read .env and add other variables
if [ -f .env ]; then
  echo "📂 Reading configuration from .env..."
  
  # Load .env variables cleanly
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Clean quotes
    value=${value%\"}
    value=${value#\"}
    
    if [[ "$key" == "CONTENTFUL_SPACE_ID" || "$key" == "CONTENTFUL_PUBLIC_ACCESS_TOKEN" || "$key" == "NEXT_PUBLIC_SITE_IDENTIFIER" ]]; then
       add_env "$key" "$value"
    fi
  done < .env
else
  echo "⚠️  .env file not found. You may need to set Contentful keys manually in Vercel Dashboard."
fi

# Deploy
echo "🚀 Deploying to Production..."
vercel deploy --prod

echo "✅ Deployment script finished."
