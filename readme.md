# Web Photobooth

A modern, privacy-focused web photobooth application built with Next.js that lets users capture, customize, and save photo strips directly in their browser.

## Features

- 📸 Real-time photo capture using device camera
- 🎨 Multiple photo layouts including:
  - Classic photo strips (3 photos)
  - Double strips (2 photos)
  - Triple strips (3 photos)
  - Quad strips (4 photos)
  - Grid layout (2x2)
- ✨ Photo customization options:
  - Border colors and widths
  - Filters and adjustments
  - Image brightness and contrast controls
- 🔒 Privacy-first approach: All processing happens client-side
- 📱 Responsive design works on both desktop and mobile devices
- 💾 Local storage for saving photo history
- 🖼️ Download and save your creations

## Technology Stack

- Next.js 13+ with App Router
- React 18
- TypeScript
- TailwindCSS for styling
- Browser APIs:
  - MediaDevices for camera access
  - Canvas API for photo manipulation
  - LocalStorage for data persistence

## Getting Started

1. Clone the repository:
```bash
git clone [https://github.com/daft2/photobooth]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Requirements

- Modern web browser with camera access
- Permissions to use device camera
- Local storage enabled for saving photos

## Privacy

This application is designed with privacy in mind:
- All photo processing happens directly in your browser
- Photos are never uploaded to any server
- Photos are stored locally on your device
- Only you have access to your photos

## License

MIT License