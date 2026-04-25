import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ChevronLeft, ChevronRight, Volume2, 
  Heart, Star, Play, Pause
} from 'lucide-react';
import { useApp } from '../contexts';

const socialStories = [
  {
    id: 1,
    title: 'Going to the Grocery Store',
    category: 'Daily Life',
    icon: '🛒',
    color: 'from-green-400 to-emerald-500',
    pages: [
      {
        image: '🏠',
        text: 'Today, I am going to the grocery store with my family.',
        tip: 'Going to the store is a normal activity. Many people go every week!'
      },
      {
        image: '🚗',
        text: 'We drive to the store in our car. I can look out the window on the way.',
        tip: 'The car ride helps us get there safely and quickly.'
      },
      {
        image: '🛒',
        text: 'When we arrive, we get a shopping cart. Sometimes I can help push it!',
        tip: 'Pushing the cart is helpful and gives us something to do.'
      },
      {
        image: '🍎',
        text: 'The store has many things: fruits, vegetables, bread, and more. There might be many people and sounds.',
        tip: 'If it feels overwhelming, it\'s okay to take deep breaths.'
      },
      {
        image: '📝',
        text: 'We use a list to remember what we need. I can help find items on the list.',
        tip: 'Looking for items is like a treasure hunt!'
      },
      {
        image: '💳',
        text: 'When we\'re done shopping, we wait in line to pay. Waiting is part of going to the store.',
        tip: 'While waiting, you can count items in the cart or look around.'
      },
      {
        image: '😊',
        text: 'After we pay, we go home! I did a great job at the grocery store today.',
        tip: 'Every time gets easier! You did something brave.'
      }
    ]
  },
  {
    id: 2,
    title: 'Visiting the Doctor',
    category: 'Health',
    icon: '👨‍⚕️',
    color: 'from-blue-400 to-cyan-500',
    pages: [
      {
        image: '📅',
        text: 'Today I have an appointment to see the doctor. This helps keep me healthy.',
        tip: 'Doctors help people stay healthy and feel better.'
      },
      {
        image: '🏥',
        text: 'We arrive at the doctor\'s office. The waiting room might have other people and toys.',
        tip: 'It\'s okay to bring something comforting, like a toy or book.'
      },
      {
        image: '👋',
        text: 'A nurse calls my name. I follow them to a room. They might check my height and weight.',
        tip: 'The nurse is there to help. You can say hi if you want.'
      },
      {
        image: '🩺',
        text: 'The doctor comes in and says hello. They might use special tools to check my eyes, ears, and heart.',
        tip: 'These tools don\'t hurt - they help the doctor see how healthy you are.'
      },
      {
        image: '💉',
        text: 'Sometimes the doctor gives a shot. It pinches for just a second, then it\'s done!',
        tip: 'Shots help protect your body. Taking deep breaths can help.'
      },
      {
        image: '🌟',
        text: 'When we\'re all done, I might get a sticker! The doctor visit is finished.',
        tip: 'You were brave! Doctor visits help keep you healthy.'
      }
    ]
  },
  {
    id: 3,
    title: 'Making a New Friend',
    category: 'Social',
    icon: '👋',
    color: 'from-pink-400 to-rose-500',
    pages: [
      {
        image: '👀',
        text: 'I see someone new at school or in my neighborhood. They might want to be friends!',
        tip: 'Making new friends can feel scary, but it\'s exciting too.'
      },
      {
        image: '😊',
        text: 'I can walk up to them and say "Hi, my name is [your name]. What\'s your name?"',
        tip: 'Introducing yourself is a great first step!'
      },
      {
        image: '❓',
        text: 'I can ask them questions like "What do you like to play?" or "What\'s your favorite color?"',
        tip: 'Asking questions shows you\'re interested in them.'
      },
      {
        image: '🎮',
        text: 'If they want to play, we can do something fun together. We might play a game or draw.',
        tip: 'Playing together helps you get to know each other.'
      },
      {
        image: '👂',
        text: 'Good friends listen to each other. When they talk, I look at them and pay attention.',
        tip: 'Listening is just as important as talking.'
      },
      {
        image: '🤝',
        text: 'Making a new friend takes time. We might play together many times before we become good friends.',
        tip: 'Friendships grow slowly, and that\'s okay!'
      }
    ]
  },
  {
    id: 4,
    title: 'When Plans Change',
    category: 'Coping',
    icon: '🔄',
    color: 'from-purple-400 to-violet-500',
    pages: [
      {
        image: '📋',
        text: 'Sometimes I make plans for what I want to do. Plans help me know what to expect.',
        tip: 'It\'s good to have plans! They help us feel organized.'
      },
      {
        image: '😟',
        text: 'But sometimes, plans change. This can feel frustrating or confusing.',
        tip: 'It\'s normal to feel upset when things don\'t go as planned.'
      },
      {
        image: '🌧️',
        text: 'Maybe it rained and we couldn\'t go to the park. Or maybe someone got sick.',
        tip: 'Things happen that we can\'t control, and that\'s okay.'
      },
      {
        image: '🧘',
        text: 'When plans change, I can take deep breaths. Breathe in... breathe out...',
        tip: 'Deep breathing helps our body calm down.'
      },
      {
        image: '💭',
        text: 'I can think about what we could do instead. There might be something else fun!',
        tip: 'Being flexible means finding new solutions.'
      },
      {
        image: '💪',
        text: 'I can handle it when plans change. I am flexible and strong!',
        tip: 'Every time you handle change, you get better at it!'
      }
    ]
  }
];

