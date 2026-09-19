# Khmer Dubbing Studio

Full-stack Khmer Dubbing Studio web application using React, TypeScript, Tailwind CSS, Express, and the Web Audio API.

## Features

- Smart script parser for Khmer subtitles and dubbing scripts
- Auto-align timestamps to prevent voice overlap
- Microsoft Neural Khmer voice TTS (Sreymom & Piseth)
- Client-side audio processing and MP3 export
- Modern, responsive UI with Khmer typography

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Run the backend:
```bash
npm run server
```

Run the frontend in another terminal:
```bash
npm run dev
```

## Architecture

- **Backend**: Express.js with msedge-tts for TTS
- **Frontend**: React + TypeScript + Tailwind CSS
- **Audio**: Web Audio API for decoding, processing, and MP3 encoding

## License

MIT
