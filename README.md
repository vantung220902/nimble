# Nimble - Web Coding Challenge
A web application to scrap data from: https://www.google.com

# Domain 
Web application url:  
https://web.nimble.tunnguyenv.cloud/

Api url:  
https://api.nimble.tunnguyenv.cloud/api-svc/swagger/


## Architecture Overview

The application architecture has the following components:

- **Backend API** (NestJS)
- **Frontend Client** (React)
- **Database** (PostgreSQL)
- **Caching & Message Broker** (Redis)
- **File Storage** (AWS S3)
- **Web Scraping Service** (Puppeteer)

## Key Features

- User authentication with JWT
- Real-time processing status updates via Server-Sent Events (SSE)
- Scaping Google search data
- File upload/download management with AWS S3
- Scalable architecture using Redis for caching and pub/sub model
- CQRS pattern for easily to manage
- Captcha handling using 2captcha API

## Tech Stack

### Backend
- **NestJS**
- **CQRS Pattern** - Command Query Responsibility Segregation
- **Prisma** 
- **Redis** - Caching and pub/sub model
- **JWT** - Authentication
- **Puppeteer** - Web scraping
- **AWS S3** - File storage
- **2captcha** - Captcha resolution service

### Frontend
- **React** 
- **Mantine** - Component library
- **Zustand** - State management
- **SSE** - Real-time updates

## Limitations

### Captcha Handling
- Reliance on 2captcha API for resolving Google CAPTCHAs
- 2captcha take costs
- Increased processing time due to waiting 2captcha resolve CAPTCHA add some delay times

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

