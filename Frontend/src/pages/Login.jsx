const _jsxFileName = "Frontend/src/pages/Login.tsx";import { GoogleLogin } from "@react-oauth/google";

export default function Login({ onLoginSuccess }) {
  return (
    React.createElement('div', { className: "flex items-center justify-center min-h-screen bg-black text-white"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 5}}
      , React.createElement(GoogleLogin, {
        onSuccess: (response) => {
          console.log("Google Login Success:", response);
          onLoginSuccess(response);
        },
        onError: () => console.log("Google Login Failed"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 6}}
      )
    )
  );
}

