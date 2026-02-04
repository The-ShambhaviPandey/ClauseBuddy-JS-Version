const _jsxFileName = "Frontend/src/components/Uploads.tsx";import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Trash2, 
  Eye, 
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';











export default function Uploads() {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  // Fetch uploaded files
  useEffect(() => {
    fetchFiles();
  }, [token]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && token) fetchFiles();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [token]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/files', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/files/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setFiles(prev => prev.filter(f => f._id !== fileId));
      }
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return React.createElement(FileText, { className: "h-8 w-8 text-red-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}} );
    if (fileType.includes('image')) return React.createElement(FileText, { className: "h-8 w-8 text-blue-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}} );
    if (fileType.includes('document')) return React.createElement(FileText, { className: "h-8 w-8 text-green-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}} );
    return React.createElement(FileText, { className: "h-8 w-8 text-purple-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}} );
  };

  const getFileTypeLabel = (fileType) => {
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('image')) return 'Image';
    if (fileType.includes('document')) return 'Document';
    return 'File';
  };

  // Gemini query function
  const queryGemini = async (query) => {
    const res = await fetch('http://localhost:8000/api/gemini-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    return data.answer;
  };

  if (loading) {
    return (
      React.createElement('div', { className: "flex items-center justify-center min-h-96"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
        , React.createElement('div', { className: "text-white text-xl" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}, "Loading files..." )
      )
    );
  }

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
      /* Header */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
        , React.createElement('h1', { className: "text-3xl font-bold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "Document Uploads" )
        , React.createElement('p', { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "View your uploaded documents and analysis history"      )
      )

      /* File Stats */
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
          , React.createElement(CardContent, { className: "p-4 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
            , React.createElement('p', { className: "text-2xl font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}, files.length)
            , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}, "Total Files" )
          )
        )
        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
          , React.createElement(CardContent, { className: "p-4 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
            , React.createElement('p', { className: "text-2xl font-bold text-green-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, files.filter(f => f.fileType.includes('pdf')).length)
            , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, "PDF Files" )
          )
        )
        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
          , React.createElement(CardContent, { className: "p-4 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
            , React.createElement('p', { className: "text-2xl font-bold text-blue-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, files.filter(f => f.fileType.includes('image')).length)
            , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, "Images")
          )
        )
        , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
          , React.createElement(CardContent, { className: "p-4 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
            , React.createElement('p', { className: "text-2xl font-bold text-teal-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
              , files.reduce((total, file) => total + file.fileSize, 0) > 0
                ? formatFileSize(files.reduce((total, file) => total + file.fileSize, 0))
                : '0 B'
            )
            , React.createElement('p', { className: "text-sm text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}, "Total Size" )
          )
        )
      )

      /* Files Grid */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
        , React.createElement('h2', { className: "text-xl font-semibold text-white mb-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, "Your Documents" )
        , files.length === 0 ? (
          React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
            , React.createElement(CardContent, { className: "p-8 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
              , React.createElement(FileText, { className: "h-12 w-12 text-purple-400 mx-auto mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}} )
              , React.createElement('p', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}, "No documents in history"   )
              , React.createElement('p', { className: "text-purple-200 text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}, "Your analyzed documents will appear here"     )
            )
          )
        ) : (
          React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
            , files.map(file => (
              React.createElement(Card, { key: file._id, className: "bg-gray-900/60 border-purple-900/30 hover:bg-gray-900/80 transition-colors overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
                , React.createElement(CardContent, { className: "p-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
                  , React.createElement('div', { className: "aspect-[4/3] bg-gray-800/50 flex items-center justify-center"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
                    , getFileIcon(file.fileType)
                  )
                  , React.createElement('div', { className: "p-3 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
                    , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
                      , React.createElement('p', { className: "text-white text-sm font-medium truncate mr-2"    , title: file.originalName, __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}, file.originalName)
                      , React.createElement(Badge, { className: "bg-blue-900/30 text-blue-400 border-blue-600/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, getFileTypeLabel(file.fileType))
                    )
                    , React.createElement('div', { className: "flex items-center justify-between text-xs text-purple-300"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, formatFileSize(file.fileSize))
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}, new Date(file.uploadedAt).toLocaleDateString())
                    )
                    , React.createElement('div', { className: "flex items-center justify-end gap-1 pt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "text-purple-400 hover:text-white hover:bg-purple-900/30"  , onClick: () => window.open(`http://localhost:5000/uploads/${file.fileName}`, '_blank'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}, React.createElement(Eye, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}} ))
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "text-teal-400 hover:text-white hover:bg-teal-900/30"  , onClick: () => { const link = document.createElement('a'); link.href = `http://localhost:5000/uploads/${file.fileName}`; link.download = file.originalName; link.click(); }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, React.createElement(Download, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}} ))
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "text-red-400 hover:text-white hover:bg-red-900/30"  , onClick: () => handleDeleteFile(file._id), __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}, React.createElement(Trash2, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}} ))
                    )
                  )
                )
              )
            ))
          )
        )
      )

      /* Gemini Q&A */
      , React.createElement('div', { className: "mt-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
        , React.createElement('h2', { className: "text-xl font-semibold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}, "Ask about your documents"   )
        , React.createElement('textarea', {
          className: "w-full p-2 rounded bg-gray-800 text-white border border-purple-600"      ,
          rows: 4,
          placeholder: "Type your legal question..."   ,
          value: query,
          onChange: (e) => setQuery(e.target.value), __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
        )
        , React.createElement('div', { className: "flex gap-2 mt-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
          , React.createElement(Button, {
            disabled: loadingAnswer || !query,
            onClick: async () => {
              setLoadingAnswer(true);
              try {
                const answerText = await queryGemini(query);
                setAnswer(answerText || 'No answer returned.');
              } catch (err) {
                console.error(err);
                setAnswer('Error fetching answer.');
              } finally {
                setLoadingAnswer(false);
              }
            }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}

            , loadingAnswer ? 'Thinking...' : 'Ask'
          )
          , React.createElement(Button, { variant: "secondary", onClick: () => { setQuery(''); setAnswer(''); }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}, "Clear")
        )

        , answer && (
          React.createElement('div', { className: "mt-4 p-3 bg-gray-800/70 border border-purple-700 rounded"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
            , React.createElement('h3', { className: "text-white font-medium mb-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}, "Answer:")
            , React.createElement('p', { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}, answer)
          )
        )
      )
    )
  );
}