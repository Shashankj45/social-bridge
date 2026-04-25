import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Play, Volume2, RotateCcw, 
  ChevronRight, Mic, User, Bot, Sparkles
} from 'lucide-react';
import { useApp } from '../contexts';

const conversationTemplates = [
  {
    id: 1,
    title: 'Greeting Someone',
    icon: '👋',
    color: 'from-green-400 to-emerald-500',
    difficulty: 'Easy',
    steps: [
      { role: 'you', prompt: 'greeting', options: ['Hi!', 'Hello!', 'Hey there!', 'Good morning!'] },
      { role: 'other', response: 'Hi! How are you?' },
      { role: 'you', prompt: 'response', options: ['I\'m good, thanks!', 'I\'m doing well!', 'Great! How about you?', 'Fine, thank you!'] },
      { role: 'other', response: 'I\'m doing great! Nice to see you!' },
      { role: 'you', prompt: 'closing', options: ['Nice to see you too!', 'Have a good day!', 'See you later!', 'Bye!'] },
    ]
  },
  {
    id: 2,
    title: 'Asking for Help',
    icon: '🙋',
    color: 'from-blue-400 to-cyan-500',
    difficulty: 'Easy',
    steps: [
      { role: 'you', prompt: 'attention', options: ['Excuse me...', 'Pardon me...', 'Sorry to bother you...', 'Hi, can I ask something?'] },
      { role: 'other', response: 'Of course! What do you need?' },
      { role: 'you', prompt: 'request', options: ['Could you help me with this?', 'I need help finding something.', 'Can you show me how to do this?', 'I\'m not sure what to do.'] },
      { role: 'other', response: 'Sure, I\'d be happy to help! What specifically do you need?' },
      { role: 'you', prompt: 'explain', options: ['I can\'t find my book.', 'I don\'t understand this problem.', 'I\'m lost.', 'I need directions.'] },
      { role: 'other', response: 'No problem! Let me help you with that.' },
      { role: 'you', prompt: 'thanks', options: ['Thank you so much!', 'Thanks! I appreciate it!', 'That\'s really kind of you!', 'Thanks for your help!'] },
    ]
  },
  {
    id: 3,
    title: 'Making Plans',
    icon: '📅',
    color: 'from-purple-400 to-violet-500',
    difficulty: 'Medium',
    steps: [
      { role: 'you', prompt: 'invite', options: ['Want to hang out?', 'Are you free this weekend?', 'Would you like to play together?', 'Do you want to do something fun?'] },
      { role: 'other', response: 'That sounds fun! What did you have in mind?' },
      { role: 'you', prompt: 'suggest', options: ['We could go to the park.', 'Maybe we could watch a movie?', 'How about playing video games?', 'We could draw together!'] },
      { role: 'other', response: 'I love that idea! When should we meet?' },
      { role: 'you', prompt: 'time', options: ['How about Saturday at 2?', 'Is tomorrow afternoon good?', 'When works for you?', 'How about after lunch?'] },
      { role: 'other', response: 'Saturday at 2 works perfectly!' },
      { role: 'you', prompt: 'confirm', options: ['Great! See you then!', 'Awesome! I can\'t wait!', 'Perfect! It\'s a plan!', 'Cool! I\'ll text you the details!'] },
    ]
  },
  {
    id: 4,
    title: 'Apologizing',
    icon: '🙏',
    color: 'from-rose-400 to-pink-500',
    difficulty: 'Medium',
    steps: [
      { role: 'you', prompt: 'attention', options: ['Hey, can I talk to you?', 'I need to say something.', 'Do you have a minute?', 'I want to apologize.'] },
      { role: 'other', response: 'Sure, what\'s up?' },
      { role: 'you', prompt: 'apologize', options: ['I\'m sorry for what happened.', 'I feel bad about earlier.', 'I want to apologize for my behavior.', 'I\'m sorry if I hurt your feelings.'] },
      { role: 'other', response: 'I appreciate you saying that. What happened?' },
      { role: 'you', prompt: 'explain', options: ['I didn\'t mean to upset you.', 'I made a mistake and I feel sorry.', 'I should have been more thoughtful.', 'I wasn\'t thinking clearly.'] },
      { role: 'other', response: 'Thanks for explaining. I understand.' },
      { role: 'you', prompt: 'promise', options: ['I\'ll try to do better.', 'It won\'t happen again.', 'I\'ve learned from this.', 'Can we start fresh?'] },
    ]
  },
];

