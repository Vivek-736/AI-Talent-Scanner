'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-100 to-white opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          style={{
            left: mousePosition.x + Math.cos(i) * 100,
            top: mousePosition.y + Math.sin(i) * 100,
          }}
          variants={particleVariants}
          animate="animate"
        />
      ))}

      <motion.div
        className="text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-9xl font-bold text-purple-600 tracking-tight"
          variants={textVariants}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-4xl font-semibold text-black mt-4"
          variants={textVariants}
        >
          Page Not Found
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 mt-4 max-w-md mx-auto"
          variants={textVariants}
        >
          Oops! It seems like you&apos;re lost in the digital void. Let&apos;s get you back
          to reality.
        </motion.p>
        <motion.a
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
          variants={textVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return Home
        </motion.a>
      </motion.div>
      <motion.div
        className="absolute inset-0 border-4 border-purple-600 rounded-3xl"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}