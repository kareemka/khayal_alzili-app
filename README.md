# 🎬 Khayal Alzili Frontend (خيال الظل)

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/Library-React%2019-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

The flagship streaming experience for **Khayal Alzili**. A high-performance, cinematic web application designed for discovering and watching premium content.

---

## 🌟 Key Features

- 🎭 **Cinematic Experience**: Immersive dark-mode design with fluid transitions and high-quality imagery.
- 📺 **Advanced Video Player**: Custom integration for a seamless viewing experience.
- 🔍 **Dynamic Discovery**: Browse by categories, search for shows, and explore featured banners.
- ⚡ **Next-Gen Performance**: Leveraging Next.js 15+ Server Components for lightning-fast loads.
- 📱 **Adaptive Layout**: fully responsive design optimized for everything from mobile phones to 4K displays.

---

## 🛠️ Tech Stack

- **Core**: [Next.js](https://nextjs.org/) (App Router & Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- Running [API Server](../api) instance.

### Installation

1. Navigate to the project directory:
   ```bash
   cd khayal_alzili
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

### Running Locally

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm run start
```
*Note: The frontend defaults to port `3001`.*

---

## 📂 Structure

```text
app/                # Next.js 15 App Router (Pages, Layouts, API routes)
├── (main)/         # Main platform routes
├── (player)/       # Dedicated video player interface
├── lib/            # Shared utilities and API client
└── components/     # High-end UI components
public/             # Static assets (images, logos, fonts)
```

---

## 📜 License

Private project - All rights reserved.

---

**Crafted with passion for the Khayal Alzili community.**
