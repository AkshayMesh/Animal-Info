import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trophy, Star, RotateCcw } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji: string;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Which animal is the largest land animal on Earth?",
    options: ["Lion 🦁", "Elephant 🐘", "Giraffe 🦒", "Tiger 🐯"],
    correctAnswer: 1,
    emoji: "🐘",
    explanation: "That's right! Elephants are the largest land animals. They can weigh up to 14,000 pounds!"
  },
  {
    question: "What makes each tiger unique?",
    options: ["Their roar 📢", "Their size 📏", "Their stripes 🎨", "Their tail 〰️"],
    correctAnswer: 2,
    emoji: "🐯",
    explanation: "Exactly! Every tiger has unique stripes, just like our fingerprints. No two tigers have the same pattern!"
  },
  {
    question: "How long can a giraffe's tongue be?",
    options: ["5 inches", "10 inches", "20 inches", "30 inches"],
    correctAnswer: 2,
    emoji: "🦒",
    explanation: "Amazing! A giraffe's tongue can be up to 20 inches long! It's purple-black to protect from sunburn!"
  },
  {
    question: "What do dolphins use to talk to each other?",
    options: ["Hand signals 👋", "Clicks and whistles 🗣️", "Dancing 💃", "Swimming patterns 🏊"],
    correctAnswer: 1,
    emoji: "🐬",
    explanation: "Perfect! Dolphins communicate using special clicks and whistles. Each dolphin even has its own special whistle - like a name!"
  },
  {
    question: "What do pandas eat for most of the day?",
    options: ["Fish 🐟", "Meat 🥩", "Bamboo 🎋", "Fruits 🍎"],
    correctAnswer: 2,
    emoji: "🐼",
    explanation: "You got it! Pandas munch on bamboo for about 12 hours a day. They can eat up to 40 pounds of bamboo daily!"
  },
  {
    question: "How do penguins propose to each other?",
    options: ["With a dance 💃", "With a fish 🐟", "With a pebble 🪨", "With a song 🎵"],
    correctAnswer: 2,
    emoji: "🐧",
    explanation: "Adorable! Male penguins find the perfect pebble and give it to the female they like. If she accepts, they become partners!"
  },
  {
    question: "What is a group of lions called?",
    options: ["A pack", "A pride 👨‍👩‍👧‍👦", "A herd", "A flock"],
    correctAnswer: 1,
    emoji: "🦁",
    explanation: "Correct! A group of lions is called a pride. Lions are the only cats that live in family groups!"
  },
  {
    question: "What special ability do monkeys have?",
    options: ["They can fly ✈️", "They can use tools 🔧", "They can breathe underwater 🌊", "They can change color 🎨"],
    correctAnswer: 1,
    emoji: "🐵",
    explanation: "Brilliant! Monkeys are super smart and can use tools. They can even recognize themselves in mirrors!"
  }
];

interface QuizProps {
  onBack: () => void;
}

export function Quiz({ onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const getMessage = () => {
      if (percentage === 100) return { text: "Perfect Score! You're an Animal Expert! 🏆", emoji: "🎉" };
      if (percentage >= 75) return { text: "Amazing Job! You know so much! 🌟", emoji: "⭐" };
      if (percentage >= 50) return { text: "Great Work! Keep Learning! 💪", emoji: "👏" };
      return { text: "Good Try! Practice Makes Perfect! 🌈", emoji: "💝" };
    };

    const message = getMessage();

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <motion.button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Animals</span>
        </motion.button>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
            }}
          >
            {message.emoji}
          </motion.div>

          <motion.h2
            className="text-purple-600 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message.text}
          </motion.h2>

          <motion.div
            className="text-6xl mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <span className="text-purple-600">{score}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-600">{questions.length}</span>
          </motion.div>

          <motion.p
            className="text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            You scored {percentage}%! 🎯
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </motion.button>

            <motion.button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Learn More About Animals
            </motion.button>
          </div>

          {/* Confetti animation for perfect score */}
          {percentage === 100 && (
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  initial={{ 
                    top: "50%", 
                    left: "50%",
                    opacity: 1,
                    scale: 0
                  }}
                  animate={{ 
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0,
                    scale: 1,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {['🎉', '⭐', '🌟', '✨', '🎊'][i % 5]}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
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

      {/* Progress Bar */}
      <div className="bg-white rounded-full p-2 shadow-lg mb-6">
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          {/* Question */}
          <div className="text-center mb-8">
            <motion.div
              className="text-7xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            >
              {question.emoji}
            </motion.div>
            <h3 className="text-purple-600 mb-2">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              const showCorrect = showResult && isCorrectAnswer;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 md:p-6 rounded-2xl text-left transition-all ${
                    showCorrect
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                      : showWrong
                      ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                      : isSelected
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100'
                  }`}
                  whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      showCorrect || showWrong
                        ? 'bg-white/30'
                        : 'bg-purple-200'
                    }`}>
                      {showCorrect ? '✓' : showWrong ? '✗' : index + 1}
                    </div>
                    <span className={`text-lg ${
                      showCorrect || showWrong || isSelected
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Result Message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-6 rounded-2xl mb-6 ${
                  isCorrect
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100'
                    : 'bg-gradient-to-r from-orange-100 to-yellow-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">
                    {isCorrect ? '🎉' : '💡'}
                  </div>
                  <div>
                    <h4 className={`mb-2 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                      {isCorrect ? 'Awesome! That\'s Correct! 🌟' : 'Oops! Not quite right! 🤔'}
                    </h4>
                    <p className="text-gray-700">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showResult && (
            <motion.button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results! 🏆'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Score Display */}
      <motion.div
        className="mt-6 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span className="text-gray-600">Score: </span>
        <span className="text-purple-600">{score} / {currentQuestion + (showResult ? 1 : 0)}</span>
      </motion.div>
    </motion.div>
  );
}