export default function ConversationBuilder() {
  const { darkMode, addStars, soundEnabled } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [conversation, setConversation] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStepIndex(0);
    setConversation([]);
    setIsComplete(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Add your message to conversation
    setConversation(prev => [...prev, { role: 'user', text: option }]);
    speak(option);

    setTimeout(() => {
      const currentStep = selectedTemplate.steps[currentStepIndex];
      
      // Check if next step is other person's response
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < selectedTemplate.steps.length) {
        const nextStep = selectedTemplate.steps[nextStepIndex];
        if (nextStep.role === 'other') {
          setConversation(prev => [...prev, { role: 'other', text: nextStep.response }]);
          speak(nextStep.response);
          
          // Move to the step after the response
          const stepAfterResponse = nextStepIndex + 1;
          if (stepAfterResponse < selectedTemplate.steps.length) {
            setCurrentStepIndex(stepAfterResponse);
          } else {
            setIsComplete(true);
            addStars(15);
          }
        } else {
          setCurrentStepIndex(nextStepIndex);
        }
      } else {
        setIsComplete(true);
        addStars(15);
      }
      
      setSelectedOption(null);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setCurrentStepIndex(0);
    setConversation([]);
    setSelectedOption(null);
    setIsComplete(false);
  };

  const renderTemplateList = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {conversationTemplates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl card-hover cursor-pointer`}
          onClick={() => handleTemplateSelect(template)}
        >
          <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
            <span className="text-6xl">{template.icon}</span>
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {template.difficulty}
            </div>
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {template.title}
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Practice this common conversation pattern
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {template.steps.filter(s => s.role === 'you').length} responses to practice
              </span>
              <motion.div
                className="flex items-center gap-2 text-blue-500"
                whileHover={{ x: 5 }}
              >
                Practice <ChevronRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderConversationBuilder = () => {
    const currentStep = selectedTemplate.steps[currentStepIndex];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={handleReset}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              ← Back to conversations
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTemplate.color} flex items-center justify-center text-2xl`}>
              {selectedTemplate.icon}
            </div>
            <div>
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedTemplate.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Practice this conversation
              </p>
            </div>
          </div>
        </div>

        {/* Conversation Area */}
        <div className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl min-h-[400px]`}>
          <div className="space-y-4 mb-6">
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-br-md'
                      : darkMode ? 'bg-gray-700 text-white rounded-bl-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator when waiting */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className={`px-4 py-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Response Options */}
          {!isComplete && currentStep?.role === 'you' && !selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose what to say:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentStep.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 rounded-xl text-left ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-blue-700'
                    } transition-colors border-2 border-transparent hover:border-blue-400`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Completion */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Great Conversation!
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You practiced "{selectedTemplate.title}" successfully!
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  +15 Stars Earned!
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={handleReset}
                  className={`px-6 py-3 rounded-xl font-medium ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5 inline mr-2" />
                  More Conversations
                </motion.button>
                <motion.button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setConversation([]);
                    setIsComplete(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 inline mr-2" />
                  Practice Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tips */}
        <div className={`rounded-2xl p-4 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
          <h4 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
            💡 Conversation Tips
          </h4>
          <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
            <li>• Make eye contact when possible (it's okay if this is hard!)</li>
            <li>• Wait for the other person to finish before responding</li>
            <li>• It's okay to pause and think before answering</li>
            <li>• You can always ask someone to repeat what they said</li>
          </ul>
        </div>
      </div>
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
          💬 Conversation Builder
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Practice common conversations step by step
        </p>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedTemplate ? renderConversationBuilder() : renderTemplateList()}
      </AnimatePresence>
    </div>
  );
}