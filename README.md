# 🪙 Currency Converter

A sleek, responsive, and modern React web application built with **Vite** and **Tailwind CSS v4** that offers real-time and historical currency exchange rate conversions.

---

## 🚀 Features

- **Real-Time Conversions:** Seamlessly computes exchange rates as you type.
- **One-Click Currency Swap:** Easily flip the "from" and "to" currencies instantly.
- **Historical Data Lookup:** Choose any date back to March 2024 to view and convert rates using historical data.
- **Resilient API Layer:** Leverages a custom hook with built-in fallback mechanisms to fetch rates and clear data state safely.
- **Robust Error Handling:** Features a connection error banner, automatic offline/network state updates, and manual retry options.
- **Premium Glassmorphic UI:** Built with custom Tailwind transitions, gradients, and a modern card design optimized for all screen sizes.

---

## 🛠️ Tech Stack

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **API Reference:** Free currency rates tracker API hosted on jsDelivr CDN via `@fawazahmed0/currency-api`.

---

## 📁 Project Structure

```text
currency-converter/
├── public/                 # Static assets
└── src/
    ├── components/
    │   └── CurrecyCard.jsx  # Reusable currency selection and input card
    ├── service/
    │   └── service.js      # Custom React hook (useCurrencyInfo) for fetching rates
    ├── App.css             # Component-level/custom animations and adjustments
    ├── App.jsx             # Main application orchestrator and UI container
    ├── index.css           # Global Tailwind CSS entrypoint
    └── main.jsx            # Application bootstrap file
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd currency-converter
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Production Build

To build the application for production deployment:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.
