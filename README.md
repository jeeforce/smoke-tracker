# 🚬 Smoker Tracker

A Progressive Web App (PWA) to help you track and monitor your smoking habits. Built with React, TypeScript, and Tailwind CSS.

🌐 **[Live Demo](http://smoke-tracker.capwong.dev/)**

![Smoker Tracker](https://img.shields.io/badge/PWA-Enabled-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 📊 **Track Smoking Habits** - Hold-to-track button for easy logging
- 📈 **Visual Statistics** - Interactive charts with time-based filtering (1D, 1W, 1M, 1Y, All)
- 📱 **PWA Support** - Install on mobile devices (iOS & Android)
- 🎨 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔄 **Real-time Updates** - Instant data synchronization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jeeforce/smoke-tracker.git
cd smoke-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📱 PWA Installation

### iOS (Safari)

1. Tap the Share button (square with arrow)
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add"

### Android (Chrome)

1. Tap the menu (three dots)
2. Tap "Install app" or "Add to Home Screen"

### Desktop (Chrome/Edge)

1. Click the install button in the address bar
2. Or use the "Install App" button in the header

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **PWA**: Vite PWA Plugin
- **API**: React Query

## 📁 Project Structure

```
src/
├── components/            # Custom components
├── query/                 # React Query hooks for API calls
├── hooks/                 # Custom React hooks
├── ui/                    # Reusable UI components
└── App.tsx

```

## 🎯 Usage

1. **Track a Smoke**: Press and hold the circular button until the progress completes
2. **View Statistics**: Scroll down to see your smoking stats
3. **Filter History**: Use the dropdown to filter by time period (1D, 1W, 1M, 1Y, All)
4. **Install as App**: Click the "Install App" button for native-like experience

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.
