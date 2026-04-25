import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Sparkles, Download, Share2, RefreshCw,
  Image, Palette, User, MapPin, Heart, Loader
} from 'lucide-react';
import { useApp } from '../contexts';

const imagePromptTemplates = [
  {
    id: 1,
    category: 'Social Scenarios',
    icon: '👥',
    color: 'from-blue-400 to-cyan-500',
    templates: [
      'A child greeting a new friend at school',
      'Two kids sharing toys in a playground',
      'A child asking a teacher for help',
      'Kids taking turns in a game',
      'A child joining a group activity',
    ]
  },
  {
    id: 2,
    category: 'Emotions',
    icon: '❤️',
    color: 'from-pink-400 to-rose-500',
    templates: [
      'A happy child playing with a puppy',
      'A child feeling proud of their artwork',
      'A calm child reading a book',
      'A child feeling excited about a birthday party',
      'A child feeling nervous on the first day of school',
    ]
  },
  {
    id: 3,
    category: 'Daily Activities',
    icon: '📅',
    color: 'from-green-400 to-emerald-500',
    templates: [
      'A child brushing their teeth in the morning',
      'A child eating breakfast with family',
      'A child packing their school bag',
      'A child doing homework at a desk',
      'A child getting ready for bed',
    ]
  },
  {
    id: 4,
    category: 'Coping Strategies',
    icon: '🧘',
    color: 'from-purple-400 to-violet-500',
    templates: [
      'A child taking deep breaths to calm down',
      'A child using a quiet corner to relax',
      'A child squeezing a stress ball',
      'A child wearing headphones in a noisy place',
      'A child counting to ten slowly',
    ]
  },
];

// Placeholder images for demo (In production, integrate with DALL-E or similar)
const placeholderImages = [
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
];

export default function ImageGenerator() {
  const { darkMode, addStars, customImages, setCustomImages } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);

  const generateImage = async (prompt) => {
    setIsGenerating(true);
    setGeneratedImage(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo, use placeholder images
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    setGeneratedImage({
      url: randomImage,
      prompt: prompt,
      timestamp: new Date()
    });
    
    setIsGenerating(false);
    addStars(5);
  };

  const handleTemplateClick = (template) => {
    setCustomPrompt(template);
    generateImage(template);
  };

  const handleCustomGenerate = () => {
    if (customPrompt.trim()) {
      generateImage(customPrompt);
    }
  };

  const handleSaveImage = () => {
    if (generatedImage) {
      setSavedImages(prev => [...prev, generatedImage]);
      setCustomImages([...customImages, generatedImage]);
    }
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
          🎨 Image Generator
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Create custom visual supports and social scenarios
        </p>
      </motion.div>

      {/* Custom Prompt Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
      >
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Create Your Own Image
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe what you want to see..."
            className={`flex-1 px-4 py-3 rounded-xl ${
              darkMode 
                ? 'bg-gray-700 text-white placeholder-gray-500' 
                : 'bg-gray-100 text-gray-800 placeholder-gray-400'
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          <motion.button
            onClick={handleCustomGenerate}
            disabled={!customPrompt.trim() || isGenerating}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
              !customPrompt.trim() || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
            }`}
            whileHover={customPrompt.trim() && !isGenerating ? { scale: 1.05 } : {}}
            whileTap={customPrompt.trim() && !isGenerating ? { scale: 0.95 } : {}}
          >
            {isGenerating ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Camera className="w-5 h-5" />
            )}
            Generate
          </motion.button>
        </div>
      </motion.div>

      {/* Generated Image Display */}
      <AnimatePresence>
        {(isGenerating || generatedImage) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
          >
            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden mb-4">
              {isGenerating ? (
                <div className={`w-full h-full flex flex-col items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-16 h-16 text-purple-500" />
                  </motion.div>
                  <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Creating your image...
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    This may take a moment
                  </p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage.url}
                  alt={generatedImage.prompt}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            {generatedImage && (
              <div className="space-y-4">
                <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  "{generatedImage.prompt}"
                </p>
                <div className="flex justify-center gap-3">
                  <motion.button
                    onClick={handleSaveImage}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="w-5 h-5" /> Save
                  </motion.button>
                  <motion.button
                    onClick={() => generateImage(generatedImage.prompt)}
                    className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="w-5 h-5" /> Regenerate
                  </motion.button>
                  <motion.button
                    className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-5 h-5" /> Download
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template Categories */}
      <div className="space-y-4">
        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Quick Templates
        </h3>
        
        {imagePromptTemplates.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <div 
              className="flex items-center gap-3 cursor-pointer mb-3"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
                {category.icon}
              </div>
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {category.category}
              </h4>
            </div>
            
            <AnimatePresence>
              {(selectedCategory === category.id || selectedCategory === null) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {category.templates.map((template, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleTemplateClick(template)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {template}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Saved Images Gallery */}
      {savedImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
        >
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Image className="w-5 h-5" />
            My Saved Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <div className={`rounded-2xl p-4 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
        <h4 className={`font-bold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          💡 Tips for Creating Images
        </h4>
        <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
          <li>• Be specific about what you want to see</li>
          <li>• Include emotions and settings for better results</li>
          <li>• Use generated images in your visual schedules and stories</li>
          <li>• Save images you like for later use</li>
        </ul>
      </div>
    </div>
  );
}