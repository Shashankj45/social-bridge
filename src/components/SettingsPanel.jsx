import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Volume2, Moon, Sun, Type, 
  Palette, Bell, Shield, HelpCircle, Zap, Eye
} from 'lucide-react';
import { useApp } from '../contexts';

// --- HELPER COMPONENTS (Defined outside to prevent re-render focus issues) ---

const SettingSection = ({ title, icon: Icon, children, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-4`}
  >
    <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <Icon className="w-5 h-5 text-blue-500" />
      {title}
    </h3>
    {children}
  </motion.div>
);

const ToggleSetting = ({ label, description, value, onChange, darkMode }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{label}</p>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`w-14 h-8 rounded-full transition-colors relative ${
        value ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: value ? 24 : 0 }}
      />
    </button>
  </div>
);

const SelectSetting = ({ label, value, onChange, options, darkMode }) => (
  <div className="py-3">
    <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            value === option.value
              ? 'bg-blue-500 text-white shadow-md'
              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

// --- MAIN SETTINGS PANEL ---

export default function SettingsPanel() {
  const {
    darkMode, setDarkMode,
    soundEnabled, setSoundEnabled,
    userName, setUserName,
    fontSize, setFontSize,
    animationSpeed, setAnimationSpeed,
    highContrast, setHighContrast,
    voiceType, setVoiceType,
  } = useApp();

  // Local state for the name field fix
  const [localName, setLocalName] = useState(userName);

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* 1. Profile Settings */}
      <SettingSection title="Profile Settings" icon={User} darkMode={darkMode}>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className={`flex-1 p-3 rounded-xl ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                } border-2 border-transparent focus:border-blue-500 outline-none transition-all`}
                placeholder="Enter your name..."
              />
              <motion.button
                onClick={() => setUserName(localName)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold shadow-lg"
              >
                Save
              </motion.button>
            </div>
          </div>
        </div>
      </SettingSection>

      {/* 2. Experience Controls */}
      <SettingSection title="Experience" icon={Zap} darkMode={darkMode}>
        <ToggleSetting
          label="Dark Mode"
          description="Switch to a darker, low-light theme"
          value={darkMode}
          onChange={setDarkMode}
          darkMode={darkMode}
        />
        <ToggleSetting
          label="Sound Effects"
          description="Enable feedback sounds"
          value={soundEnabled}
          onChange={setSoundEnabled}
          darkMode={darkMode}
        />
        <ToggleSetting
          label="High Contrast"
          description="Better visibility for colors"
          value={highContrast}
          onChange={setHighContrast}
          darkMode={darkMode}
        />
      </SettingSection>

      {/* 3. Accessibility & Animation Speed */}
      <SettingSection title="Accessibility" icon={Eye} darkMode={darkMode}>
        <SelectSetting
          label="Font Size"
          value={fontSize}
          onChange={setFontSize}
          darkMode={darkMode}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'xlarge', label: 'Extra Large' },
          ]}
        />
        <SelectSetting
          label="Animation Speed"
          value={animationSpeed}
          onChange={setAnimationSpeed}
          darkMode={darkMode}
          options={[
            { value: 'slow', label: 'Slower' },
            { value: 'normal', label: 'Normal' },
            { value: 'fast', label: 'Fast' },
            { value: 'none', label: 'No Animations' },
          ]}
        />
      </SettingSection>

      {/* 4. Help & Support */}
      <SettingSection title="Help & Support" icon={HelpCircle} darkMode={darkMode}>
        <div className="space-y-3">
          {[
            { label: 'How to Use the App', icon: '📖' },
            { label: 'Tips for Parents', icon: '👨‍👩‍👧' },
            { label: 'Contact Support', icon: '📧' },
            { label: 'Privacy Policy', icon: '🔒' },
            { label: 'About SocialBridge', icon: 'ℹ️' },
          ].map((item, index) => (
            <motion.button
              key={index}
              className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } transition-colors`}
              whileHover={{ x: 5 }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </SettingSection>

      <div className="text-center py-4">
        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          SocialBridge Version 1.0.0
        </p>
      </div>
    </div>
  );
}