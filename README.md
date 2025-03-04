# Nimble - Web Coding Challenge

A web application to scrap data from https://www.google.com

## Architecture Overview

The application follows a microservices architecture with the following components:

- **Backend API** (NestJS)
- **Frontend Client** (React)
- **Database** (PostgreSQL)
- **Caching & Message Broker** (Redis)
- **File Storage** (AWS S3)
- **Web Scraping Service** (Puppeteer)

## Key Features

- User authentication with JWT
- Real-time processing status updates via Server-Sent Events (SSE)
- Automated Google search results tracking
- File upload/download management with AWS S3
- Scalable architecture using Redis for message queuing
- CQRS pattern for better separation of concerns
- Captcha handling using 2captcha API

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **CQRS Pattern** - Command Query Responsibility Segregation
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and message broker
- **JWT** - Authentication
- **Puppeteer** - Web scraping
- **AWS S3** - File storage
- **2captcha** - Captcha resolution service

### Frontend
- **React** - UI library
- **Mantine** - Component library
- **Zustand** - State management
- **SSE** - Real-time updates

## Limitations

### Captcha Handling
- Reliance on 2captcha API for resolving Google CAPTCHAs
- Cost implications for each CAPTCHA resolution
- Increased processing time due to CAPTCHA resolution delays
- Rate limiting considerations

## Getting Started

1. Clone the repository
2. Set up environment variables follow README.md in client/server 
3. Install dependencies:
```bash
cd server && yarn init-be
cd client && pnpm init-fe
```

4. Start the services:
```bash
# Start backend
cd server && yarn dev

# Start frontend
cd client && yarn dev
```

