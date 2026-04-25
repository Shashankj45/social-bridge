import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Users, MessageCircle, Calendar, BookOpen, 
  Trophy, Star, TrendingUp, Zap, Sparkles, Camera,
  ChevronRight, Play
} from 'lucide-react';
import { useApp } from '../contexts';

const quickActions = [
  { id: 'emotions', icon: Heart, label: 'How do you feel?', color: 'from-pink-400 to-rose-500', emoji: '😊' },
  { id: 'scenarios', icon: Users, label: 'Practice Social Skills', color: 'from-purple-400 to-indigo-500', emoji: '👋' },
  { id: 'conversation', icon: MessageCircle, label: 'Build a Conversation', color: 'from-green-400 to-emerald-500', emoji: '💬' },
  { id: 'stories', icon: BookOpen, label: 'Read Social Stories', color: 'from-blue-400 to-cyan-500', emoji: '📖' },
];

const featuredActivities = [
  { 
    id: 1, 
    title: 'Making Friends at School', 
    type: 'scenario', 
    difficulty: 'Easy',
    duration: '5 min',
    image: '🏫',
    color: 'from-amber-400 to-orange-500'
  },
  { 
    id: 2, 
    title: 'Understanding Facial Expressions', 
    type: 'emotion', 
    difficulty: 'Medium',
    duration: '10 min',
    image: '😀',
    color: 'from-cyan-400 to-blue-500'
  },
  { 
    id: 3, 
    title: 'Asking for Help', 
    type: 'conversation', 
    difficulty: 'Easy',
    duration: '3 min',
    image: '🙋',
    color: 'from-violet-400 to-purple-500'
  },
];

export default function Dashboard() {
  const { 
    userName, stars, darkMode, setCurrentPage, 
    dailyGoals, completedActivities 
  } = useApp();

  const totalGoalProgress = dailyGoals.reduce((acc, goal) => acc + goal.progress, 0);
  const totalGoalTarget = dailyGoals.reduce((acc, goal) => acc + goal.total, 0);
  const goalPercentage = Math.round((totalGoalProgress / totalGoalTarget) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Hero */}
      <motion.div 
        className={`relative overflow-hidden rounded-3xl p-8 ${
          darkMode 
            ? 'bg-gradient-to-br from-indigo-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
        } text-white shadow-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {userName}! 🌟
            </h1>
            <p className="text-lg text-white/80 mb-6">
              Ready for today's social adventures?
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <motion.div 
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-2xl font-bold">{stars}</p>
                <p className="text-sm text-white/70">Stars Earned</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-8 h-8 text-amber-300" />
              <div>
                <p className="text-2xl font-bold">{completedActivities.length}</p>
                <p className="text-sm text-white/70">Activities Done</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-8 h-8 text-green-300" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-white/70">Day Streak 🔥</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Daily Goals Progress */}
      <motion.div 
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Today's Goals
          </h2>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {goalPercentage}% Complete
          </span>
        </div>

        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${goalPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-3">
          {dailyGoals.map((goal, index) => (
            <motion.div 
              key={goal.id}
              className={`flex items-center gap-4 p-3 rounded-xl ${
                goal.completed 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                goal.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                {goal.completed ? '✓' : goal.progress}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {goal.title}
                </p>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full ${
                      goal.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                  />
                </div>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {goal.progress}/{goal.total}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={() => setCurrentPage(action.id)}
            className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${action.color} text-white shadow-lg`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute top-2 right-2 text-4xl opacity-30">
              {action.emoji}
            </div>
            <action.icon className="w-10 h-10 mb-3" />
            <p className="font-semibold text-sm">{action.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Featured Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            ✨ Featured Activities
          </h2>
          <button className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-1`}>
            See All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg card-hover`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className={`h-32 bg-gradient-to-br ${activity.color} flex items-center justify-center`}>
                <span className="text-6xl">{activity.image}</span>
              </div>
              <div className="p-4">
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {activity.type}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {activity.difficulty}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activity.duration}
                  </span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Play className="w-4 h-4" /> Start Activity
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Create Custom Content */}
      <motion.div
        className={`rounded-3xl p-6 ${
          darkMode 
            ? 'bg-gradient-to-br from-rose-900 to-pink-900' 
            : 'bg-gradient-to-br from-rose-400 to-pink-500'
        } text-white shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Camera className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Create Custom Images</h3>
            <p className="text-white/80 text-sm">
              Generate personalized social scenarios and emotion cards
            </p>
          </div>
          <motion.button
            onClick={() => setCurrentPage('images')}
            className="px-6 py-3 bg-white text-pink-600 rounded-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}