import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Card } from "../ui/card";
import { Bot } from "lucide-react";

const Login = ({ onSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onSuccess(data.token, data.user);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            `Login failed with status ${response.status}`
        );
        console.error("Login failed:", response.status, errorData);
      }
    } catch (err) {
      setError(
        "Network error: Unable to connect to the server"
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login was cancelled or failed");
    console.error("Google login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/20" />

      <Card className="relative z-10 p-8 w-[90%] max-w-md bg-gray-900/80 backdrop-blur-sm border border-purple-500/30">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-purple-600 rounded-full">
              <Bot size={28} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            ClauseBuddy
          </h1>
          <p className="text-purple-300">
            Your Legal AI Assistant
          </p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <p className="text-white text-center mb-6">
            Sign in with Google to access your legal documents
            and chat history
          </p>

          <div className="pt-4 flex justify-center">
            <div className="w-2/5 min-w-[260px]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_black"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              By signing in, you agree to our Terms of Service
              and Privacy Policy
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;