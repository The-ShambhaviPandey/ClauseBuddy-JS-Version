# Frontend — ClauseBuddy UI

React + Vite frontend providing the chat interface, document upload, dashboard, and authentication flow for ClauseBuddy.

---

## Purpose

This is the client-facing application. It provides:

- Google OAuth login flow
- PDF upload interface
- Chat UI for querying documents
- Dashboard with history and settings
- Sidebar navigation and right panel layout

---

## File Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Chat.jsx            # Main chat interface
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── History.jsx         # Chat history view
│   │   ├── Login.jsx           # Login component
│   │   ├── RightPanel.jsx      # Document context panel
│   │   ├── Settings.jsx        # User settings
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── StarField.jsx       # Background animation
│   │   ├── Uploads.jsx         # File upload component
│   │   └── figma/
│   │       └── ImageWithFallback.jsx   # Figma export helper
│   ├── contexts/
│   │   └── AuthContext.jsx     # Global auth state (JWT + user)
│   ├── pages/
│   │   └── Login.jsx           # Login page (route entry point)
│   ├── ui/                     # shadcn/ui component library (auto-generated)
│   │   ├── button.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   └── ...                 # all other shadcn primitives
│   ├── App.jsx                 # Root component + React Router routes
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles + Tailwind directives
├── index.html                  # Vite HTML entry
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Architecture

```
main.jsx
    └── App.jsx  (React Router)
            ├── /login        → pages/Login.jsx
            │       └── AuthContext → Google OAuth / JWT
            ├── /dashboard    → components/Dashboard.jsx
            ├── /chat         → components/Chat.jsx
            │       └── POST /api/chat  →  Backend (port 5000)
            ├── /history      → components/History.jsx
            ├── /uploads      → components/Uploads.jsx
            │       └── POST file  →  Backend (port 5000)
            └── /settings     → components/Settings.jsx

ui/           — shadcn/ui primitives (do not edit manually)
contexts/     — global state shared across all routes
```

---

## Setup

### Prerequisites

- Node.js v18+
- Backend running on `http://localhost:5000`

### Install & Run

```bash
cd Frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

> `VITE_GOOGLE_CLIENT_ID` must match the one configured in Google Cloud Console and in `Backend/.env`.

> All env variables in Vite **must** be prefixed with `VITE_` to be accessible in the browser.

---

## Dependencies

| Package                   | Purpose                                   |
| ------------------------- | ----------------------------------------- |
| `react` + `react-dom`     | UI framework                              |
| `react-router-dom`        | Client-side routing                       |
| `vite`                    | Dev server and bundler                    |
| `tailwindcss`             | Utility-first CSS                         |
| `shadcn-ui` + `@radix-ui` | Accessible UI component primitives        |
| `lucide-react`            | Icon library                              |
| `@react-oauth/google`     | Google OAuth client for React             |
| `react-hook-form`         | Form state management                     |
| `sonner`                  | Toast notifications                       |
| `recharts`                | Data visualisation (if used in dashboard) |
| `axios`                   | HTTP requests to backend                  |

---

## Dev Guidelines

- Use **flexbox and grid** by default — avoid absolute positioning unless necessary
- Keep component files small; extract sub-components and helpers into their own files
- Refactor as you go — aim to keep files under ~200 lines
- `ui/` components are auto-generated via shadcn CLI — do not edit them manually; regenerate instead
- All API calls must reference `VITE_API_URL` from env — never hardcode `localhost:5000`
- `components/Login.jsx` and `pages/Login.jsx` are duplicates — consolidate into `pages/` only

---

## Notes

- The `figma/` folder holds design-to-code exports — treat as read-only reference material
- `StarField.jsx` is a decorative background component — safe to remove if performance is a concern
- Run `npm run build` to generate a production bundle in `dist/`

---
