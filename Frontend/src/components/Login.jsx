const _jsxFileName = "Frontend/src/components/Login.tsx";import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { Card } from './ui/card';
import { Bot } from 'lucide-react';





const Login = ({ onSuccess }) => {

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(data.token, data.user);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    React.createElement('div', { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
      , React.createElement('div', { className: "absolute  inset-0 bg-black/20"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}})
      , React.createElement(Card, { className: "relative z-10 p-8 w-90% max-w-md bg-gray-900/80 backdrop-blur-sm border border-purple-500/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
        , React.createElement('div', { className: "text-center mb-8" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
          , React.createElement('div', { className: "flex items-center justify-center mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
            , React.createElement('div', { className: "p-2 bg-purple-600 rounded-full"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
              , React.createElement(Bot, { size: 28, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}} )
            )
          )
          , React.createElement('h1', { className: "text-3xl font-bold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "ClauseBuddy")
          , React.createElement('p', { className: "text-purple-300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "Your Legal AI Assistant"   )
        )

        , React.createElement('div', { className: "space-y-4 " , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
          , React.createElement('p', { className: "text-white text-center mb-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}, "Sign in with Google to access your legal documents and chat history"

          )

          , React.createElement('div', { className: "pt-4 flex justify-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
            , React.createElement('div', { className: "w-2/5 min-w-[260px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
            , React.createElement(GoogleLogin, {
              onSuccess: handleGoogleSuccess,
              onError: handleGoogleError,
              useOneTap: true,
              theme: "filled_black", __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
            )
            )
          )

          , React.createElement('div', { className: "text-center mt-6" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
            , React.createElement('p', { className: "text-xs text-gray-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}, "By signing in, you agree to our Terms of Service and Privacy Policy"

            )
          )
        )
      )
    )
  );
};

export default Login;
