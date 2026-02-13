"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UnhingedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "raw" | "fantasy") => void;
}

export default function UnhingedModal({
  isOpen,
  onClose,
  onSelect,
}: UnhingedModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <h2 className="text-3xl font-bold text-pink-600 text-center mb-2">
              Choose your flavor 👀
            </h2>
            <p className="text-center text-gray-600 text-base mb-8">
              Time to go all out! Pick your style:
            </p>

            <div className="space-y-4">
              <motion.button
                onClick={() => onSelect("raw")}
                className="w-full p-6 rounded-2xl bg-linear-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-bold text-xl mb-1">Raw</div>
                <div className="text-sm text-white/90">
                  Direct, intense, no holding back
                </div>
              </motion.button>

              <motion.button
                onClick={() => onSelect("fantasy")}
                className="w-full p-6 rounded-2xl bg-linear-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">📖</div>
                <div className="font-bold text-xl mb-1">Fantasy</div>
                <div className="text-sm text-white/90">
                  Poetic, dreamy, romance-novel vibes
                </div>
              </motion.button>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 text-gray-600 hover:text-gray-800 transition-colors text-base py-3 font-medium"
            >
              Nevermind, take me back
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
