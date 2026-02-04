const _jsxFileName = "Frontend/src/components/History.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, MessageCircle, Calendar, FileText, } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';






















export default function History({ onSectionChange }) {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatSessions, setChatSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatHistory();
  }, [token]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChatSessions(data);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = chatSessions.filter(session => {
    const firstUserMessage = session.messages.find(m => m.role === 'user');
    const content = _optionalChain([firstUserMessage, 'optionalAccess', _ => _.content]) || '';
    return content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getSessionTitle = (session) => {
    const firstUserMessage = session.messages.find(m => m.role === 'user');
    return _optionalChain([firstUserMessage, 'optionalAccess', _2 => _2.content, 'access', _3 => _3.substring, 'call', _4 => _4(0, 50)]) + (_optionalChain([firstUserMessage, 'optionalAccess', _5 => _5.content, 'access', _6 => _6.length]) > 50 ? '...' : '') || 'Untitled Chat';
  };

  const getSessionDescription = (session) => {
    const fileCount = session.messages.reduce((count, msg) => count + (_optionalChain([msg, 'access', _7 => _7.files, 'optionalAccess', _8 => _8.length]) || 0), 0);
    const messageCount = session.messages.length;
    return `${messageCount} messages${fileCount > 0 ? `, ${fileCount} file${fileCount > 1 ? 's' : ''}` : ''}`;
  };

  const getFileTypes = (session) => {
    const fileTypes = new Set();
    session.messages.forEach(msg => {
      _optionalChain([msg, 'access', _9 => _9.files, 'optionalAccess', _10 => _10.forEach, 'call', _11 => _11(file => {
        if (file.fileType.includes('pdf')) fileTypes.add('PDF');
        else if (file.fileType.includes('image')) fileTypes.add('Image');
        else if (file.fileType.includes('document')) fileTypes.add('Document');
        else fileTypes.add('File');
      })]);
    });
    return Array.from(fileTypes);
  };

  const handleOpenChat = (sessionId) => {
    localStorage.setItem('currentChatId', sessionId);
    onSectionChange('chat');
  };

  if (loading) {
    return (
      React.createElement('div', { className: "flex items-center justify-center min-h-96"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
        , React.createElement('div', { className: "text-white text-xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}, "Loading chat history..."  )
      )
    );
  }

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
      /* Header */
      , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
          , React.createElement('h1', { className: "text-3xl font-bold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}, "Chat History" )
          , React.createElement('p', { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}, "Review your previous document analyses and conversations"

          )
        )

        /* Search Bar */
        , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
          , React.createElement(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"     , size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}} )
          , React.createElement(Input, {
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Search past chats..."  ,
            className: "pl-10 bg-gray-900/50 border-purple-900/30 text-white placeholder-purple-300 focus:border-purple-600"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
          )
        )
      )

      /* Stats */
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
          , React.createElement(CardContent, { className: "p-4 flex items-center space-x-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
            , React.createElement(MessageCircle, { className: "h-8 w-8 text-purple-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}} )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
              , React.createElement('p', { className: "text-lg font-semibold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, chatSessions.length)
              , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "Total Sessions" )
            )
          )
        )

        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
          , React.createElement(CardContent, { className: "p-4 flex items-center space-x-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
            , React.createElement(FileText, { className: "h-8 w-8 text-teal-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}} )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
              , React.createElement('p', { className: "text-lg font-semibold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
                , chatSessions.reduce((total, session) => total + session.messages.reduce((count, msg) => count + (_optionalChain([msg, 'access', _12 => _12.files, 'optionalAccess', _13 => _13.length]) || 0), 0), 0)
              )
              , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}, "Files Uploaded" )
            )
          )
        )

        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
          , React.createElement(CardContent, { className: "p-4 flex items-center space-x-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
            , React.createElement(Calendar, { className: "h-8 w-8 text-blue-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}} )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
              , React.createElement('p', { className: "text-lg font-semibold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                , chatSessions.reduce((total, session) => total + session.messages.length, 0)
              )
              , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}, "Total Messages" )
            )
          )
        )
      )

      /* Chat Sessions List */
      , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
        , filteredSessions.length === 0 ? (
          React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
            , React.createElement(CardContent, { className: "p-8 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
              , React.createElement(MessageCircle, { className: "h-12 w-12 text-purple-400 mx-auto mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}} )
              , React.createElement('p', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}, "No chat sessions found"   )
              , React.createElement('p', { className: "text-purple-200 text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}, "Try adjusting your search terms"    )
            )
          )
        ) : (
          filteredSessions.map((session) => {
            const fileTypes = getFileTypes(session);
            return (
              React.createElement(Card, { key: session._id, className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm hover:bg-gray-800/50 transition-colors cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
                , React.createElement(CardHeader, { onClick: () => handleOpenChat(session._id), __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                  , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
                    , React.createElement('div', { className: "space-y-2 flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                      , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                        , React.createElement(CardTitle, { className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, getSessionTitle(session))
                        , fileTypes.length > 0 && (
                          React.createElement(Badge, { className: "bg-blue-900/30 text-blue-400 border-blue-600/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                            , fileTypes.join(', ')
                          )
                        )
                      )
                      , React.createElement(CardDescription, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
                        , getSessionDescription(session)
                      )
                      , React.createElement('div', { className: "flex items-center space-x-4 text-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
                        , React.createElement('div', { className: "flex items-center space-x-1 text-purple-300"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}
                          , React.createElement(Calendar, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}} )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}, new Date(session.updatedAt).toLocaleDateString())
                        )
                        , React.createElement('div', { className: "flex items-center space-x-1 text-teal-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}
                          , React.createElement(MessageCircle, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}} )
                          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}, session.messages.length, " messages" )
                        )
                        , fileTypes.length > 0 && (
                          React.createElement('div', { className: "flex items-center space-x-1 text-blue-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
                            , React.createElement(FileText, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}} )
                            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}, fileTypes.length, " file type"  , fileTypes.length > 1 ? 's' : '')
                          )
                        )
                      )
                    )
                    , React.createElement(Button, {
                      variant: "ghost",
                      size: "sm",
                      className: "text-purple-400 hover:text-white hover:bg-purple-900/30"  ,
                      onClick: (e) => {
                        e.stopPropagation();
                        handleOpenChat(session._id);
                      }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
, "Open Chat"

                    )
                  )
                )
              )
            );
          })
        )
      )
    )
  );
}