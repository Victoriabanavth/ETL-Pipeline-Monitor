# 🔄 ETL Pipeline Monitor

A real-time dashboard for monitoring data pipeline health with animated flow visualization, error tracking, and live metrics.

![Status](https://img.shields.io/badge/Status-Live-brightgreen) ![Tech](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-blue)

🔗 **[Live Demo](https://etl-pipeline-monitor.vercel.app/)** | 📂 **[GitHub Repo](https://github.com/Victoriabanavth/ETL-Pipeline-Monitor)**

## ✨ Features

- **Pipeline Flow Visualization** — Animated ETL stages (Source → Extract → Transform → Load)
- **Real-Time Metrics** — Records processed, throughput, latency, and success rate
- **Active Jobs Panel** — Live job monitoring with progress bars
- **Event Log** — Streaming log entries with severity indicators
- **Data Sources Table** — Filterable view of all connected sources with status
- **Auto-Refresh** — Simulated real-time updates every few seconds

## 📊 Monitored Metrics

| Metric | Description |
|--------|-------------|
| Records Today | Total records processed in current day |
| Throughput/sec | Current processing speed |
| Avg Latency | Average processing delay in milliseconds |
| Success Rate | Percentage of successful operations |

## 🔄 Pipeline Stages

```
📥 Data Sources  →  ⬇️ Extract  →  ⚙️ Transform  →  📊 Load
   (8 Active)        (Process)     (12 Jobs)       (Snowflake)
```

Each stage shows:
- Current status (Healthy/Warning/Error)
- Flow rate between stages
- Animated data flow indicators

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Dashboard structure |
| CSS3 | Dark theme, animations, glassmorphism |
| JavaScript | Real-time simulation & DOM updates |
| JetBrains Mono | Monospace font for log display |

## 🚀 Quick Start

1. Clone or download this folder
2. Open `index.html` in your browser
3. Watch the live simulation run automatically!

```bash
# Or serve locally
npx serve .
```

## 📁 File Structure

```
etl-pipeline-monitor/
├── index.html    # Dashboard layout
├── styles.css    # Dark theme & animations
├── app.js        # Real-time simulation engine
└── README.md     # This file
```

## 🎨 UI Highlights

- **Dark Mode** — Easy on the eyes for monitoring
- **Animated Flow Arrows** — Visual data movement between stages
- **Status Indicators** — Color-coded health badges (Green/Yellow/Red)
- **Streaming Logs** — Terminal-style log viewer with auto-scroll

## 👩‍💻 Author

**Victoria Banavath**  
[Portfolio](https://victoria-banavath.vercel.app/)

---

*Built as a portfolio project demonstrating real-time dashboards and data engineering concepts.*
