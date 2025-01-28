# Unimad Dev Task

This is a Next.js project that uses inline Tailwind CSS.

## Prerequisites

- Node.js Version > 18.0.0
- PNPM Package Manager

## Important Notes

- This frontend project requires the backend server to be running for full functionality
- Without the backend, only the landing page will be accessible due to authentication requirements
- If you're not attempting Stage 3 of the task, you can skip running this frontend and just reference the starter design for the first page

## Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/BVK23/unimad-test-backend
```
2. Follow the setup instructions in the backend repository's README

## Frontend Setup

1. Install PNPM if you haven't already:
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Access the application at `http://localhost:3000`

## Authentication

- The frontend requires access tokens from the backend for API calls
- Make sure the backend server is running before attempting to use authenticated features
- Without proper authentication, only the landing page will be accessible

## Design Reference

- The project/task requires designs for 3 pages
- A starter design is provided for the first page to help you get started
- Use this as a reference for implementing the remaining pages
