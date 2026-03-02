import React, { useEffect, useState } from "react";
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
    if (clientId) {
      console.log("Google Client ID loaded from environment");
      return;
    }
    
    const fetchClientId = async () => {
      try {
        console.log("Fetching Google Client ID from backend...");
        const res = await fetch("http://localhost:5000/api/auth/google-client-id");
        if (res.ok) {
          const data = await res.json();
          if (data?.clientId) {
            console.log("Google Client ID received from backend");
            setClientId(data.clientId);
          } else {
            console.error("No clientId in response from backend");
          }
        } else {
          console.error("Failed to fetch client ID from backend:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching Google Client ID:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientId();
  }, [clientId]);

  if (!clientId) {
    if (loading) return null;
    console.error("Google Client ID is not available");
    return React.createElement('div', { style: { padding: '20px', color: 'red' } }, "Error: Google Client ID not configured");
  }

  return (
    React.createElement(React.StrictMode, {__self: this, __source: {fileName: "Frontend/src/main.jsx", lineNumber: 48}}
      , React.createElement(GoogleOAuthProvider, { clientId: clientId, __self: this, __source: {fileName: "Frontend/src/main.jsx", lineNumber: 49}}
        , React.createElement(App, {__self: this, __source: {fileName: "Frontend/src/main.jsx", lineNumber: 50}} )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Root, {__self: this, __source: {fileName: "Frontend/src/main.jsx", lineNumber: 56}} ));