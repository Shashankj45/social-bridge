import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, MessageCircle, Heart, Calendar, BookOpen, 
  Users, Settings, Volume2, VolumeX, Sun, Moon,
  Sparkles, Star, Trophy, Camera
} from 'lucide-react';

// Import all components
import Dashboard from './components/Dashboard';
import EmotionRecognition from './components/EmotionRecognition';
import SocialScenarios from './components/SocialScenarios';
import ConversationBuilder from './components/ConversationBuilder';
import VisualSchedule from './components/VisualSchedule';
import SocialStories from './components/SocialStories';
import CommunicationBoard from './components/CommunicationBoard';
import ProgressTracker from './components/ProgressTracker';
import SettingsPanel from './components/SettingsPanel';
import ImageGenerator from './components/ImageGenerator';
import { AppProvider, useApp } from './contexts';

// Navigation items
const navItems = [
  { id: 'home', icon: Home, label: 'Home', color: 'from-blue-400 to-cyan-400' },
  { id: 'emotions', icon: Heart, label: 'Emotions', color: 'from-pink-400 to-rose-400' },
  { id: 'scenarios', icon: Users, label: 'Social', color: 'from-purple-400 to-indigo-400' },
  { id: 'conversation', icon: MessageCircle, label: 'Talk', color: 'from-green-400 to-emerald-400' },
  { id: 'schedule', icon: Calendar, label: 'Schedule', color: 'from-orange-400 to-amber-400' },
  { id: 'stories', icon: BookOpen, label: 'Stories', color: 'from-teal-400 to-cyan-400' },
  { id: 'communication', icon: Sparkles, label: 'AAC', color: 'from-violet-400 to-purple-400' },
  { id: 'images', icon: Camera, label: 'Create', color: 'from-rose-400 to-pink-400' },
  { id: 'progress', icon: Trophy, label: 'Progress', color: 'from-yellow-400 to-orange-400' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'from-gray-400 to-slate-400' },
];

function AppContent() {
  const { 
    currentPage, setCurrentPage, 
    soundEnabled, setSoundEnabled,
    darkMode, setDarkMode,
    userName,stars//
  } = useApp();

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Dashboard />;
      case 'emotions': return <EmotionRecognition />;
      case 'scenarios': return <SocialScenarios />;
      case 'conversation': return <ConversationBuilder />;
      case 'schedule': return <VisualSchedule />;
      case 'stories': return <SocialStories />;
      case 'communication': return <CommunicationBoard />;
      case 'images': return <ImageGenerator />;
      case 'progress': return <ProgressTracker />;
      case 'settings': return <SettingsPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                SocialBridge
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Hi, {userName}! 👋
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
              aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundEnabled ? (
                <Volume2 className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              ) : (
                <VolumeX className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>

            <motion.div 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-5 h-5 text-white" />
              <span className="font-bold text-white">{stars}</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-28 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md shadow-2xl border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-2 py-2">
          <div className="flex justify-around items-center overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[60px] transition-all ${
                  currentPage === item.id 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}