const _jsxFileName = "Frontend/src/main.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

function Root() {
  const [clientId, setClientId] = useState(
    import.meta.env.VITE_GOOGLE_CLIENT_ID || null
  );
  const [loading, setLoading] = useState(!clientId);

  useEffect(() => {
    if (clientId) return; // already provided via env
    const fetchClientId = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/google-client-id");
        if (res.ok) {
          const data = await res.json();
          if (_optionalChain([data, 'optionalAccess', _2 => _2.clientId])) setClientId(data.clientId);
        }
      } catch (_) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchClientId();
  }, [clientId]);

  if (!clientId && loading) return null;

  return (
    React.createElement(React.StrictMode, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
      , React.createElement(GoogleOAuthProvider, { clientId: clientId || "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , React.createElement(App, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 36}} )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Root, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 42}} ));
  