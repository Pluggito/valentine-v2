"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Happy Valentines",
  "Hello",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "こんにちは",
  "안녕하세요",
  "你好",
  "Привет",
  "Olá",
];

const Welcome = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-1 bg-inherit overflow-hidden flex-col gap-3">
      <div>
        <AnimatePresence mode="wait">
          <motion.h1
            key={messages[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="text-white text-6xl font-semibold "
          >
            {messages[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Welcome;
