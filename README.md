# Tumora - "Code Your Cure"

Tumora is a patient empowerment cancer simulation web application, built as a pure frontend React experience.

> **Disclaimer**: Tumora is an educational simulation only and does not provide medical advice. Always consult your doctor for real medical decisions.

Built by CodeTheCure Labs.

## Features
- **Molecular Canvas**: A visual drag-and-drop bio-programming interface to map out your tumor profile.
- **Simulation Engine**: Runs rule-based mock simulations derived from abstract, generalized data.
- **Trial Forge Mode**: Mock ClinicalTrials.gov matches and smart question generator for your oncologist.
- **Legacy Forge Mode**: Persists your simulation history in localStorage for later review.
- **AI Co-Pilot**: An embedded interactive narrator that interprets your canvas.

## Tech Stack
- Frontend: Vite + React 18 + TypeScript
- Styling: TailwindCSS v3
- State Management: Zustand (with `persist` middleware for localStorage)
- Canvas: Konva.js + react-konva
- Icons: lucide-react
- Dates: date-fns

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Architecture & Storage
All data is stored exclusively in your browser's `localStorage` (keys: `tumora_sims`, `tumora_profile`). No external databases or APIs track your simulation states.
