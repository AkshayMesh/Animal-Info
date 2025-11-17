import { motion } from 'motion/react';

const animals = [
  { id: 'tiger', name: 'Tiger', emoji: '🐯', color: 'from-orange-400 to-red-500' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', color: 'from-gray-400 to-gray-600' },
  { id: 'lion', name: 'Lion', emoji: '🦁', color: 'from-yellow-400 to-orange-500' },
  { id: 'panda', name: 'Panda', emoji: '🐼', color: 'from-gray-700 to-black' },
  { id: 'giraffe', name: 'Giraffe', emoji: '🦒', color: 'from-yellow-300 to-amber-600' },
  { id: 'dolphin', name: 'Dolphin', emoji: '🐬', color: 'from-blue-400 to-cyan-600' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧', color: 'from-blue-300 to-indigo-500' },
  { id: 'monkey', name: 'Monkey', emoji: '🐵', color: 'from-amber-600 to-brown-700' },
];

interface AnimalGridProps {
  onAnimalSelect: (animalId: string) => void;
}

export function AnimalGrid({ onAnimalSelect }: AnimalGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {animals.map((animal, index) => (
        <motion.button
          key={animal.id}
          onClick={() => onAnimalSelect(animal.id)}
          className={`bg-gradient-to-br ${animal.color} rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow text-white relative overflow-hidden group`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Sparkle effect */}
          <motion.div
            className="absolute top-2 right-2 text-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>

          <div className="text-6xl md:text-7xl mb-3 transform group-hover:scale-110 transition-transform">
            {animal.emoji}
          </div>
          <div className="text-white drop-shadow-lg">
            {animal.name}
          </div>

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-4 border-white opacity-0 group-hover:opacity-30"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}
