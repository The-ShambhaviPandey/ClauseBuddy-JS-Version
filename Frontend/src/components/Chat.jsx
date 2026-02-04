const _jsxFileName = "Frontend/src/components/Chat.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Send, Paperclip, Bot, User, X, FileText, Image, File, AlertCircle, CheckCircle, Info } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { createPortal } from 'react-dom';





































export default function Chat() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm ClauseBuddy, your legal AI assistant. I can help you analyze contracts, identify risks, and create plain English summaries. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadCarousel, setShowUploadCarousel] = useState(false);
  
  // Improved toast state - now supports multiple toasts
  const [toasts, setToasts] = useState([]);
  
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const toastTimeouts = useRef(new Map());

  const [chatId, setChatId] = useState(
    localStorage.getItem('currentChatId')
  );

  // Toast management functions
  const showToast = (message, type = 'error', duration = 5000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after duration
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dismissToast(id);
      }, duration);
      toastTimeouts.current.set(id, timeout);
    }
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    
    // Clear timeout if exists
    const timeout = toastTimeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.current.delete(id);
    }
  };

  const clearAllToasts = () => {
    setToasts([]);
    // Clear all timeouts
    toastTimeouts.current.forEach(timeout => clearTimeout(timeout));
    toastTimeouts.current.clear();
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      toastTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    const restoreChat = async () => {
      if (!token || !chatId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/chat/${chatId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const chat = await res.json();
          const restored = chat.messages.map((m, idx) => ({
            id: `${idx}-${Date.now()}`,
            role: m.role,
            content: m.content,
            timestamp: new Date(m.timestamp),
            uploadedFiles: Array.isArray(m.files)
              ? m.files.map((f, fIdx) => ({
                  id: `${fIdx}-${f.fileName}`,
                  type: f.fileType,
                  size: f.fileSize,
                  filePath: f.filePath,
                  fileName: f.fileName
                }))
              : undefined
          }));
          setMessages(restored.length ? restored : messages);
        }
      } catch (error) {
        showToast('Failed to restore chat history', 'error');
      }
    };
    restoreChat();
  }, [chatId, token]);

  const handleSendMessage = async () => {
  if (!inputMessage.trim() && uploadedFiles.length === 0) return;

  let messageContent = inputMessage;
  const filesToSend = [...uploadedFiles];

  const newMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: messageContent,
    timestamp: new Date(),
    uploadedFiles: filesToSend
  };

  setMessages(prev => [...prev, newMessage]);
  setInputMessage('');
  setUploadedFiles([]);

  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
  }

  try {
    // Call Gemini AI instead of your old fetch logic
    const aiAnswer = await queryGemini(messageContent, uploadedFiles);

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: aiAnswer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  } catch (error) {
    console.error('Error sending message:', error);
    const fallbackMessage = {
      id: (Date.now() + 2).toString(),
      role: 'ai',
      content: "I'm having trouble connecting to Gemini. Please try again.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, fallbackMessage]);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Clear toasts when user starts typing a new message
    if (e.key !== 'Enter' && toasts.length > 0) {
      clearAllToasts();
    }
  };

  const handleTextareaChange = (e) => {
    setInputMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileClick = () => {
    _optionalChain([fileInputRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.click, 'call', _3 => _3()]);
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return React.createElement(Image, { size: 16, className: "text-blue-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}} );
    if (fileType.includes('pdf')) return React.createElement(FileText, { size: 16, className: "text-red-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}} );
    return React.createElement(File, { size: 16, className: "text-gray-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}} );
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'error': return React.createElement(AlertCircle, { size: 16, className: "text-red-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}} );
      case 'success': return React.createElement(CheckCircle, { size: 16, className: "text-green-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}} );
      case 'info': return React.createElement(Info, { size: 16, className: "text-blue-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}} );
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'error': return 'bg-red-900/90 text-red-200 border-red-700/40';
      case 'success': return 'bg-green-900/90 text-green-200 border-green-700/40';
      case 'info': return 'bg-blue-900/90 text-blue-200 border-blue-700/40';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const truncateFileName = (fileName, maxLength = 20) => {
    if (fileName.length <= maxLength) return fileName;
    
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fileName.substring(0, maxLength - 3) + '...';
    }
    
    const name = fileName.substring(0, lastDotIndex);
    const extension = fileName.substring(lastDotIndex);
    const availableLength = maxLength - extension.length - 3;
    
    if (availableLength <= 0) {
      return '...' + extension;
    }
    
    return name.substring(0, availableLength) + '...' + extension;
  };

  const handleFileChange = async (e) => {
    const file = _optionalChain([e, 'access', _4 => _4.target, 'access', _5 => _5.files, 'optionalAccess', _6 => _6[0]]);
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      showToast('File is too large. Maximum size is 10MB.', 'error', 4000);
      e.target.value = '';
      return;
    }

    const fileId = Date.now().toString();
    const fileType = file.type;
    const fileSize = file.size;

    let preview;
    if (fileType.startsWith('image/')) {
      preview = URL.createObjectURL(file);
    }

    const uploadedFile = {
      id: fileId,
      file,
      preview,
      type: fileType,
      size: fileSize,
      fileName: file.name,
      isUploading: true,
      uploadProgress: 0
    };

    setUploadedFiles(prev => [...prev, uploadedFile]);
    setIsUploading(true);
    showToast('Uploading file...', 'info', 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/chat/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const uploadedFileData = await response.json();
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                isUploading: false,
                uploadProgress: 100,
                backendId: uploadedFileData.id,
                filePath: uploadedFileData.filePath,
                fileName: uploadedFileData.originalName || uploadedFileData.fileName || f.fileName
              }
            : f
        ));
        // showToast('File uploaded successfully!', 'success', 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('File upload error:', error);
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      // showToast('Failed to upload file. Please try again.', 'error');
    } finally {
      setIsUploading(false);
    }

    e.target.value = '';
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setMessages(prev => prev.filter(msg => msg.id !== fileId));
    showToast('File removed', 'info', 2000);
  };

  const queryGemini = async (message, files = []) => {
  try {
    const payload = {
      query: message,
      files: files.map(f => ({
        fileName: f.fileName,
        filePath: f.filePath,
        backendId: f.backendId,
      }))
    };

    const res = await fetch('http://localhost:8000/api/gemini-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data.answer || "No answer returned.";
  } catch (err) {
    console.error(err);
    return "Error fetching answer.";
  }
};
  return (
    React.createElement(React.Fragment, null
      /* Improved Toast Container */


/* Updated Toast Container - Bottom Right */


, toasts.length > 0 && createPortal(
  React.createElement('div', { 
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999999,
      pointerEvents: 'none',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '16px'
    }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 383}}

    , React.createElement('div', { style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      maxWidth: '400px',
      width: '100%',
      paddingLeft: '16px',
      paddingRight: '16px'
    }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 396}}
      , toasts.map((toast, index) => (
        React.createElement('div', {
          key: toast.id,
          className: `flex items-center space-x-3 px-4 py-3 bg-black/20 rounded-md border text-sm shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out w-full ${getToastStyles(toast.type)}`,
          style: {
            animationDelay: `${index * 100}ms`,
            pointerEvents: 'auto',
            animation: 'slideInFromTop 0.3s ease-out',
            minWidth: '300px'
          }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 407}}

          , getToastIcon(toast.type)
          , React.createElement('span', { className: "flex-1 text-center text-white font-medium"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 418}}, toast.message)
          , React.createElement(Button, {
            variant: "ghost",
            size: "sm",
            onClick: () => dismissToast(toast.id),
            className: "text-current hover:bg-white/20 p-1 h-6 w-6 ml-2 rounded-full"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 419}}

            , React.createElement(X, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 425}} )
          )
        )
      ))

      , toasts.length > 1 && (
        React.createElement(Button, {
          variant: "ghost",
          size: "sm",
          onClick: clearAllToasts,
          className: "text-gray-300 hover:text-white text-xs mt-1 px-3 py-1 rounded-full bg-black/20"       ,
          style: { pointerEvents: 'auto' }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 431}}
, "Clear all ("
            , toasts.length, ")"
        )
      )
    )
  ),
  document.body
)


      , React.createElement('div', { className: "flex flex-col h-full min-h-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 447}}
        /* Chat Header */
        , React.createElement('div', { className: "sticky top-0 z-10 flex items-center justify-between p-4 border-b border-purple-900/30 bg-black/20 backdrop-blur-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 449}}
          , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 450}}
            , React.createElement('div', { className: "p-2 bg-purple-600 rounded-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 451}}
              , React.createElement(Bot, { size: 20, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}} )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 454}}
              , React.createElement('h2', { className: "text-white font-semibold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}}, "ClauseBuddy")
              , React.createElement('p', { className: "text-purple-300 text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 456}}, "Legal AI Assistant"  )
            )
          )

          , React.createElement('div', { className: "flex items-center space-x-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 460}}
            , React.createElement('div', { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 461}})
            , React.createElement('span', { className: "text-green-400 text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 462}}, "Online")
          )
        )

        /* Chat Messages */
        , React.createElement(ScrollArea, { className: "flex-1 p-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 467}}
          , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 468}}
            , messages.map((message) => (
              React.createElement('div', {
                key: message.id,
                className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 470}}

                , React.createElement('div', { className: `flex items-start space-x-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}
                  /* Avatar */
                  , React.createElement('div', { className: `p-2 rounded-full ${
                    message.role === 'user' 
                      ? 'bg-teal-600' 
                      : 'bg-purple-600'
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 478}}
                    , message.role === 'user' ? (
                      React.createElement(User, { size: 16, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}} )
                    ) : (
                      React.createElement(Bot, { size: 16, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 486}} )
                    )
                  )

                  /* Message Bubble */
                  , React.createElement(Card, { className: `p-4 ${
                    message.role === 'user'
                      ? 'bg-teal-900/30 border-teal-600/30'
                      : 'bg-gray-800/50 border-purple-900/30'
                  } backdrop-blur-sm`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 491}}
                    , message.content && (
                      React.createElement('p', { className: "text-white whitespace-pre-wrap" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 497}}
                        , message.content
                      )
                    )

                    , message.uploadedFiles && message.uploadedFiles.length > 0 && (
                      React.createElement('div', { className: "mt-3 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 503}}
                        , message.uploadedFiles.map((file) => (
                          React.createElement('div', { key: file.id, className: "flex items-center space-x-2 p-2 bg-gray-700/30 rounded border border-gray-600/50"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 505}}
                            , getFileIcon(file.type)
                            , React.createElement('span', { className: "text-blue-300 text-sm font-medium"  , title: (file.fileName || (file.file ? file.file.name : '')), __self: this, __source: {fileName: _jsxFileName, lineNumber: 507}}
                              , truncateFileName((file.fileName || (file.file ? file.file.name : '')), 30)
                            )
                            , React.createElement('span', { className: "text-gray-400 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 510}}, "("
                              , formatFileSize(file.size), ")"
                            )
                          )
                        ))
                      )
                    )

                    , React.createElement('p', { className: "text-xs text-purple-300 mt-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 518}}
                      , new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    )
                  )
                )
              )
            ))
          )
        )

        /* Input Area */
        , React.createElement('div', { className: "p-4 border-t border-purple-900/30 bg-black/20 backdrop-blur-sm"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 532}}
          /* Uploaded Files Preview */
          , uploadedFiles.length > 0 && (
            React.createElement('div', { className: "mb-3 flex flex-wrap gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 535}}
              , uploadedFiles.map((file) => (
                React.createElement('div', { key: file.id, className: "flex items-center space-x-2 p-2 bg-gray-700/50 rounded border border-gray-600/50 max-w-xs rounded-lg"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 537}}
                  , getFileIcon(file.type)
                  , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 539}}
                    , React.createElement('p', { className: "text-white text-sm font-medium truncate"   , title: file.fileName || '', __self: this, __source: {fileName: _jsxFileName, lineNumber: 540}}
                      , truncateFileName(file.fileName || '', 20)
                    )
                    , React.createElement('p', { className: "text-gray-400 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 543}}
                      , formatFileSize(file.size)
                    )
                  )

                  , file.isUploading && (
                    React.createElement('div', { className: "flex items-center space-x-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 549}}
                      , React.createElement('div', { className: "w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 550}})
                      , React.createElement('span', { className: "text-purple-400 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 551}}
                        , file.uploadProgress, "%"
                      )
                    )
                  )

                  , !file.isUploading && (
                    React.createElement(Button, {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => handleRemoveFile(file.id),
                      className: "text-gray-400 hover:text-red-400 hover:bg-red-900/20 p-1 h-5 w-5 flex-shrink-0 cursor-pointer"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 558}}

                      , React.createElement(X, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 564}} )
                    )
                  )
                )
              ))
            )
          )

          , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 572}}
            , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 573}}
              , React.createElement(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-purple-400 hover:text-white hover:bg-purple-900/30 cursor-pointer"   ,
                onClick: handleFileClick,
                disabled: isUploading,
                onMouseEnter: () => setShowUploadCarousel(true),
                onMouseLeave: () => setShowUploadCarousel(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 574}}

                , React.createElement(Paperclip, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 583}} )
              )
            )

            , React.createElement('input', {
              type: "file",
              ref: fileInputRef,
              className: "hidden cursor-pointer" ,
              onChange: handleFileChange,
              accept: "image/*,.pdf,.doc,.docx,.txt", __self: this, __source: {fileName: _jsxFileName, lineNumber: 587}}
            )

            , React.createElement('div', { className: "flex-1 relative" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 595}}
              , React.createElement(Textarea, {
                ref: textareaRef,
                value: inputMessage,
                onChange: handleTextareaChange,
                onKeyPress: handleKeyPress,
                placeholder: isUploading ? "Uploading... you can still type a message" : "Ask about your contract...",
                className: "bg-gray-900/50 border-purple-900/30 text-white placeholder-purple-300 focus:border-purple-600 pr-12 resize-none min-h-[40px] max-h-[120px]"        ,
                disabled: isUploading,
                rows: 1, __self: this, __source: {fileName: _jsxFileName, lineNumber: 596}}
              )
            )

            , React.createElement(Button, {
              onClick: handleSendMessage,
              disabled: (!inputMessage.trim() && uploadedFiles.length === 0) || isUploading,
              className: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 transition-all duration-200 cursor-pointer"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 608}}

              , React.createElement(Send, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 613}} )
            )
          )

          , React.createElement('div', { className: "flex items-center justify-center mt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 617}}
            , React.createElement('p', { className: "text-xs text-purple-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 618}}
              , isUploading ? "Upload in progress..." : "ClauseBuddy can make mistakes. Please verify important information."
            )
          )
        )
      )
    )
  );
}