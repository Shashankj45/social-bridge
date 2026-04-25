import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Volume2, Trash2, Plus, Grid, 
  List, Send, Mic, Heart
} from 'lucide-react';
import { useApp } from '../contexts';

const categories = [
  {
    id: 'feelings',
    name: 'Feelings',
    icon: '❤️',
    color: 'from-pink-400 to-rose-500',
    symbols: [
      { id: 'f1', image: '😊', label: 'Happy' },
      { id: 'f2', image: '😢', label: 'Sad' },
      { id: 'f3', image: '😠', label: 'Angry' },
      { id: 'f4', image: '😨', label: 'Scared' },
      { id: 'f5', image: '😴', label: 'Tired' },
      { id: 'f6', image: '🤢', label: 'Sick' },
      { id: 'f7', image: '😕', label: 'Confused' },
      { id: 'f8', image: '🤩', label: 'Excited' },
    ]
  },
  {
    id: 'needs',
    name: 'I Need',
    icon: '🙋',
    color: 'from-blue-400 to-cyan-500',
    symbols: [
      { id: 'n1', image: '🍽️', label: 'Food' },
      { id: 'n2', image: '💧', label: 'Water' },
      { id: 'n3', image: '🚽', label: 'Bathroom' },
      { id: 'n4', image: '🤗', label: 'Hug' },
      { id: 'n5', image: '🛏️', label: 'Rest' },
      { id: 'n6', image: '🆘', label: 'Help' },
      { id: 'n7', image: '⏰', label: 'Break' },
      { id: 'n8', image: '🤫', label: 'Quiet' },
    ]
  },
  {
    id: 'actions',
    name: 'I Want To',
    icon: '🎯',
    color: 'from-green-400 to-emerald-500',
    symbols: [
      { id: 'a1', image: '🎮', label: 'Play' },
      { id: 'a2', image: '📺', label: 'Watch' },
      { id: 'a3', image: '📚', label: 'Read' },
      { id: 'a4', image: '🎨', label: 'Draw' },
      { id: 'a5', image: '🏃', label: 'Run' },
      { id: 'a6', image: '🎵', label: 'Listen' },
      { id: 'a7', image: '🗣️', label: 'Talk' },
      { id: 'a8', image: '🧩', label: 'Puzzle' },
    ]
  },
  {
    id: 'responses',
    name: 'Responses',
    icon: '💬',
    color: 'from-purple-400 to-violet-500',
    symbols: [
      { id: 'r1', image: '✅', label: 'Yes' },
      { id: 'r2', image: '❌', label: 'No' },
      { id: 'r3', image: '🙏', label: 'Please' },
      { id: 'r4', image: '🙌', label: 'Thank You' },
      { id: 'r5', image: '👋', label: 'Hello' },
      { id: 'r6', image: '🔁', label: 'Again' },
      { id: 'r7', image: '⏹️', label: 'Stop' },
      { id: 'r8', image: '🤔', label: 'Maybe' },
    ]
  },
  {
    id: 'people',
    name: 'People',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-orange-400 to-amber-500',
    symbols: [
      { id: 'p1', image: '👩', label: 'Mom' },
      { id: 'p2', image: '👨', label: 'Dad' },
      { id: 'p3', image: '👧', label: 'Sister' },
      { id: 'p4', image: '👦', label: 'Brother' },
      { id: 'p5', image: '👵', label: 'Grandma' },
      { id: 'p6', image: '👴', label: 'Grandpa' },
      { id: 'p7', image: '👩‍🏫', label: 'Teacher' },
      { id: 'p8', image: '🧑‍🤝‍🧑', label: 'Friend' },
    ]
  },
  {
    id: 'places',
    name: 'Places',
    icon: '📍',
    color: 'from-teal-400 to-cyan-500',
    symbols: [
      { id: 'pl1', image: '🏠', label: 'Home' },
      { id: 'pl2', image: '🏫', label: 'School' },
      { id: 'pl3', image: '🏪', label: 'Store' },
      { id: 'pl4', image: '🏥', label: 'Doctor' },
      { id: 'pl5', image: '🌳', label: 'Park' },
      { id: 'pl6', image: '🚗', label: 'Car' },
      { id: 'pl7', image: '🍽️', label: 'Restaurant' },
      { id: 'pl8', image: '📚', label: 'Library' },
    ]
  },
];

export default function CommunicationBoard() {
  const { darkMode, soundEnabled } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [sentence, setSentence] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSymbolClick = (symbol) => {
    speak(symbol.label);
    setSentence(prev => [...prev, symbol]);
  };

  const handleSpeakSentence = () => {
    if (sentence.length > 0) {
      const text = sentence.map(s => s.label).join(' ');
      speak(text);
    }
  };

  const handleClearSentence = () => {
    setSentence([]);
  };

  const handleRemoveSymbol = (index) => {
    setSentence(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          ✨ Communication Board
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Tap symbols to communicate
        </p>
      </motion.div>

      {/* Sentence Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            My Message
          </h3>
          <div className="flex gap-2">
            <motion.button
              onClick={handleClearSentence}
              disabled={sentence.length === 0}
              className={`p-2 rounded-lg ${
                sentence.length === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              whileHover={sentence.length > 0 ? { scale: 1.1 } : {}}
              whileTap={sentence.length > 0 ? { scale: 0.9 } : {}}
            >
              <Trash2 className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </motion.button>
            <motion.button
              onClick={handleSpeakSentence}
              disabled={sentence.length === 0}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                sentence.length === 0
                  ? 'opacity-50 cursor-not-allowed bg-gray-300'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              }`}
              whileHover={sentence.length > 0 ? { scale: 1.05 } : {}}
              whileTap={sentence.length > 0 ? { scale: 0.95 } : {}}
            >
              <Volume2 className="w-5 h-5" />
              Speak
            </motion.button>
          </div>
        </div>

        <div className={`min-h-[80px] rounded-2xl p-4 border-2 border-dashed ${
          darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
        } flex flex-wrap gap-2 items-center`}>
          {sentence.length === 0 ? (
            <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic`}>
              Tap symbols below to build your message...
            </p>
          ) : (
            sentence.map((symbol, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                } shadow cursor-pointer group`}
                onClick={() => handleRemoveSymbol(index)}
              >
                <span className="text-2xl">{symbol.image}</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {symbol.label}
                </span>
                <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory.id === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Symbol Grid */}
      <motion.div
        key={selectedCategory.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {selectedCategory.symbols.map((symbol, index) => (
          <motion.button
            key={symbol.id}
            onClick={() => handleSymbolClick(symbol)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`aspect-square rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-shadow`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-5xl">{symbol.image}</span>
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {symbol.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Quick Messages
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { text: 'I need help', icon: '🆘' },
            { text: 'I feel happy', icon: '😊' },
            { text: 'I want water', icon: '💧' },
            { text: 'Yes please', icon: '✅' },
            { text: 'No thank you', icon: '❌' },
            { text: 'I need a break', icon: '⏰' },
          ].map((quick, index) => (
            <motion.button
              key={index}
              onClick={() => speak(quick.text)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{quick.icon}</span>
              <span className="font-medium">{quick.text}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}