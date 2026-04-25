import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Play, Volume2, Check, X, RefreshCw, 
  Award, ChevronRight, Info, Lightbulb
} from 'lucide-react';
import { useApp } from '../contexts';

const emotions = [
  { 
    id: 'happy', 
    name: 'Happy', 
    emoji: '😊', 
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-100',
    description: 'Feeling good, joyful, or pleased',
    bodyClues: ['Smiling', 'Eyes crinkled', 'Relaxed body'],
    situations: ['Getting a gift', 'Playing with friends', 'Eating favorite food'],
    sound: '🎵 Upbeat, cheerful'
  },
  { 
    id: 'sad', 
    name: 'Sad', 
    emoji: '😢', 
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-100',
    description: 'Feeling down, unhappy, or upset',
    bodyClues: ['Frowning', 'Tears', 'Slumped shoulders'],
    situations: ['Losing something', 'Missing someone', 'Being left out'],
    sound: '🎵 Slow, quiet'
  },
  { 
    id: 'angry', 
    name: 'Angry', 
    emoji: '😠', 
    color: 'from-red-400 to-rose-500',
    bgColor: 'bg-red-100',
    description: 'Feeling mad, frustrated, or upset',
    bodyClues: ['Clenched fists', 'Red face', 'Tight jaw'],
    situations: ['Someone took your toy', 'Things seem unfair', 'Plans changed suddenly'],
    sound: '🎵 Loud, fast'
  },
  { 
    id: 'scared', 
    name: 'Scared', 
    emoji: '😨', 
    color: 'from-purple-400 to-violet-500',
    bgColor: 'bg-purple-100',
    description: 'Feeling afraid or worried',
    bodyClues: ['Wide eyes', 'Shaking', 'Tense body'],
    situations: ['Dark room', 'Loud noises', 'New situations'],
    sound: '🎵 Quick, high'
  },
  { 
    id: 'surprised', 
    name: 'Surprised', 
    emoji: '😲', 
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-100',
    description: 'Feeling amazed or caught off guard',
    bodyClues: ['Raised eyebrows', 'Open mouth', 'Wide eyes'],
    situations: ['Unexpected gift', 'Loud sudden sound', 'Seeing something new'],
    sound: '🎵 Sudden, sharp'
  },
  { 
    id: 'calm', 
    name: 'Calm', 
    emoji: '😌', 
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-100',
    description: 'Feeling peaceful and relaxed',
    bodyClues: ['Relaxed face', 'Slow breathing', 'Loose body'],
    situations: ['Reading a book', 'Lying in bed', 'After deep breaths'],
    sound: '🎵 Slow, soft'
  },
  { 
    id: 'confused', 
    name: 'Confused', 
    emoji: '😕', 
    color: 'from-gray-400 to-slate-500',
    bgColor: 'bg-gray-100',
    description: 'Feeling uncertain or not understanding',
    bodyClues: ['Tilted head', 'Furrowed brow', 'Looking around'],
    situations: ['Hard question', 'New game rules', 'Too many instructions'],
    sound: '🎵 Uncertain, wavy'
  },
  { 
    id: 'excited', 
    name: 'Excited', 
    emoji: '🤩', 
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-100',
    description: 'Feeling very happy and energetic',
    bodyClues: ['Jumping', 'Big smile', 'Fast talking'],
    situations: ['Birthday party', 'Going on vacation', 'Favorite activity'],
    sound: '🎵 Fast, high energy'
  },
];

const quizQuestions = [
  {
    id: 1,
    image: '👦',
    scenario: 'Jake just got a surprise birthday party!',
    correctEmotion: 'surprised',
    hint: 'Something unexpected happened that made Jake happy!'
  },
  {
    id: 2,
    image: '👧',
    scenario: 'Maya\'s pet hamster passed away.',
    correctEmotion: 'sad',
    hint: 'Maya lost something she loved very much.'
  },
  {
    id: 3,
    image: '👦',
    scenario: 'Tom is going to a new school tomorrow.',
    correctEmotion: 'scared',
    hint: 'New situations can be scary.'
  },
  {
    id: 4,
    image: '👧',
    scenario: 'Emma just won first place in the art contest!',
    correctEmotion: 'happy',
    hint: 'Emma achieved something great!'
  },
  {
    id: 5,
    image: '👦',
    scenario: 'Someone broke Alex\'s favorite toy on purpose.',
    correctEmotion: 'angry',
    hint: 'Something unfair happened to Alex.'
  },
];

