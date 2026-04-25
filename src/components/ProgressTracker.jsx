import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, TrendingUp, Calendar, Award, 
  Target, Zap, Heart, Users, MessageCircle,
  BookOpen, BarChart3
} from 'lucide-react';
import { useApp } from '../contexts';

export default function ProgressTracker() {
  const { darkMode, stars, completedActivities, emotionHistory, dailyGoals } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    { label: 'Total Stars', value: stars, icon: Star, color: 'from-yellow-400 to-amber-500', change: '+25 this week' },
    { label: 'Activities Done', value: completedActivities.length, icon: Trophy, color: 'from-purple-400 to-violet-500', change: '+12 this week' },
    { label: 'Day Streak', value: 7, icon: Zap, color: 'from-orange-400 to-red-500', change: 'Keep it up!' },
    { label: 'Emotions Logged', value: emotionHistory.length, icon: Heart, color: 'from-pink-400 to-rose-500', change: '+5 today' },
  ];

  const skillProgress = [
    { skill: 'Emotion Recognition', progress: 75, icon: '❤️', color: 'bg-pink-500' },
    { skill: 'Conversation Skills', progress: 60, icon: '💬', color: 'bg-blue-500' },
    { skill: 'Social Scenarios', progress: 85, icon: '👥', color: 'bg-purple-500' },
    { skill: 'Daily Routines', progress: 90, icon: '📅', color: 'bg-green-500' },
    { skill: 'Coping Strategies', progress: 45, icon: '🧘', color: 'bg-orange-500' },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first activity', earned: true, icon: '🎯' },
    { id: 2, title: 'Emotion Expert', description: 'Identify 20 emotions correctly', earned: true, icon: '🧠' },
    { id: 3, title: 'Social Butterfly', description: 'Complete 10 social scenarios', earned: true, icon: '🦋' },
    { id: 4, title: 'Week Warrior', description: 'Use the app 7 days in a row', earned: true, icon: '🔥' },
    { id: 5, title: 'Star Collector', description: 'Earn 500 stars', earned: false, icon: '⭐' },
    { id: 6, title: 'Story Master', description: 'Read all social stories', earned: false, icon: '📚' },
    { id: 7, title: 'Communication Pro', description: 'Use 100 symbols', earned: false, icon: '💬' },
    { id: 8, title: 'Month Champion', description: 'Use the app 30 days in a row', earned: false, icon: '🏆' },
  ];

  const weeklyActivity = [
    { day: 'Mon', activities: 5, stars: 35 },
    { day: 'Tue', activities: 3, stars: 25 },
    { day: 'Wed', activities: 7, stars: 50 },
    { day: 'Thu', activities: 4, stars: 30 },
    { day: 'Fri', activities: 6, stars: 45 },
    { day: 'Sat', activities: 8, stars: 60 },
    { day: 'Sun', activities: 2, stars: 15 },
  ];

  const maxStars = Math.max(...weeklyActivity.map(d => d.stars));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          🏆 My Progress
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          See how far you've come!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl p-4 bg-gradient-to-br ${stat.color} text-white shadow-lg`}
          >
            <stat.icon className="w-8 h-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
            <p className="text-xs mt-1 bg-white/20 rounded-full px-2 py-1 inline-block">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <BarChart3 className="w-5 h-5" />
            This Week's Activity
          </h3>
          <div className="flex gap-2">
            {['week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyActivity.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.stars / maxStars) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg min-h-[20px] relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.stars} ⭐
                </div>
              </motion.div>
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skill Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <h3 className={`font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Target className="w-5 h-5" />
          Skill Progress
        </h3>
        <div className="space-y-4">
          {skillProgress.map((skill, index) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{skill.icon}</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {skill.skill}
                  </span>
                </div>
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {skill.progress}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <h3 className={`font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Award className="w-5 h-5" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`p-4 rounded-2xl text-center ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white'
                  : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <span className={`text-4xl block mb-2 ${!achievement.earned && 'grayscale opacity-50'}`}>
                {achievement.icon}
              </span>
              <h4 className="font-bold text-sm">{achievement.title}</h4>
              <p className="text-xs mt-1 opacity-80">{achievement.description}</p>
              {achievement.earned && (
                <div className="mt-2 text-xs font-medium">✓ Earned!</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Daily Goals Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Calendar className="w-5 h-5" />
          Today's Goals
        </h3>
        <div className="space-y-3">
          {dailyGoals.map((goal) => (
            <div 
              key={goal.id}
              className={`flex items-center gap-4 p-3 rounded-xl ${
                goal.completed 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                goal.completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
                {goal.completed ? '✓' : goal.progress}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {goal.title}
                </p>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {goal.progress}/{goal.total}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}