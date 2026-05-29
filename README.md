# 📰 VietNews - All-in-One Vietnamese News Aggregator

Tổng hợp tin tức từ tất cả các báo lớn Việt Nam vào một ứng dụng duy nhất - không quảng cáo, giao diện đẹp, nhanh chóng.

## 🌐 Live Demo

**Web App**: [https://giangnam0201.github.io/VietNews/](https://giangnam0201.github.io/VietNews/)

## ✨ Features

- 📰 Aggregates news from **10+ Vietnamese sources**:
  - VnExpress, Thanh Niên, Tuổi Trẻ, Dân Trí, Kênh 14
  - VietNamNet, Báo Mới, ZingNews, Lao Động, Người Đưa Tin
- 🚫 **No ads** - Clean reading experience
- 🌙 **Dark mode** support
- 🔖 **Bookmark** articles for later reading
- 🔍 **Search** across all sources
- 📂 **Filter** by category and source
- 📱 **PWA** - Install on mobile devices
- 🖥️ **Desktop apps** for Windows, macOS, Linux (Electron)
- ⚡ Fast and responsive design
- 🔄 Auto-refresh every 5 minutes

## 🚀 Quick Start

### Web Development
```bash
npm install
npm run dev
```

### Desktop (Electron)
```bash
npm install
npm run electron:dev
```

### Build for Production
```bash
# Web
npm run build

# Desktop - all platforms
npm run electron:build

# Desktop - specific platform
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux
```

## 📁 Project Structure

```
VietNews/
├── public/              # Static assets & PWA icons
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx   # Navigation & search
│   │   ├── Sidebar.jsx  # Category & source filters
│   │   └── NewsFeed.jsx # News cards grid
│   ├── newsSources.js   # RSS feed configuration
│   ├── App.jsx          # Main application
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── electron/
│   └── main.js          # Electron main process
├── .github/workflows/   # CI/CD
├── vite.config.js       # Vite configuration
└── package.json
```

## 📱 Mobile (PWA)

Visit the web app on your mobile browser and tap "Add to Home Screen" to install the PWA.

## 🖥️ Desktop Downloads

Download the latest desktop app from [Releases](https://github.com/giangnam0201/VietNews/releases).

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Pure CSS (no dependencies)
- **PWA**: vite-plugin-pwa
- **Desktop**: Electron
- **News Sources**: RSS feeds with CORS proxy
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📄 License

MIT
