const _jsxFileName = "Frontend/src/components/Sidebar.tsx";
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  MessageCircle,
  History, 
  Upload, 
  Menu,
  X,
  LogIn,

} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';










export default function Sidebar({ activeSection, onSectionChange, isCollapsed, onCollapseChange, onLoginClick}) {
  const { user } = useAuth();

  const navigationItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'uploads', label: 'Uploads', icon: Upload },
  ];

  const BowtieLogo = () => (
    React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
      , React.createElement('svg', { width: "32", height: "32", viewBox: "0 0 32 32"   , className: "text-purple-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , React.createElement('path', {
          d: "M8 12 L16 16 L24 12 L24 20 L16 16 L8 20 Z"            ,
          fill: "currentColor",
          className: "drop-shadow-lg", __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
        )
        , React.createElement('path', {
          d: "M6 10 L16 8 L26 10 L16 14 Z"        ,
          fill: "currentColor",
          opacity: "0.8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
        )
        , React.createElement('path', {
          d: "M6 22 L16 24 L26 22 L16 18 Z"        ,
          fill: "currentColor",
          opacity: "0.8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
        )
      )
    )
  );

  return (
    React.createElement(TooltipProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
      , React.createElement('div', { className: `
        fixed left-0 top-0 h-full bg-black/80 backdrop-blur-sm border-r border-purple-900/30 
        transition-all duration-300 z-10
        ${isCollapsed ? 'w-16' : 'w-64'}
      `, __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
        , React.createElement('div', { className: "flex flex-col h-full"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
          /* Header */
          , React.createElement('div', { className: "flex items-center justify-between p-4 border-b border-purple-900/30"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
            , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
              , React.createElement(BowtieLogo, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} )
              , !isCollapsed && (
                React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
                  , React.createElement('h1', { className: "text-lg font-semibold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}, "ClauseBuddy")
                  , React.createElement('p', { className: "text-xs text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}, "Legal Simplifier" )
                )
              )
            )
            , React.createElement(Button, {
              variant: "ghost",
              size: "icon",
              onClick: () => onCollapseChange(!isCollapsed),
              className: "text-purple-300 hover:text-white hover:bg-purple-900/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}

              , isCollapsed ? React.createElement(Menu, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}} ) : React.createElement(X, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}} )
            )
          )

          /* Navigation */
          , React.createElement('nav', { className: "flex-1 p-4 space-y-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
            , navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              if (isCollapsed) {
                return (
                  React.createElement(Tooltip, { key: item.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                    , React.createElement(TooltipTrigger, { asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
                      , React.createElement(Button, {
                        variant: isActive ? "default" : "ghost",
                        className: `
                          w-full flex items-center justify-center transition-all duration-200
                          ${isActive 
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                            : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                          }
                          px-2
                        `,
                        onClick: () => onSectionChange(item.id), __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}

                        , React.createElement(Icon, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}} )
                      )
                    )
                    , React.createElement(TooltipContent, { side: "right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
                      , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}, item.label)
                    )
                  )
                );
              }

              return (
                React.createElement(Button, {
                  key: item.id,
                  variant: isActive ? "default" : "ghost",
                  className: `
                    w-full justify-start transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                      : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                    }
                    px-4
                  `,
                  onClick: () => onSectionChange(item.id), __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}

                  , React.createElement(Icon, { size: 18, className: "mr-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} )
                  , item.label
                )
              );
            })
          )

          /* Footer */
          , React.createElement('div', { className: "p-4 border-t border-purple-900/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
            , user ? (
              isCollapsed ? (
                React.createElement('div', { className: "flex items-center justify-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
                  , React.createElement('img', {
                    src: user.avatar || '',
                    alt: user.name,
                    className: "h-8 w-8 rounded-full border border-purple-700 object-cover"     ,
                    onError: (e) => { (e.currentTarget ).src = 'https://www.gravatar.com/avatar/?d=mp'; }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                  )
                )
              ) : (
                React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
                  , React.createElement('img', {
                    src: user.avatar || '',
                    alt: user.name,
                    className: "h-9 w-9 rounded-full border border-purple-700 object-cover"     ,
                    onError: (e) => { (e.currentTarget ).src = 'https://www.gravatar.com/avatar/?d=mp'; }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
                    , React.createElement('p', { className: "text-white font-medium truncate max-w-[10rem]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, user.name)
                    , React.createElement('p', { className: "text-xs text-purple-300 truncate max-w-[10rem]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, user.email)
                  )
                )
              )
            ) : (
              isCollapsed ? (
                React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
                  , React.createElement(Tooltip, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}
                    , React.createElement(TooltipTrigger, { asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                      , React.createElement(Button, {
                        variant: "outline",
                        size: "icon",
                        className: "w-full border-purple-600/50 text-purple-300 hover:text-white hover:bg-purple-900/30"    ,
                        onClick: onLoginClick, __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}

                        , React.createElement(LogIn, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}} )
                      )
                    )
                    , React.createElement(TooltipContent, { side: "right", __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                      , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, "Login")
                    )
                  )
                )
              ) : (
                React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
                  , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                    , React.createElement(Button, {
                      variant: "outline",
                      className: "w-full justify-start border-purple-600/50 text-purple-300 hover:text-white hover:bg-purple-900/30"     ,
                      onClick: onLoginClick, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}

                      , React.createElement(LogIn, { size: 16, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}} ), "Login"

                    )
                  )
                  , React.createElement('div', { className: "text-xs text-purple-300 text-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
                    , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}, "© 2025 ClauseBuddy"  )
                    , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}, "Legal AI Assistant"  )
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