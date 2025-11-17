import { motion } from 'motion/react';
import { ArrowLeft, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface AnimalData {
  id: string;
  name: string;
  emoji: string;
  story: string;
  facts: string[];
  funFact: string;
  images: string[];
  color: string;
}

const animalData: Record<string, AnimalData> = {
  tiger: {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐯',
    color: 'from-orange-400 to-red-500',
    story: "Meet Terry the Tiger! Terry lives in the thick forests of Asia. Every morning, Terry wakes up and stretches his big, powerful body. He has beautiful orange fur with black stripes - just like wearing a striped pajama suit! Terry loves to swim in rivers to cool off on hot days. Unlike most cats who don't like water, tigers are excellent swimmers! Terry is the biggest cat in the whole world, and he can run super fast when chasing his dinner.",
    facts: [
      "Tigers are the largest cats in the world! 🦁",
      "Each tiger has unique stripes, like fingerprints 🎨",
      "They can run up to 40 miles per hour! 💨",
      "Tigers love to swim and play in water 🏊",
      "A tiger's roar can be heard from 2 miles away! 📢"
    ],
    funFact: "Did you know? Tiger stripes are on their skin too, not just their fur! If you shaved a tiger, you would still see the stripes!",
    images: [
      "https://images.unsplash.com/photo-1727036752580-957404758267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWdlciUyMHdpbGRsaWZlfGVufDF8fHx8MTc2MzI3MTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  elephant: {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    color: 'from-gray-400 to-gray-600',
    story: "Say hello to Ellie the Elephant! Ellie is the biggest land animal on Earth. She uses her long trunk like a hand to pick up food, spray water, and even give hugs to her family! Ellie's trunk has over 40,000 muscles - that's a lot! She lives with her family in Africa, and they all take care of each other. Ellie loves to take mud baths to keep her skin cool and protected from the sun. She's very smart and never forgets her friends!",
    facts: [
      "Elephants are the largest land animals! 🌍",
      "Their trunks have over 40,000 muscles 💪",
      "They can live up to 70 years old! 🎂",
      "Elephants are excellent swimmers 🏊",
      "They communicate using low sounds we can't hear 🔊"
    ],
    funFact: "Elephants show emotions! They can feel happy, sad, and even cry real tears. They also hug with their trunks!",
    images: [
      "https://images.unsplash.com/photo-1634646297527-24f7f5e840a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHNhZmFyaXxlbnwxfHx8fDE3NjMzMjE1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  lion: {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    color: 'from-yellow-400 to-orange-500',
    story: "Roar! Meet Leo the Lion, the King of the Jungle! Well, actually Leo lives in the grasslands of Africa, not the jungle. Leo has a magnificent golden mane around his head that makes him look very royal. During the day, Leo likes to rest under shady trees - lions can sleep up to 20 hours a day! When the sun goes down, Leo becomes more active and goes hunting with his family. Lions are the only cats that live in groups called prides.",
    facts: [
      "Male lions have beautiful manes 👑",
      "They can sleep up to 20 hours a day! 😴",
      "Lions live in family groups called prides 👨‍👩‍👧‍👦",
      "Their roar can be heard 5 miles away! 📣",
      "Female lions do most of the hunting 🎯"
    ],
    funFact: "A lion's mane gets darker as they get older! The darker the mane, the healthier and stronger the lion is!",
    images: [
      "https://images.unsplash.com/photo-1719234523363-ce688024e93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwc2F2YW5uYXxlbnwxfHx8fDE3NjMzNjE2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  panda: {
    id: 'panda',
    name: 'Panda',
    emoji: '🐼',
    color: 'from-emerald-400 to-green-600',
    story: "Meet Penny the Panda! Penny lives high up in the bamboo forests of China. She has the cutest black and white fur - she looks like she's wearing a fancy tuxedo! Penny spends most of her day munching on bamboo. She can eat for 12 hours straight! Even though pandas look cuddly and cute, they're actually really good at climbing trees. When Penny was a baby, she was tiny - about the size of a stick of butter! Now she's all grown up and loves to tumble and play.",
    facts: [
      "Pandas eat bamboo for 12 hours a day! 🎋",
      "Baby pandas are super tiny at birth 👶",
      "They're excellent tree climbers! 🌳",
      "Pandas can eat up to 40 pounds of bamboo daily 🍽️",
      "They sometimes do somersaults for fun! 🤸"
    ],
    funFact: "Pandas love to do somersaults and play! Sometimes they roll down hills just for fun. They're nature's acrobats!",
    images: [
      "https://images.unsplash.com/photo-1581499415152-6fe2625cda28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5kYSUyMGJhbWJvb3xlbnwxfHx8fDE3NjMyOTE3OTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  giraffe: {
    id: 'giraffe',
    name: 'Giraffe',
    emoji: '🦒',
    color: 'from-yellow-300 to-amber-600',
    story: "Look up high! That's Gary the Giraffe! Gary is the tallest animal in the world. His long neck helps him reach the tastiest leaves at the top of tall trees. Gary's neck is so long, but it only has 7 bones in it - the same number as humans! Gary has a super long tongue (about 20 inches!) that he uses to grab leaves. His tongue is purple-black to protect it from sunburn! Gary's spots are like fingerprints - no two giraffes have the same pattern.",
    facts: [
      "Giraffes are the tallest animals on Earth! 📏",
      "Their tongues can be 20 inches long! 👅",
      "They only need 30 minutes of sleep per day 😴",
      "Each giraffe has a unique spot pattern 🎨",
      "Baby giraffes are 6 feet tall at birth! 📐"
    ],
    funFact: "Giraffes hum to each other at night! Scientists just discovered this recently. It's their way of saying goodnight!",
    images: [
      "https://images.unsplash.com/photo-1657298446502-30a2a27d413e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzYzMzIxNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  dolphin: {
    id: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    color: 'from-blue-400 to-cyan-600',
    story: "Splash! Here comes Danny the Dolphin! Danny lives in the ocean and is one of the smartest animals on the planet. He loves to jump out of the water and do flips in the air - it's like he's showing off his dance moves! Danny talks to his friends using special clicks and whistles. He's very friendly and sometimes helps other sea animals in trouble. Danny can swim really fast - up to 20 miles per hour! He sleeps with only half of his brain at a time so he can keep swimming.",
    facts: [
      "Dolphins are super smart animals! 🧠",
      "They talk using clicks and whistles 🗣️",
      "Dolphins sleep with one eye open! 👁️",
      "They can swim up to 20 mph! 🏊",
      "Dolphins have best friends they hang out with! 👯"
    ],
    funFact: "Dolphins give each other names! Each dolphin has its own special whistle that others use to call them - just like your name!",
    images: [
      "https://images.unsplash.com/photo-1440020143730-090579c4d53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2xwaGluJTIwb2NlYW58ZW58MXx8fHwxNzYzMzAwNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  penguin: {
    id: 'penguin',
    name: 'Penguin',
    emoji: '🐧',
    color: 'from-blue-300 to-indigo-500',
    story: "Waddle waddle! Meet Pete the Penguin! Pete lives in the cold, icy lands of Antarctica. He wears a natural tuxedo - black on his back and white on his belly. This helps him hide from predators! Pete is an amazing swimmer and can dive deep into the ocean to catch fish. On land, Pete walks with a funny waddle, but in the water, he's super fast and graceful! When it gets really cold, Pete huddles with thousands of other penguins to stay warm. They take turns being in the middle where it's warmest!",
    facts: [
      "Penguins can't fly, but they're amazing swimmers! 🏊",
      "They can dive over 1,800 feet deep! 🌊",
      "Emperor penguins can hold their breath for 20 minutes 😮",
      "They huddle together to stay warm in winter ❄️",
      "Penguins can drink saltwater! 💧"
    ],
    funFact: "Male penguins propose with pebbles! They find the perfect pebble and give it to the female they like. If she accepts it, they become partners!",
    images: [
      "https://images.unsplash.com/photo-1564861474034-33f0c586584b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwaWNlfGVufDF8fHx8MTc2MzM2MTY0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  },
  monkey: {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐵',
    color: 'from-amber-600 to-brown-700',
    story: "Ooh ooh ahh ahh! Meet Max the Monkey! Max lives in the tropical rainforests and loves to swing from tree to tree. He's super playful and curious about everything! Max uses his long tail like an extra arm to grab branches while he's swinging. He lives with his family in a big group called a troop. Monkeys are very smart - Max can use tools and even solve puzzles! His favorite foods are fruits, nuts, and leaves. Max loves to groom his friends and family - it's how monkeys show they care!",
    facts: [
      "Monkeys are super smart and can use tools! 🔧",
      "They live in groups called troops 👨‍👩‍👧‍👦",
      "Some monkeys can use their tails like a fifth hand! 🤚",
      "Monkeys groom each other to show friendship 💕",
      "They can recognize themselves in mirrors! 🪞"
    ],
    funFact: "Monkeys laugh when they're tickled! Scientists found that monkeys make a special 'laughing' sound when they play and get tickled!",
    images: [
      "https://images.unsplash.com/photo-1582653028125-53f35e894025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25rZXklMjBqdW5nbGV8ZW58MXx8fHwxNzYzMzIxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ]
  }
};

interface AnimalStoryProps {
  animalId: string;
  onBack: () => void;
}

export function AnimalStory({ animalId, onBack }: AnimalStoryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const animal = animalData[animalId];

  if (!animal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Animals</span>
      </motion.button>

      {/* Header */}
      <motion.div
        className={`bg-gradient-to-r ${animal.color} rounded-3xl p-8 text-white mb-6 shadow-xl`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="text-7xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
            }}
          >
            {animal.emoji}
          </motion.div>
          <div>
            <h2 className="text-white mb-2">The Amazing {animal.name}!</h2>
            <p className="text-white/90">Let's learn all about this wonderful animal! 🌟</p>
          </div>
        </div>
      </motion.div>

      {/* Main Image */}
      <motion.div
        className="mb-6 rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ImageWithFallback
          src={animal.images[currentImageIndex]}
          alt={animal.name}
          className="w-full h-64 md:h-96 object-cover"
        />
      </motion.div>

      {/* Story Section */}
      <motion.div
        className="bg-white rounded-3xl p-6 md:p-8 shadow-xl mb-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-purple-600 mb-4 flex items-center gap-2">
          📖 {animal.name}'s Story
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {animal.story}
        </p>
      </motion.div>

      {/* Fun Fact Highlight */}
      <motion.div
        className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl p-6 md:p-8 shadow-xl mb-6 text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-start gap-3">
          <Star className="w-8 h-8 flex-shrink-0 fill-yellow-300 text-yellow-300 mt-1" />
          <div>
            <h4 className="mb-2">Super Fun Fact!</h4>
            <p className="text-white/95 text-lg">
              {animal.funFact}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Facts Grid */}
      <motion.div
        className="bg-white rounded-3xl p-6 md:p-8 shadow-xl mb-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-purple-600 mb-6 flex items-center gap-2">
          ✨ Amazing Facts
        </h3>
        <div className="space-y-4">
          {animal.facts.map((fact, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <motion.div
                className="text-2xl flex-shrink-0"
                animate={{ 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {index === 0 ? '🌟' : index === 1 ? '💫' : index === 2 ? '⭐' : index === 3 ? '✨' : '🎯'}
              </motion.div>
              <p className="text-gray-700 text-lg flex-1">{fact}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-purple-700 text-lg mb-4">
          Want to test your knowledge? Try our fun quiz! 🎮
        </p>
        <motion.div
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-4xl"
        >
          👇
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
