const _jsxFileName = "Frontend/src/components/Settings.tsx";import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User,
 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  LogOut, 
  Camera,
  Save,
  AlertTriangle
} from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: ''
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    emailAlerts: false,
    riskAlerts: true,
    autoAnalysis: true
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to backend
    setHasUnsavedChanges(false);
    console.log('Settings saved:', { profile, preferences });
  };

  const handleLogout = () => {
    // In a real app, this would handle logout
    console.log('Logging out...');
  };

  return (
    React.createElement('div', { className: "space-y-6 max-w-4xl mx-auto"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
      /* Header */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
        , React.createElement('h1', { className: "text-3xl font-bold text-white mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, "Settings")
        , React.createElement('p', { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Manage your account preferences and application settings"

        )
      )

      /* Unsaved Changes Alert */
      , hasUnsavedChanges && (
        React.createElement(Card, { className: "bg-yellow-900/20 border-yellow-600/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
          , React.createElement(CardContent, { className: "p-4 flex items-center justify-between"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
            , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
              , React.createElement(AlertTriangle, { className: "h-5 w-5 text-yellow-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}} )
              , React.createElement('p', { className: "text-yellow-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}, "You have unsaved changes"   )
            )
            , React.createElement(Button, { 
              onClick: handleSaveChanges,
              className: "bg-yellow-600 hover:bg-yellow-700 text-black"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}

              , React.createElement(Save, { size: 16, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} ), "Save Changes"

            )
          )
        )
      )

      /* Profile Section */
      , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
        , React.createElement(CardHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
          , React.createElement(CardTitle, { className: "text-white flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
            , React.createElement(User, { className: "mr-2 h-5 w-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}} ), "Profile Information"

          )
          , React.createElement(CardDescription, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}, "Update your personal information and profile picture"

          )
        )
        , React.createElement(CardContent, { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
          /* Avatar Section */
          , React.createElement('div', { className: "flex items-center space-x-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
            , React.createElement(Avatar, { className: "h-20 w-20" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
              , React.createElement(AvatarImage, { src: profile.avatar, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}} )
              , React.createElement(AvatarFallback, { className: "bg-purple-600 text-white text-lg"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
                , profile.name.split(' ').map(n => n[0]).join('')
              )
            )
            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
              , React.createElement(Button, { variant: "outline", className: "border-purple-600 text-purple-400 hover:bg-purple-900/30"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
                , React.createElement(Camera, { size: 16, className: "mr-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} ), "Change Photo"

              )
              , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "JPG, PNG or GIF. Max size 2MB."

              )
            )
          )

          /* Profile Fields */
          , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
              , React.createElement(Label, { htmlFor: "name", className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Full Name" )
              , React.createElement(Input, {
                id: "name",
                value: profile.name,
                onChange: (e) => handleProfileChange('name', e.target.value),
                className: "bg-gray-800/50 border-purple-900/30 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
              )
            )
            , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
              , React.createElement(Label, { htmlFor: "email", className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "Email Address" )
              , React.createElement(Input, {
                id: "email",
                type: "email",
                value: profile.email,
                onChange: (e) => handleProfileChange('email', e.target.value),
                className: "bg-gray-800/50 border-purple-900/30 text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
              )
            )
          )
        )
      )

      /* Preferences Section */
      , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
        , React.createElement(CardHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
          , React.createElement(CardTitle, { className: "text-white flex items-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
            , React.createElement(Shield, { className: "mr-2 h-5 w-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}} ), "Preferences"

          )
          , React.createElement(CardDescription, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}, "Customize your ClauseBuddy experience"

          )
        )
        , React.createElement(CardContent, { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
          /* Theme Settings */
          , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
            , React.createElement('h3', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, "Appearance")
            , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
              , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
                , preferences.darkMode ? (
                  React.createElement(Moon, { className: "h-5 w-5 text-purple-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}} )
                ) : (
                  React.createElement(Sun, { className: "h-5 w-5 text-yellow-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}} )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                  , React.createElement(Label, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}, "Dark Mode" )
                  , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}, "Use dark theme throughout the app"     )
                )
              )
              , React.createElement(Switch, {
                checked: preferences.darkMode,
                onCheckedChange: (checked) => handlePreferenceChange('darkMode', checked), __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
              )
            )
          )

          , React.createElement(Separator, { className: "bg-purple-900/30", __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}} )

          /* Notification Settings */
          , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
            , React.createElement('h3', { className: "text-white font-medium flex items-center"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}
              , React.createElement(Bell, { className: "mr-2 h-4 w-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}} ), "Notifications"

            )

            , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
                  , React.createElement(Label, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}, "Push Notifications" )
                  , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}, "Receive notifications in the app"    )
                )
                , React.createElement(Switch, {
                  checked: preferences.notifications,
                  onCheckedChange: (checked) => handlePreferenceChange('notifications', checked), __self: this, __source: {fileName: _jsxFileName, lineNumber: 194}}
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
                  , React.createElement(Label, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}, "Email Alerts" )
                  , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}, "Get updates via email"   )
                )
                , React.createElement(Switch, {
                  checked: preferences.emailAlerts,
                  onCheckedChange: (checked) => handlePreferenceChange('emailAlerts', checked), __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}
                  , React.createElement(Label, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}, "Risk Alerts" )
                  , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}, "Notify when high risks are detected"     )
                )
                , React.createElement(Switch, {
                  checked: preferences.riskAlerts,
                  onCheckedChange: (checked) => handlePreferenceChange('riskAlerts', checked), __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
                )
              )
            )
          )

          , React.createElement(Separator, { className: "bg-purple-900/30", __self: this, __source: {fileName: _jsxFileName, lineNumber: 224}} )

          /* Analysis Settings */
          , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
            , React.createElement('h3', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "Document Analysis" )

            , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
                , React.createElement(Label, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}, "Auto Analysis" )
                , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}, "Automatically analyze uploaded documents"   )
              )
              , React.createElement(Switch, {
                checked: preferences.autoAnalysis,
                onCheckedChange: (checked) => handlePreferenceChange('autoAnalysis', checked), __self: this, __source: {fileName: _jsxFileName, lineNumber: 235}}
              )
            )
          )
        )
      )

      /* Account Actions */
      , React.createElement(Card, { className: "bg-gray-900/50 border-purple-900/30 backdrop-blur-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
        , React.createElement(CardHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
          , React.createElement(CardTitle, { className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}, "Account Actions" )
          , React.createElement(CardDescription, { className: "text-purple-200", __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}, "Manage your account and session"

          )
        )
        , React.createElement(CardContent, { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}
          , React.createElement('div', { className: "flex items-center justify-between p-4 rounded-lg bg-gray-800/30"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
            , React.createElement('div', { className: "flex items-center space-x-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 254}}
              , React.createElement(LogOut, { className: "h-5 w-5 text-red-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}} )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 256}}
                , React.createElement('p', { className: "text-white font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}, "Sign Out" )
                , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}, "Sign out of your ClauseBuddy account"     )
              )
            )
            , React.createElement(Button, { 
              variant: "destructive",
              onClick: handleLogout,
              className: "bg-red-600 hover:bg-red-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
, "Sign Out"

            )
          )

          , React.createElement('div', { className: "text-center pt-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 270}}
            , React.createElement('p', { className: "text-sm text-purple-300" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}, "Account created: August 15, 2025"

            )
            , React.createElement('p', { className: "text-xs text-purple-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 274}}, "ClauseBuddy v1.0.0 • Last updated: September 4, 2025"

            )
          )
        )
      )
    )
  );
}