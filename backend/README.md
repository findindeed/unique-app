# Unique Paper Backend

Node.js + Express + TypeScript backend for Unique Paper Converting Machines.

## Tech Stack
- Node.js
- Express
- TypeScript
- CORS
- Helmet
- Dotenv

## Installation

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

## Development
```bash
npm run dev
```

## Production Build
```bash
npm run build
```

## Start Production Server
```bash
npm start
```

## API Endpoints
- `GET /api/health`: Check server status.
- `POST /api/contact`: Submit contact form data.

## Render Deployment Instructions
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set **Runtime** to `Node`.
4. Set **Build Command** to `npm install && npm run build`.
5. Set **Start Command** to `node dist/server.js`.
6. Add Environment Variables:
   - `PORT`: 5000 (or as needed)
   - `FRONTEND_URL`: Your deployed frontend URL
