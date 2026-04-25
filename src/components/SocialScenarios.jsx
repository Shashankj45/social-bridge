import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Play, Check, ArrowRight, RotateCcw, 
  Star, Volume2, ThumbsUp, ThumbsDown, Lightbulb
} from 'lucide-react';
import { useApp } from '../contexts';

const scenarios = [
  {
    id: 1,
    title: 'Making a New Friend',
    location: '🏫 School Playground',
    difficulty: 'Easy',
    image: '👋',
    color: 'from-green-400 to-emerald-500',
    description: 'You see a new student sitting alone at lunch. What should you do?',
    steps: [
      {
        situation: 'You notice a new student sitting alone at a lunch table.',
        character: '👦',
        thought: 'They look lonely. I could talk to them!',
        choices: [
          { 
            text: 'Walk over and say "Hi, I\'m Alex. Can I sit with you?"', 
            correct: true, 
            feedback: 'Great choice! Introducing yourself is friendly and welcoming.',
            socialPoints: 10
          },
          { 
            text: 'Ignore them and sit with your usual friends', 
            correct: false, 
            feedback: 'The new student might feel more lonely. It\'s nice to include new people.',
            socialPoints: 0
          },
          { 
            text: 'Point at them and laugh', 
            correct: false, 
            feedback: 'This would hurt their feelings. We should be kind to others.',
            socialPoints: -5
          },
        ]
      },
      {
        situation: 'The new student says "Yes! I\'m Jamie. I just moved here."',
        character: '👧',
        thought: 'They seem happy I talked to them!',
        choices: [
          { 
            text: 'Ask "Where did you move from? Do you like it here so far?"', 
            correct: true, 
            feedback: 'Asking questions shows you\'re interested in getting to know them!',
            socialPoints: 10
          },
          { 
            text: 'Say nothing and start eating', 
            correct: false, 
            feedback: 'It\'s better to continue the conversation to make them feel welcome.',
            socialPoints: 2
          },
          { 
            text: 'Talk only about yourself', 
            correct: false, 
            feedback: 'Conversations work best when both people get to share.',
            socialPoints: 3
          },
        ]
      },
      {
        situation: 'Jamie tells you about their old school and seems a little sad.',
        character: '👦',
        thought: 'Moving to a new place must be hard...',
        choices: [
          { 
            text: 'Say "That sounds hard. I hope you like our school! Want me to show you around?"', 
            correct: true, 
            feedback: 'You showed empathy and offered help. That\'s being a great friend!',
            socialPoints: 15
          },
          { 
            text: 'Change the subject immediately', 
            correct: false, 
            feedback: 'It\'s good to acknowledge how someone feels before moving on.',
            socialPoints: 3
          },
          { 
            text: 'Say "That\'s boring, let\'s talk about something else"', 
            correct: false, 
            feedback: 'This might hurt Jamie\'s feelings. It\'s important to be respectful.',
            socialPoints: -3
          },
        ]
      },
    ]
  },
  {
    id: 2,
    title: 'Asking for Help',
    location: '📚 Library',
    difficulty: 'Easy',
    image: '🙋',
    color: 'from-blue-400 to-cyan-500',
    description: 'You can\'t find a book you need for your homework. What do you do?',
    steps: [
      {
        situation: 'You\'ve been looking for a book for 10 minutes and can\'t find it.',
        character: '👦',
        thought: 'I\'m getting frustrated. Maybe I should ask someone.',
        choices: [
          { 
            text: 'Walk up to the librarian and say "Excuse me, could you help me find a book?"', 
            correct: true, 
            feedback: 'Perfect! You used polite words and asked clearly for what you need.',
            socialPoints: 10
          },
          { 
            text: 'Give up and go home without the book', 
            correct: false, 
            feedback: 'It\'s okay to ask for help! Librarians love helping people find books.',
            socialPoints: 0
          },
          { 
            text: 'Start pulling all the books off the shelves', 
            correct: false, 
            feedback: 'This would make a mess and is not respectful of the library.',
            socialPoints: -5
          },
        ]
      },
      {
        situation: 'The librarian is helping another person and you need to wait.',
        character: '👧',
        thought: 'They\'re busy right now...',
        choices: [
          { 
            text: 'Wait patiently nearby until they\'re finished', 
            correct: true, 
            feedback: 'Waiting your turn shows good manners and respect for others.',
            socialPoints: 10
          },
          { 
            text: 'Interrupt and say "I NEED HELP NOW!"', 
            correct: false, 
            feedback: 'Interrupting is rude. Everyone deserves to be helped in order.',
            socialPoints: -3
          },
          { 
            text: 'Leave angrily and complain loudly', 
            correct: false, 
            feedback: 'Being patient is important. The librarian will help you soon.',
            socialPoints: -5
          },
        ]
      },
    ]
  },
  {
    id: 3,
    title: 'Handling Disagreement',
    location: '🏡 Friend\'s House',
    difficulty: 'Medium',
    image: '🤝',
    color: 'from-purple-400 to-violet-500',
    description: 'You and your friend want to play different games. How can you solve this?',
    steps: [
      {
        situation: 'You want to play video games, but your friend wants to play outside.',
        character: '👦',
        thought: 'We both want different things. What should I do?',
        choices: [
          { 
            text: 'Suggest "How about we play outside first, then video games?"', 
            correct: true, 
            feedback: 'Excellent! Compromising means both people get what they want.',
            socialPoints: 15
          },
          { 
            text: 'Insist on video games and refuse to play outside', 
            correct: false, 
            feedback: 'Friendships work better when we consider each other\'s wishes.',
            socialPoints: -3
          },
          { 
            text: 'Get angry and say "I\'m going home!"', 
            correct: false, 
            feedback: 'It\'s better to work out a solution than to give up on having fun together.',
            socialPoints: -5
          },
        ]
      },
      {
        situation: 'Your friend says they really don\'t like video games at all.',
        character: '👧',
        thought: 'They don\'t like what I like... that\'s okay!',
        choices: [
          { 
            text: 'Say "That\'s okay! What games do YOU like to play?"', 
            correct: true, 
            feedback: 'Great response! You respected their preference and showed interest.',
            socialPoints: 12
          },
          { 
            text: 'Say "Video games are better. You\'re wrong."', 
            correct: false, 
            feedback: 'People can like different things. That\'s what makes everyone unique!',
            socialPoints: -5
          },
          { 
            text: 'Stop being their friend', 
            correct: false, 
            feedback: 'Friends don\'t have to like all the same things to be friends.',
            socialPoints: -10
          },
        ]
      },
    ]
  },
  {
    id: 4,
    title: 'Joining a Group Game',
    location: '⚽ Sports Field',
    difficulty: 'Medium',
    image: '🎮',
    color: 'from-orange-400 to-amber-500',
    description: 'Some kids are playing soccer and you want to join. How do you ask?',
    steps: [
      {
        situation: 'You see a group of kids playing soccer and you want to join.',
        character: '👦',
        thought: 'That looks fun! I hope I can play too.',
        choices: [
          { 
            text: 'Wait for a break, then ask "Can I play with you?"', 
            correct: true, 
            feedback: 'Perfect timing! Waiting for a natural pause is polite.',
            socialPoints: 10
          },
          { 
            text: 'Run onto the field and take the ball', 
            correct: false, 
            feedback: 'This would interrupt their game. It\'s better to ask first.',
            socialPoints: -5
          },
          { 
            text: 'Stand far away and watch without asking', 
            correct: false, 
            feedback: 'It\'s okay to ask! Most kids are happy to include others.',
            socialPoints: 2
          },
        ]
      },
      {
        situation: 'They say the teams are already full and you can\'t play right now.',
        character: '👧',
        thought: 'Oh no, I can\'t play... I feel disappointed.',
        choices: [
          { 
            text: 'Say "Okay, can I play next game?" and watch from the side', 
            correct: true, 
            feedback: 'Great attitude! You handled disappointment well and stayed positive.',
            socialPoints: 15
          },
          { 
            text: 'Cry and run away', 
            correct: false, 
            feedback: 'It\'s okay to feel sad, but you can still join next time!',
            socialPoints: 0
          },
          { 
            text: 'Say "You\'re all mean!" and kick their ball away', 
            correct: false, 
            feedback: 'They weren\'t being mean - the teams were just full. Reacting calmly is better.',
            socialPoints: -10
          },
        ]
      },
    ]
  },
];

