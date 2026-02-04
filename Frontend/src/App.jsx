const _jsxFileName = "Frontend/src/App.tsx";import { useState, } from "react";
import StarField from "./components/StarField";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import History from "./components/History";
import Uploads from "./components/Uploads";
import RightPanel from "./components/RightPanel";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";


function AppContent() {
  const { user, loading, login } = useAuth();
  const [activeSection, setActiveSection] = useState("chat");
  const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Track section changes to trigger uploads refresh
  const [sectionChangeKey, setSectionChangeKey] = useState(0);

  if (loading) {
    return (
      React.createElement('div', { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
        , React.createElement('div', { className: "text-white text-xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}, "Loading...")
      )
    );
  }

  if (!user) {
    return React.createElement(Login, { onSuccess: (token, userData) => {
      login(token, userData);
    }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}} );
  }

  // normal app UI after login
  const renderMainContent = () => {
    switch (activeSection) {
      case "chat":
        return React.createElement(Chat, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} );
      case "history":
        return React.createElement(History, { onSectionChange: setActiveSection, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} );
      case "uploads":
        return React.createElement(Uploads, { key: sectionChangeKey, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} );
      default:
        return React.createElement(Chat, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 45}} );
    }
  };

  return (
    React.createElement('div', { className: "h-screen overflow-hidden bg-black text-white dark relative"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
      /* Animated Star Background */
      , React.createElement(StarField, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} )

      /* Sidebar */
      , React.createElement(Sidebar, {
        activeSection: activeSection,
        onSectionChange: (section) => {
          setActiveSection(section);
          setSectionChangeKey(prev => prev + 1);
        },
        isCollapsed: isSidebarCollapsed,
        onCollapseChange: setIsSidebarCollapsed,
        onLoginClick: () => {}, __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
      )

      /* Main Content Area */
      , React.createElement('div', { className: "relative z-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
        , React.createElement('div', {
          className: `
          transition-all duration-300
          ${isSidebarCollapsed ? "ml-16" : "ml-64"}
          ${activeSection === "chat" && isRightPanelExpanded ? "mr-96" : "mr-0"}
          ${activeSection === "chat" ? "mr-12" : "mr-0"}
        `, __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}

          , React.createElement('div', {
            className: `
            p-6
            ${activeSection === "chat" ? "h-screen flex flex-col" : "min-h-screen"}
          `, __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}

            , activeSection === "chat" ? (
              React.createElement('div', { className: "flex-1 h-full bg-black/20 backdrop-blur-sm rounded-lg border border-purple-900/30 overflow-hidden min-h-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
                , React.createElement(Chat, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 84}} )
              )
            ) : (
              React.createElement('div', { className: "max-w-7xl mx-auto" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, renderMainContent())
            )
          )
        )
      )

      /* Right Panel - Only show for chat */
      , activeSection === "chat" && (
        React.createElement(RightPanel, {
          isExpanded: isRightPanelExpanded,
          onToggle: () => setIsRightPanelExpanded(!isRightPanelExpanded), __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
        )
      )
    )
  );
}

export default function App() {
  return (
    React.createElement(AuthProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
      , React.createElement(AppContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 107}} )
    )
  );
}
