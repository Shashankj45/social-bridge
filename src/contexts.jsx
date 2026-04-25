import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Helper function to pull data from the phone's storage
  const getSavedData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  // --- STATE INITIALIZATION ---
  // These check the device memory first. If empty, they use the starting values.
  const [currentPage, setCurrentPage] = useState('home');
  const [userName, setUserName] = useState(() => getSavedData('sb_user', 'Friend'));
  const [userAge, setUserAge] = useState(() => getSavedData('sb_age', 10));
  const [stars, setStars] = useState(() => getSavedData('sb_stars', 0)); // Starts at 0 for new users
  const [soundEnabled, setSoundEnabled] = useState(() => getSavedData('sb_sound', true));
  const [darkMode, setDarkMode] = useState(() => getSavedData('sb_dark', false));
  const [completedActivities, setCompletedActivities] = useState(() => getSavedData('sb_activities', []));
  const [emotionHistory, setEmotionHistory] = useState(() => getSavedData('sb_emotions', []));
  
  // Daily Goals state
  const [dailyGoals, setDailyGoals] = useState(() => getSavedData('sb_goals', [
    { id: 1, title: 'Practice 3 emotions', completed: false, progress: 0, total: 3 },
    { id: 2, title: 'Complete 1 social scenario', completed: false, progress: 0, total: 1 },
    { id: 3, title: 'Build a conversation', completed: false, progress: 0, total: 1 },
  ]));

  // Settings state
  const [fontSize, setFontSize] = useState(() => getSavedData('sb_fontSize', 'medium'));
  const [animationSpeed, setAnimationSpeed] = useState(() => getSavedData('sb_animSpeed', 'normal'));
  const [highContrast, setHighContrast] = useState(() => getSavedData('sb_contrast', false));
  const [voiceType, setVoiceType] = useState(() => getSavedData('sb_voice', 'friendly'));
  const [schedule, setSchedule] = useState(() => getSavedData('sb_schedule', []));
  const [customImages, setCustomImages] = useState(() => getSavedData('sb_customImages', []));

  // --- PERSISTENCE LOGIC ---
  // This "Watcher" saves data to the phone every time a value changes
  useEffect(() => {
    localStorage.setItem('sb_stars', JSON.stringify(stars));
    localStorage.setItem('sb_user', JSON.stringify(userName));
    localStorage.setItem('sb_age', JSON.stringify(userAge));
    localStorage.setItem('sb_activities', JSON.stringify(completedActivities));
    localStorage.setItem('sb_emotions', JSON.stringify(emotionHistory));
    localStorage.setItem('sb_goals', JSON.stringify(dailyGoals));
    localStorage.setItem('sb_sound', JSON.stringify(soundEnabled));
    localStorage.setItem('sb_dark', JSON.stringify(darkMode));
    localStorage.setItem('sb_fontSize', JSON.stringify(fontSize));
    localStorage.setItem('sb_schedule', JSON.stringify(schedule));
    localStorage.setItem('sb_customImages', JSON.stringify(customImages));
  }, [stars, userName, userAge, completedActivities, emotionHistory, dailyGoals, soundEnabled, darkMode, fontSize, schedule, customImages]);

  // --- HELPER FUNCTIONS ---
  // These are your existing logic functions preserved from your original code
  const addStars = (amount) => {
    setStars(prev => prev + amount);
  };

  const addActivity = (activity) => {
    setCompletedActivities(prev => [...prev, { ...activity, timestamp: new Date() }]);
  };

  const addEmotion = (emotion) => {
    setEmotionHistory(prev => [...prev, { ...emotion, timestamp: new Date() }]);
  };

  const updateGoal = (goalId, progress) => {
    setDailyGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newProgress = Math.min(progress, goal.total);
        return { ...goal, progress: newProgress, completed: newProgress >= goal.total };
      }
      return goal;
    }));
  };

  const value = {
    currentPage, setCurrentPage,
    soundEnabled, setSoundEnabled,
    darkMode, setDarkMode,
    userName, setUserName,
    userAge, setUserAge,
    stars, setStars, addStars,
    completedActivities, addActivity,
    emotionHistory, addEmotion,
    dailyGoals, updateGoal,
    fontSize, setFontSize,
    animationSpeed, setAnimationSpeed,
    highContrast, setHighContrast,
    voiceType, setVoiceType,
    schedule, setSchedule,
    customImages, setCustomImages,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}