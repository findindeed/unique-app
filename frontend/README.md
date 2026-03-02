# Unique Paper Frontend

React 19 + Vite frontend for Unique Paper Converting Machines.

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- Lucide React

## Installation

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update `VITE_API_URL` to point to your backend.

## Development
```bash
npm run dev
```

## Production Build
```bash
npm run build
```
The output will be in the `dist/` folder.

## Deployment
You can deploy the `dist/` folder to any static hosting provider like Netlify, Vercel, or GitHub Pages.
