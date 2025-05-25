# Unique_Video_Progress_Tracker
Accurately track genuine student engagement by recording and merging unique watched segments of lecture videos—far beyond just played to the end.
# Unique Video Progress Tracker

A React + TypeScript + Vite application that goes beyond marking videos “complete” when they finish. This tool records exactly which parts of a lecture users have watched—merging overlapping segments, calculating total unique watch time, and persisting progress in local storage—so you can measure real engagement.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation & Development](#installation--development)  
- [Usage](#usage)  
- [API & Data Contracts](#api--data-contracts)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- **Interval Tracking**  
  Records every watched segment (start & end times) whenever the video plays or the user seeks.  
- **Overlap Merging**  
  Combines overlapping intervals so repeat views don’t inflate progress.  
- **True Progress Calculation**  
  Computes total unique watched time and percentage of the video completed.  
- **Persistent Storage**  
  Saves per-video progress in `localStorage` so users can resume exactly where they left off.  
- **Custom Video Controls**  
  Play/pause, mute/unmute, and a live time display (MM:SS).  
- **Visual Progress Bar**  
  Displays watched segments and current playback position at a glance.

---

## Tech Stack

- **React** – Component-driven UI  
- **TypeScript** – Static typing for safety and clarity  
- **Vite** – Lightning-fast development server & build tool  
- **Tailwind CSS** – Utility-first styling  
- **Lucide Icons** – Crisp, customizable SVG icons  
- **LocalStorage** – Browser-native persistence  

---

## Project Structure

```
project/
├─ src/
│  ├─ components/
│  │  ├─ VideoPlayer.tsx     # Custom video player with interval tracking
│  │  ├─ ProgressBar.tsx     # Visualizes watched intervals & playback
│  │  └─ LectureCard.tsx     # Displays lecture metadata on HomePage
│  ├─ pages/
│  │  ├─ HomePage.tsx        # List of lectures
│  │  └─ LecturePage.tsx     # Single lecture view
│  ├─ services/
│  │  └─ storageService.ts   # get/save/clear VideoProgress in localStorage
│  ├─ utils/
│  │  └─ intervalUtils.ts    # Merge intervals & calculate watch time/percentage
│  ├─ data/
│  │  └─ mockData.ts         # Sample lecture metadata
│  └─ types/
│     └─ index.ts            # Definitions for VideoInterval, VideoProgress, Lecture
├─ public/
│  └─ index.html
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

---

## Installation & Development

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/unique-video-progress-tracker.git
   cd unique-video-progress-tracker
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the development server**  
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**  
   ```bash
   npm run build
   ```

---

## Usage

1. Browse lectures on the Home page.  
2. Click a lecture card to open the video player.  
3. As you play, pause, or scrub the video, watched segments are recorded.  
4. Below the player, the progress bar highlights which parts you’ve seen.  
5. Your total unique watch percentage appears next to the player.  
6. Reload or return later—the app restores your progress automatically.

---

## API & Data Contracts

> _Note: This project uses `localStorage` for persistence. If you extend to a backend, maintain the same data shapes._

### VideoInterval

```ts
interface VideoInterval {
  start: number;   // seconds
  end: number;     // seconds
}
```

### VideoProgress

```ts
interface VideoProgress {
  videoId: string;
  intervals: VideoInterval[];
}
```

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo  
2. Create your feature branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push to your branch  
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request

Please follow the existing code style and add tests where applicable.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
