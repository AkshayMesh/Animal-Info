import { useState } from 'react';
import { AnimalGrid } from './components/AnimalGrid';
import { AnimalStory } from './components/AnimalStory';
import { Quiz } from './components/Quiz';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Trophy } from 'lucide-react';

type View = 'home' | 'story' | 'quiz';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId);
    setCurrentView('story');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedAnimal('');
  };

  const handleGoToQuiz = () => {
    setCurrentView('quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.h1 
            className="flex items-center gap-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🐾 Animal Adventure
          </motion.h1>
          <nav className="flex gap-2">
            <motion.button
              onClick={handleBackToHome}
              className={`p-2 rounded-full transition-colors ${
                currentView === 'home' ? 'bg-white text-purple-500' : 'bg-purple-400/50 hover:bg-purple-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleGoToQuiz}
              className={`p-2 rounded-full transition-colors ${
                currentView === 'quiz' ? 'bg-white text-purple-500' : 'bg-purple-400/50 hover:bg-purple-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trophy className="w-6 h-6" />
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 pb-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8 mt-4">
                <motion.h2 
                  className="text-white mb-2"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Choose an Animal to Learn! 🌟
                </motion.h2>
                <p className="text-purple-700">Tap on any animal to discover amazing facts and stories!</p>
              </div>
              <AnimalGrid onAnimalSelect={handleAnimalSelect} />
            </motion.div>
          )}

          {currentView === 'story' && selectedAnimal && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <AnimalStory animalId={selectedAnimal} onBack={handleBackToHome} />
            </motion.div>
          )}

          {currentView === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Quiz onBack={handleBackToHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating decorative elements */}
      <motion.div
        className="fixed bottom-10 right-10 text-6xl pointer-events-none hidden md:block"
        animate={{ 
          rotate: [0, 10, -10, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🦋
      </motion.div>
      <motion.div
        className="fixed top-32 left-10 text-5xl pointer-events-none hidden md:block"
        animate={{ 
          rotate: [0, -10, 10, 0],
          x: [0, -15, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌺
      </motion.div>
    </div>
  );
}
