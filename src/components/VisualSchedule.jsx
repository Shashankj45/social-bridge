import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Calendar, Plus, Check, Clock, Edit2, Trash2, 
  GripVertical, Sun, Moon, Sunrise, Sunset, Bell
} from 'lucide-react';
import { useApp } from '../contexts';

const defaultActivities = [
  { id: '1', time: '7:00 AM', title: 'Wake Up', icon: '🌅', color: 'from-yellow-400 to-orange-400', completed: false },
  { id: '2', time: '7:30 AM', title: 'Breakfast', icon: '🥣', color: 'from-amber-400 to-yellow-400', completed: false },
  { id: '3', time: '8:00 AM', title: 'Get Dressed', icon: '👕', color: 'from-blue-400 to-cyan-400', completed: false },
  { id: '4', time: '8:30 AM', title: 'Brush Teeth', icon: '🪥', color: 'from-cyan-400 to-teal-400', completed: false },
  { id: '5', time: '9:00 AM', title: 'School', icon: '🏫', color: 'from-indigo-400 to-purple-400', completed: false },
  { id: '6', time: '12:00 PM', title: 'Lunch', icon: '🍎', color: 'from-red-400 to-pink-400', completed: false },
  { id: '7', time: '3:00 PM', title: 'Homework', icon: '📚', color: 'from-green-400 to-emerald-400', completed: false },
  { id: '8', time: '4:00 PM', title: 'Free Time', icon: '🎮', color: 'from-purple-400 to-pink-400', completed: false },
  { id: '9', time: '6:00 PM', title: 'Dinner', icon: '🍽️', color: 'from-orange-400 to-red-400', completed: false },
  { id: '10', time: '7:00 PM', title: 'Bath Time', icon: '🛁', color: 'from-blue-400 to-indigo-400', completed: false },
  { id: '11', time: '8:00 PM', title: 'Story Time', icon: '📖', color: 'from-violet-400 to-purple-400', completed: false },
  { id: '12', time: '8:30 PM', title: 'Bedtime', icon: '😴', color: 'from-indigo-400 to-blue-400', completed: false },
];

const activityIcons = [
  '🌅', '🥣', '👕', '🪥', '🏫', '🍎', '📚', '🎮', '🍽️', '🛁', '📖', '😴',
  '🎨', '🎵', '⚽', '🚌', '🛒', '👨‍👩‍👧', '🐕', '🌳', '📺', '💻', '🧹', '🍪'
];

export default function VisualSchedule() {
  const { darkMode, soundEnabled, addStars } = useApp();
  const [activities, setActivities] = useState(defaultActivities);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({ time: '', title: '', icon: '📌', color: 'from-gray-400 to-gray-500' });

  const speak = (text) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleComplete = (id) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === id) {
        const newCompleted = !activity.completed;
        if (newCompleted) {
          speak(`${activity.title} completed! Great job!`);
          addStars(2);
        }
        return { ...activity, completed: newCompleted };
      }
      return activity;
    }));
  };

  const addActivity = () => {
    if (newActivity.time && newActivity.title) {
      const id = Date.now().toString();
      setActivities(prev => [...prev, { ...newActivity, id, completed: false }]);
      setNewActivity({ time: '', title: '', icon: '📌', color: 'from-gray-400 to-gray-500' });
      setShowAddModal(false);
    }
  };

  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const completedCount = activities.filter(a => a.completed).length;
  const progressPercent = Math.round((completedCount / activities.length) * 100);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { icon: Sunrise, text: 'Good Morning!', color: 'from-yellow-400 to-orange-400' };
    if (hour < 17) return { icon: Sun, text: 'Good Afternoon!', color: 'from-blue-400 to-cyan-400' };
    if (hour < 20) return { icon: Sunset, text: 'Good Evening!', color: 'from-orange-400 to-pink-400' };
    return { icon: Moon, text: 'Good Night!', color: 'from-indigo-400 to-purple-400' };
  };

  const timeOfDay = getTimeOfDay();
  const TimeIcon = timeOfDay.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          📅 My Visual Schedule
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          See your day, step by step
        </p>
      </motion.div>

      {/* Time of Day Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 bg-gradient-to-r ${timeOfDay.color} text-white shadow-xl`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <TimeIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{timeOfDay.text}</h2>
              <p className="text-white/80">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Today's Progress
          </h3>
          <span className={`text-2xl font-bold ${progressPercent >= 80 ? 'text-green-500' : progressPercent >= 50 ? 'text-yellow-500' : 'text-blue-500'}`}>
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${progressPercent >= 80 ? 'bg-green-500' : progressPercent >= 50 ? 'bg-yellow-500' : 'bg-blue-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {completedCount} of {activities.length} activities completed
          {progressPercent >= 80 && ' 🌟 Amazing!'}
          {progressPercent >= 50 && progressPercent < 80 && ' 💪 Keep going!'}
        </p>
      </motion.div>

      {/* Add Activity Button */}
      <motion.button
        onClick={() => setShowAddModal(true)}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-blue-400 text-blue-500 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Add New Activity
      </motion.button>

      {/* Schedule List */}
      <Reorder.Group
        axis="y"
        values={activities}
        onReorder={setActivities}
        className="space-y-3"
      >
        {activities.map((activity, index) => (
          <Reorder.Item
            key={activity.id}
            value={activity}
            className="cursor-grab active:cursor-grabbing"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg ${
                activity.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="cursor-grab">
                  <GripVertical className={`w-5 h-5 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                </div>
                
                <motion.button
                  onClick={() => toggleComplete(activity.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    activity.completed
                      ? 'bg-green-500 text-white'
                      : `bg-gradient-to-br ${activity.color} text-white`
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activity.completed ? <Check className="w-6 h-6" /> : <span className="text-2xl">{activity.icon}</span>}
                </motion.button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.time}
                    </span>
                  </div>
                  <h4 className={`font-bold text-lg ${
                    activity.completed 
                      ? 'line-through text-gray-400' 
                      : darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {activity.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setEditingActivity(activity)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </motion.button>
                  <motion.button
                    onClick={() => deleteActivity(activity.id)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
              onClick={e => e.stopPropagation()}
            >
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Add New Activity
              </h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Time
                  </label>
                  <input
                    type="time"
                    value={newActivity.time}
                    onChange={e => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Activity Name
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={e => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What's the activity?"
                    className={`w-full px-4 py-3 rounded-xl ${
                      darkMode ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-800 placeholder-gray-400'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Choose an Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activityIcons.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewActivity(prev => ({ ...prev, icon }))}
                        className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                          newActivity.icon === icon
                            ? 'bg-blue-500 ring-2 ring-blue-400'
                            : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={addActivity}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium"
                >
                  Add Activity
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}