const _jsxFileName = "Frontend/src/components/Dashboard.tsx";import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, MessageCircle, FileText, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';





export default function Dashboard({ onSectionChange }) {
  const stats = [
    {
      title: 'Documents Analyzed',
      value: '24',
      icon: FileText,
      color: 'text-teal-400',
      bgColor: 'bg-teal-900/20'
    },
    {
      title: 'Risks Flagged',
      value: '7',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20'
    },
    {
      title: 'Summaries Created',
      value: '15',
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    }
  ];

  const recentActivity = [
    {
      title: 'Rental Agreement Analysis',
      description: 'Identified 3 potential risks in lease terms',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      title: 'Employment Contract Review',
      description: 'Summary generated for HR department',
      time: '1 day ago',
      status: 'completed'
    },
    {
      title: 'NDA Simplification',
      description: 'Plain English version created',
      time: '2 days ago',
      status: 'completed'
    },
    {
      title: 'Service Agreement Upload',
      description: 'Currently processing document',
      time: '3 days ago',
      status: 'processing'
    }
  ];

  return (
    React.createElement('div', { className: "space-y-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
      /* Welcome Header */
      , React.createElement('div', { className: "text-center space-y-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
        , React.createElement('h1', { className: "text-4xl font-bold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Welcome to ClauseBuddy"

        )
        , React.createElement('p', { className: "text-purple-200 text-lg max-w-2xl mx-auto"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "Your AI-powered legal document analyzer. Upload contracts, get plain English summaries, and identify potential risks instantly."


        )
      )

      /* Quick Actions */
      , React.createElement('div', { className: "flex justify-center space-x-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
        , React.createElement(Button, {
          size: "lg",
          className: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 transition-all duration-200"      ,
          onClick: () => onSectionChange('uploads'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}

          , React.createElement(Upload, { className: "mr-2", size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}} ), "Upload Document"

        )
        , React.createElement(Button, {
          size: "lg",
          variant: "outline",
          className: "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-all duration-200"     ,
          onClick: () => onSectionChange('chat'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}

          , React.createElement(MessageCircle, { className: "mr-2", size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} ), "Start New Chat"

        )
      )

      /* Stats Cards */
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
        , stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            React.createElement(Card, { key: index, className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
              , React.createElement(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
                , React.createElement(CardTitle, { className: "text-sm font-medium text-purple-200"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
                  , stat.title
                )
                , React.createElement('div', { className: `p-2 rounded-lg ${stat.bgColor}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
                  , React.createElement(Icon, { className: `h-4 w-4 ${stat.color}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}} )
                )
              )
              , React.createElement(CardContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
                , React.createElement('div', { className: "text-2xl font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}, stat.value)
              )
            )
          );
        })
      )

      /* Recent Activity */
      , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
        , React.createElement(CardHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
          , React.createElement(CardTitle, { className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "Recent Activity" )
          , React.createElement(CardDescription, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "Your latest document analyses and summaries"

          )
        )
        , React.createElement(CardContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
          , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
            , recentActivity.map((activity, index) => (
              React.createElement('div', { key: index, className: "flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
                , React.createElement('div', { className: `p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-900/30' : 'bg-yellow-900/30'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                  , activity.status === 'completed' ? (
                    React.createElement(CheckCircle2, { className: "h-4 w-4 text-green-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}} )
                  ) : (
                    React.createElement(Clock, { className: "h-4 w-4 text-yellow-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} )
                  )
                )
                , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                  , React.createElement('p', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, activity.title)
                  , React.createElement('p', { className: "text-purple-200 text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, activity.description)
                  , React.createElement('p', { className: "text-purple-300 text-xs mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}, activity.time)
                )
              )
            ))
          )
        )
      )
    )
  );
}