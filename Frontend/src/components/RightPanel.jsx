const _jsxFileName = "Frontend/src/components/RightPanel.tsx";import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

import { 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  AlertTriangle, 
  CheckCircle2,
  Eye,
  Download,
  Copy
} from 'lucide-react';






export default function RightPanel({ isExpanded, onToggle }) {
  const [activeTab, setActiveTab] = useState('summary');

  const documentSummary = {
    title: 'Rental Agreement - Simplified',
    type: 'Lease Agreement',
    pages: 12,
    sections: [
      {
        title: 'Property Details',
        content: 'This agreement is for a 2-bedroom apartment at 123 Main Street, furnished, available from January 1, 2025.'
      },
      {
        title: 'Rent & Payments',
        content: 'Monthly rent is $2,500, due on the 1st of each month. Late fees of $50 apply after the 5th. Security deposit is $2,500.'
      },
      {
        title: 'Term & Renewal',
        content: '12-month lease starting January 1, 2025. Automatic renewal unless 60-day notice is given by either party.'
      },
      {
        title: 'Tenant Responsibilities',
        content: 'Maintain property cleanliness, no smoking, no pets without written permission. Tenant pays utilities except water/sewer.'
      }
    ]
  };

  const risks = [
    {
      id: 1,
      level: 'high',
      title: 'Excessive Late Fees',
      description: 'Late fee of $50 may be considered excessive for a $2,500 monthly rent.',
      clause: 'Section 3.2 - Payment Terms',
      recommendation: 'Negotiate for a lower late fee or percentage-based calculation.'
    },
    {
      id: 2,
      level: 'medium',
      title: 'Automatic Renewal Clause',
      description: 'Lease automatically renews unless notice is given 60 days in advance.',
      clause: 'Section 8.1 - Term and Renewal',
      recommendation: 'Consider requesting a shorter notice period or opt-out clause.'
    },
    {
      id: 3,
      level: 'low',
      title: 'Pet Policy Restriction',
      description: 'No pets allowed without written permission from landlord.',
      clause: 'Section 6.3 - Property Use',
      recommendation: 'If you have pets, negotiate pet policy before signing.'
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-900/30 text-red-400 border-red-600/30';
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-600/30';
      case 'low':
        return 'bg-blue-900/30 text-blue-400 border-blue-600/30';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-600/30';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'high':
        return React.createElement(AlertTriangle, { className: "h-4 w-4 text-red-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}} );
      case 'medium':
        return React.createElement(AlertTriangle, { className: "h-4 w-4 text-yellow-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}} );
      case 'low':
        return React.createElement(CheckCircle2, { className: "h-4 w-4 text-blue-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}} );
      default:
        return null;
    }
  };

  return (
    React.createElement('div', { className: `
      fixed right-0 top-0 h-full bg-gray-900/80 backdrop-blur-sm border-l border-purple-900/30 
      transition-all duration-300 z-10
      ${isExpanded ? 'w-96' : 'w-12'}
    `, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
      /* Toggle Button */
      , React.createElement(Button, {
        variant: "ghost",
        size: "icon",
        onClick: onToggle,
        className: "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg z-20"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}

        , isExpanded ? React.createElement(ChevronRight, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} ) : React.createElement(ChevronLeft, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} )
      )

      , isExpanded && (
        React.createElement('div', { className: "flex flex-col h-full"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
          /* Header */
          , React.createElement('div', { className: "p-4 border-b border-purple-900/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
            , React.createElement('h2', { className: "text-white font-semibold mb-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Document Analysis" )
            , React.createElement('div', { className: "flex space-x-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
              , React.createElement(Button, {
                variant: activeTab === 'summary' ? 'default' : 'ghost',
                size: "sm",
                onClick: () => setActiveTab('summary'),
                className: `flex-1 ${
                  activeTab === 'summary' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}

                , React.createElement(FileText, { size: 14, className: "mr-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} ), "Summary"

              )
              , React.createElement(Button, {
                variant: activeTab === 'risks' ? 'default' : 'ghost',
                size: "sm",
                onClick: () => setActiveTab('risks'),
                className: `flex-1 ${
                  activeTab === 'risks' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}

                , React.createElement(AlertTriangle, { size: 14, className: "mr-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}} ), "Risks ("
                 , risks.length, ")"
              )
            )
          )

          /* Content */
          , React.createElement(ScrollArea, { className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
            , activeTab === 'summary' ? (
              React.createElement('div', { className: "p-4 space-y-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
                /* Document Info */
                , React.createElement(Card, { className: "bg-gray-800/50 border-purple-900/30" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
                  , React.createElement(CardHeader, { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
                    , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
                      , React.createElement(CardTitle, { className: "text-white text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}, documentSummary.title)
                      , React.createElement(Button, { variant: "ghost", size: "icon", className: "text-purple-400 hover:text-white" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                        , React.createElement(Copy, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}} )
                      )
                    )
                    , React.createElement('div', { className: "flex items-center space-x-2 text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                      , React.createElement(Badge, { variant: "outline", className: "border-purple-600 text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                        , documentSummary.type
                      )
                      , React.createElement('span', { className: "text-purple-300", __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}, documentSummary.pages, " pages" )
                    )
                  )
                )

                /* Summary Sections */
                , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                  , documentSummary.sections.map((section, index) => (
                    React.createElement(Card, { key: index, className: "bg-gray-800/30 border-purple-900/30" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                      , React.createElement(CardHeader, { className: "pb-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
                        , React.createElement(CardTitle, { className: "text-white text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, section.title)
                      )
                      , React.createElement(CardContent, { className: "pt-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                        , React.createElement('p', { className: "text-purple-200 text-sm leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                          , section.content
                        )
                      )
                    )
                  ))
                )

                /* Actions */
                , React.createElement('div', { className: "space-y-2 pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}
                  , React.createElement(Button, { 
                    variant: "outline", 
                    size: "sm", 
                    className: "w-full border-purple-600 text-purple-400 hover:bg-purple-900/30"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}

                    , React.createElement(Eye, { size: 14, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}} ), "View Full Document"

                  )
                  , React.createElement(Button, { 
                    variant: "outline", 
                    size: "sm", 
                    className: "w-full border-teal-600 text-teal-400 hover:bg-teal-900/30"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}

                    , React.createElement(Download, { size: 14, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}} ), "Export Summary"

                  )
                )
              )
            ) : (
              React.createElement('div', { className: "p-4 space-y-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}
                /* Risk Overview */
                , React.createElement(Card, { className: "bg-gray-800/50 border-purple-900/30" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
                  , React.createElement(CardHeader, { className: "pb-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
                    , React.createElement(CardTitle, { className: "text-white text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}, "Risk Assessment" )
                    , React.createElement(CardDescription, { className: "text-xs text-purple-200" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}
                      , risks.filter(r => r.level === 'high').length, " high, "  , ' '
                      , risks.filter(r => r.level === 'medium').length, " medium, "  , ' '
                      , risks.filter(r => r.level === 'low').length, " low risk items found"
                    )
                  )
                )

                /* Risk Items */
                , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
                  , risks.map((risk) => (
                    React.createElement(Card, { key: risk.id, className: "bg-gray-800/30 border-purple-900/30" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
                      , React.createElement(CardHeader, { className: "pb-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}
                        , React.createElement('div', { className: "flex items-start justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
                          , React.createElement('div', { className: "flex items-center space-x-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
                            , getRiskIcon(risk.level)
                            , React.createElement(CardTitle, { className: "text-white text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}, risk.title)
                          )
                          , React.createElement(Badge, { className: getRiskColor(risk.level), __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
                            , risk.level
                          )
                        )
                      )
                      , React.createElement(CardContent, { className: "pt-0 space-y-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
                        , React.createElement('p', { className: "text-purple-200 text-xs leading-relaxed"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}
                          , risk.description
                        )
                        , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
                          , React.createElement('div', { className: "p-2 bg-gray-900/50 rounded text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
                            , React.createElement('p', { className: "text-purple-300 font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, "Found in:" )
                            , React.createElement('p', { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}, risk.clause)
                          )
                          , React.createElement('div', { className: "p-2 bg-blue-900/20 rounded text-xs"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
                            , React.createElement('p', { className: "text-blue-300 font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}, "Recommendation:")
                            , React.createElement('p', { className: "text-blue-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}, risk.recommendation)
                          )
                        )
                      )
                    )
                  ))
                )

                /* Actions */
                , React.createElement('div', { className: "space-y-2 pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
                  , React.createElement(Button, { 
                    variant: "outline", 
                    size: "sm", 
                    className: "w-full border-red-600 text-red-400 hover:bg-red-900/30"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}

                    , React.createElement(AlertTriangle, { size: 14, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}} ), "Export Risk Report"

                  )
                )
              )
            )
          )
        )
      )
    )
  );
}