export default function SocialStories() {
  const { darkMode, addStars, soundEnabled } = useApp();
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
  };

  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    if (currentPage < selectedStory.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      addStars(10);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleClose = () => {
    stopReading();
    setSelectedStory(null);
    setCurrentPage(0);
  };

  const renderStoryList = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {socialStories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl card-hover cursor-pointer`}
          onClick={() => handleStorySelect(story)}
        >
          <div className={`h-40 bg-gradient-to-br ${story.color} flex items-center justify-center relative`}>
            <span className="text-7xl">{story.icon}</span>
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {story.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {story.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {story.pages.length} pages
              </span>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-4 h-4" /> Read Story
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderStoryReader = () => {
    const page = selectedStory.pages[currentPage];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={handleClose}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              ← Back to stories
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: selectedStory.pages.length }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage 
                      ? 'w-6 bg-blue-500' 
                      : i < currentPage 
                        ? 'bg-green-500' 
                        : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Story Card */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
        >
          {/* Story Image */}
          <div className={`h-64 bg-gradient-to-br ${selectedStory.color} flex items-center justify-center`}>
            <motion.span 
              className="text-9xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {page.image}
            </motion.span>
          </div>

          {/* Story Text */}
          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <p className={`text-2xl leading-relaxed ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {page.text}
              </p>
              <motion.button
                onClick={() => isReading ? stopReading() : speak(page.text)}
                className={`flex-shrink-0 p-4 rounded-xl ${
                  isReading 
                    ? 'bg-red-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isReading ? <Pause className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </motion.button>
            </div>

            {/* Tip Box */}
            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    Helpful Tip
                  </h4>
                  <p className={`${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                    {page.tip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
              currentPage === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            whileHover={currentPage !== 0 ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </motion.button>

          <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Page {currentPage + 1} of {selectedStory.pages.length}
          </span>

          <motion.button
            onClick={handleNextPage}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
              currentPage === selectedStory.pages.length - 1
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentPage === selectedStory.pages.length - 1 ? (
              <>Complete <Star className="w-5 h-5" /></>
            ) : (
              <>Next <ChevronRight className="w-5 h-5" /></>
            )}
          </motion.button>
        </div>
      </motion.div>
    );
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
          📖 Social Stories
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Learn about everyday situations through stories
        </p>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedStory ? renderStoryReader() : renderStoryList()}
      </AnimatePresence>
    </div>
  );
}