export default function EmotionRecognition() {
  const { darkMode, addStars, addEmotion, soundEnabled } = useApp();
  const [mode, setMode] = useState('learn'); // learn, quiz, reflect
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [todayEmotion, setTodayEmotion] = useState(null);

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    speak(`${emotion.name}. ${emotion.description}`);
  };

  const handleQuizAnswer = (emotionId) => {
    setQuizAnswer(emotionId);
    const isCorrect = emotionId === quizQuestions[quizIndex].correctEmotion;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      addStars(10);
      speak('Great job! That\'s correct!');
    } else {
      speak(`Not quite. The answer was ${emotions.find(e => e.id === quizQuestions[quizIndex].correctEmotion)?.name}`);
    }

    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(prev => prev + 1);
        setQuizAnswer(null);
        setShowHint(false);
      }
    }, 2000);
  };

  const handleTodayEmotion = (emotion) => {
    setTodayEmotion(emotion);
    addEmotion({ emotion: emotion.id, name: emotion.name });
    addStars(5);
    speak(`You're feeling ${emotion.name} today. Thank you for sharing!`);
  };

  const renderLearnMode = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {emotions.map((emotion, index) => (
          <motion.button
            key={emotion.id}
            onClick={() => handleEmotionSelect(emotion)}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${emotion.color} text-white shadow-lg overflow-hidden`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-5xl mb-2 block">{emotion.emoji}</span>
            <p className="font-bold text-lg">{emotion.name}</p>
            {selectedEmotion?.id === emotion.id && (
              <motion.div 
                className="absolute inset-0 border-4 border-white rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Emotion Details Card */}
      <AnimatePresence>
        {selectedEmotion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
          >
            <div className="flex items-start gap-6">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${selectedEmotion.color} flex items-center justify-center`}>
                <span className="text-5xl">{selectedEmotion.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedEmotion.name}
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedEmotion.description}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Body Clues */}
                  <div className={`p-4 rounded-xl ${selectedEmotion.bgColor}`}>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Body Clues
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedEmotion.bodyClues.map((clue, i) => (
                        <li key={i}>• {clue}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Situations */}
                  <div className={`p-4 rounded-xl ${selectedEmotion.bgColor}`}>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" /> When I might feel this
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedEmotion.situations.map((situation, i) => (
                        <li key={i}>• {situation}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Sound */}
                  <div className={`p-4 rounded-xl ${selectedEmotion.bgColor}`}>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" /> Voice Sound
                    </h4>
                    <p className="text-sm text-gray-700">{selectedEmotion.sound}</p>
                    <button 
                      onClick={() => speak(selectedEmotion.description)}
                      className="mt-2 px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      🔊 Hear it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderQuizMode = () => {
    const currentQuestion = quizQuestions[quizIndex];
    
    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {quizIndex + 1} of {quizQuestions.length}
          </span>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Score: {score}
            </span>
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}
        >
          <span className="text-8xl mb-4 block">{currentQuestion.image}</span>
          <p className={`text-xl mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {currentQuestion.scenario}
          </p>
          <p className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            How is this person feeling?
          </p>

          {showHint && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-xl"
            >
              💡 Hint: {currentQuestion.hint}
            </motion.div>
          )}

          {!showHint && !quizAnswer && (
            <button 
              onClick={() => setShowHint(true)}
              className="mb-4 text-blue-500 hover:text-blue-600 font-medium"
            >
              Need a hint?
            </button>
          )}
        </motion.div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emotions.map((emotion) => {
            const isSelected = quizAnswer === emotion.id;
            const isCorrect = emotion.id === currentQuestion.correctEmotion;
            const showResult = quizAnswer !== null;

            return (
              <motion.button
                key={emotion.id}
                onClick={() => !quizAnswer && handleQuizAnswer(emotion.id)}
                disabled={quizAnswer !== null}
                className={`p-4 rounded-2xl transition-all ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : isSelected
                        ? 'bg-red-500 text-white'
                        : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'
                    : `bg-gradient-to-br ${emotion.color} text-white hover:scale-105`
                }`}
                whileHover={!quizAnswer ? { scale: 1.05 } : {}}
                whileTap={!quizAnswer ? { scale: 0.95 } : {}}
              >
                <span className="text-3xl block mb-1">{emotion.emoji}</span>
                <span className="font-medium text-sm">{emotion.name}</span>
                {showResult && isCorrect && <Check className="w-5 h-5 mx-auto mt-1" />}
                {showResult && isSelected && !isCorrect && <X className="w-5 h-5 mx-auto mt-1" />}
              </motion.button>
            );
          })}
        </div>

        {quizIndex === quizQuestions.length - 1 && quizAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <h3 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h3>
              <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You scored {score} out of {quizQuestions.length}!
              </p>
              <p className="text-4xl mb-6">
                {score === quizQuestions.length ? '🌟🏆🌟' : score >= 3 ? '⭐⭐' : '⭐'}
              </p>
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setScore(0);
                  setQuizAnswer(null);
                  setShowHint(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" /> Try Again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const renderReflectMode = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}
      >
        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          How are you feeling right now?
        </h3>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Tap the emotion that best describes how you feel
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emotions.map((emotion, index) => (
            <motion.button
              key={emotion.id}
              onClick={() => handleTodayEmotion(emotion)}
              className={`p-6 rounded-2xl transition-all ${
                todayEmotion?.id === emotion.id
                  ? `bg-gradient-to-br ${emotion.color} text-white ring-4 ring-offset-2 ring-blue-400`
                  : `bg-gradient-to-br ${emotion.color} text-white`
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl block mb-2">{emotion.emoji}</span>
              <span className="font-medium">{emotion.name}</span>
            </motion.button>
          ))}
        </div>

        {todayEmotion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-2xl ${todayEmotion.bgColor}`}
          >
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              You're feeling {todayEmotion.name} {todayEmotion.emoji}
            </h4>
            <p className="text-gray-700 mb-4">{todayEmotion.description}</p>
            <p className="text-gray-600">
              It's okay to feel {todayEmotion.name.toLowerCase()}. Everyone feels this way sometimes!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          💖 Emotion Recognition
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Learn to understand and identify emotions
        </p>
      </motion.div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-3">
        {[
          { id: 'learn', label: 'Learn', icon: '📚' },
          { id: 'quiz', label: 'Quiz', icon: '🎯' },
          { id: 'reflect', label: 'How I Feel', icon: '💭' },
        ].map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              mode === m.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{m.icon}</span>
            {m.label}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {mode === 'learn' && renderLearnMode()}
        {mode === 'quiz' && renderQuizMode()}
        {mode === 'reflect' && renderReflectMode()}
      </AnimatePresence>
    </div>
  );
}