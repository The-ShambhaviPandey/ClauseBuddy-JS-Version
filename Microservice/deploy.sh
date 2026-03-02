#!/bin/bash

# 🚀 Deployment Script for InLegalBERT Microservice
set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Starting InLegalBERT Microservice Deployment..."

# Check .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo "Create a .env file from .env.template"
    exit 1
fi

# Load environment
source .env

# Validate required vars
if [ -z "$HUGGINGFACE_API_KEY" ]; then
    echo -e "${RED}❌ HUGGINGFACE_API_KEY not set in .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Python version check
PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
REQUIRED_VERSION="3.10"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo -e "${RED}❌ Python 3.10+ required (found $PYTHON_VERSION)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Python version: $PYTHON_VERSION${NC}"

# Virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Optional: run tests
if [ -f "test_microservice.py" ]; then
    echo "Running tests..."
    python -m pytest test_microservice.py -v
fi

# Check port
PORT=${PORT:-8000}
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port $PORT is in use${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi
fi

echo -e "${GREEN}✅ Pre-deployment checks passed${NC}"

# Deployment mode
echo ""
echo "Select deployment mode:"
echo "1) Development (uvicorn with auto-reload)"
echo "2) Production (gunicorn with workers)"
echo "3) Docker (containerized deployment)"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo "Starting in development mode..."
        uvicorn microservice_fixed:app --reload --port $PORT
        ;;
    2)
        echo "Starting in production mode..."
        WORKERS=${WORKERS:-4}
        mkdir -p logs
        gunicorn microservice_fixed:app \
            --workers $WORKERS \
            --worker-class uvicorn.workers.UvicornWorker \
            --bind 0.0.0.0:$PORT \
            --timeout 120 \
            --access-logfile logs/access.log \
            --error-logfile logs/error.log \
            --log-level info
        ;;
    3)
        echo "Starting with Docker..."
        if ! command -v docker &> /dev/null; then
            echo -e "${RED}❌ Docker not found${NC}"
            exit 1
        fi
        docker-compose up --build -d
        echo -e "${GREEN}✅ Service started in Docker${NC}"
        echo "View logs: docker-compose logs -f"
        echo "Stop service: docker-compose down"
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo "Service running on http://localhost:$PORT"
echo "API docs: http://localhost:$PORT/docs"
echo "Health check: http://localhost:$PORT/health"