export default function SocialScenarios() {
  const { darkMode, addStars, addActivity, soundEnabled } = useApp();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setSelectedChoice(null);
    setTotalPoints(0);
    setCompleted(false);
    speak(scenario.description);
  };

  const handleChoiceSelect = (choice, index) => {
    setSelectedChoice(index);
    setShowFeedback(true);
    setTotalPoints(prev => prev + choice.socialPoints);
    speak(choice.feedback);

    if (choice.correct) {
      addStars(choice.socialPoints);
    }
  };

  const handleNextStep = () => {
    if (currentStep < selectedScenario.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      addActivity({ 
        type: 'scenario', 
        title: selectedScenario.title,
        points: totalPoints 
      });
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setSelectedChoice(null);
    setTotalPoints(0);
    setShowFeedback(false);
    setCompleted(false);
  };

  const renderScenarioList = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {scenarios.map((scenario, index) => (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl card-hover cursor-pointer`}
          onClick={() => handleScenarioSelect(scenario)}
        >
          <div className={`h-40 bg-gradient-to-br ${scenario.color} flex items-center justify-center relative`}>
            <span className="text-7xl">{scenario.image}</span>
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {scenario.difficulty}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              {scenario.location}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {scenario.title}
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {scenario.description}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {scenario.steps.length} steps
              </span>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" /> Start
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderScenarioPlay = () => {
    const step = selectedScenario.steps[currentStep];

    if (completed) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Scenario Complete!
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You finished "{selectedScenario.title}"
          </p>
          
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6 ${
            totalPoints >= 25 ? 'bg-green-100' : totalPoints >= 15 ? 'bg-yellow-100' : 'bg-orange-100'
          }`}>
            <Star className={`w-8 h-8 ${
              totalPoints >= 25 ? 'text-green-600' : totalPoints >= 15 ? 'text-yellow-600' : 'text-orange-600'
            }`} />
            <div className="text-left">
              <p className="text-sm text-gray-600">Social Points Earned</p>
              <p className={`text-2xl font-bold ${
                totalPoints >= 25 ? 'text-green-700' : totalPoints >= 15 ? 'text-yellow-700' : 'text-orange-700'
              }`}>
                {totalPoints} points
              </p>
            </div>
          </div>

          <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {totalPoints >= 25 
              ? '⭐ Amazing! You made great social choices!' 
              : totalPoints >= 15 
                ? '👍 Good job! Keep practicing!' 
                : '💪 Nice try! Let\'s practice more!'}
          </p>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" /> More Scenarios
            </motion.button>
            <motion.button
              onClick={() => {
                setCurrentStep(0);
                setSelectedChoice(null);
                setTotalPoints(0);
                setShowFeedback(false);
                setCompleted(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" /> Try Again
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Progress Header */}
        <div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={handleReset}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              ← Back to scenarios
            </button>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {totalPoints} pts
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedScenario.color} flex items-center justify-center text-2xl`}>
              {selectedScenario.image}
            </div>
            <div className="flex-1">
              <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedScenario.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Step {currentStep + 1} of {selectedScenario.steps.length}
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${selectedScenario.color}`}
              animate={{ width: `${((currentStep + 1) / selectedScenario.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
        >
          {/* Situation */}
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl">{step.character}</span>
              <div className={`flex-1 p-4 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {step.situation}
                </p>
              </div>
            </div>
            
            {/* Thought Bubble */}
            <div className="flex items-center gap-3 ml-16">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                💭 "{step.thought}"
              </p>
            </div>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <p className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              What would you do?
            </p>
            {step.choices.map((choice, index) => (
              <motion.button
                key={index}
                onClick={() => !showFeedback && handleChoiceSelect(choice, index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showFeedback
                    ? selectedChoice === index
                      ? choice.correct
                        ? 'bg-green-100 border-2 border-green-500 dark:bg-green-900/30'
                        : 'bg-red-100 border-2 border-red-500 dark:bg-red-900/30'
                      : choice.correct
                        ? 'bg-green-50 border-2 border-green-300 dark:bg-green-900/20'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={!showFeedback ? { scale: 1.02 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  {showFeedback && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      choice.correct ? 'bg-green-500' : selectedChoice === index ? 'bg-red-500' : 'bg-gray-300'
                    }`}>
                      {choice.correct ? (
                        <ThumbsUp className="w-4 h-4 text-white" />
                      ) : selectedChoice === index ? (
                        <ThumbsDown className="w-4 h-4 text-white" />
                      ) : null}
                    </div>
                  )}
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                    {choice.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
              >
                <div className={`p-4 rounded-xl ${
                  step.choices[selectedChoice].correct 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-orange-100 dark:bg-orange-900/30'
                }`}>
                  <p className={`${
                    step.choices[selectedChoice].correct 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-orange-800 dark:text-orange-200'
                  }`}>
                    {step.choices[selectedChoice].correct ? '✨ ' : '💡 '}
                    {step.choices[selectedChoice].feedback}
                  </p>
                </div>

                <motion.button
                  onClick={handleNextStep}
                  className="mt-4 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep < selectedScenario.steps.length - 1 ? (
                    <>Next Step <ArrowRight className="w-5 h-5" /></>
                  ) : (
                    <>See Results <Star className="w-5 h-5" /></>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
          👥 Social Scenarios
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Practice real-life social situations in a safe way
        </p>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedScenario ? renderScenarioPlay() : renderScenarioList()}
      </AnimatePresence>
    </div>
  );
}