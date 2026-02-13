"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import UnhingedModal from "@/components/unhinged-modal";

type Ship = "Crush" | "Lovers" | "Situationship" | "Brozone";
type Level = "safe" | "medium" | "unhinged";
type UnhingedMode = "raw" | "fantasy";

export default function ValentineForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [yourName, setYourName] = useState("");
  const [theirName, setTheirName] = useState("");
  const [ship, setShip] = useState<Ship | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [unhingedMode, setUnhingedMode] = useState<UnhingedMode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const ships: Array<{ value: Ship; emoji: string; label: string }> = [
    { value: "Crush", emoji: "😍", label: "Crush" },
    { value: "Lovers", emoji: "❤️", label: "Lover" },
    { value: "Situationship", emoji: "🤔", label: "Situationship" },
    { value: "Brozone", emoji: "😹", label: "Brozone" },
  ];

  const levels: Array<{
    value: Level;
    emoji: string;
    label: string;
    subtitle: string;
  }> = [
    { value: "safe", emoji: "😇", label: "Safe", subtitle: "(scared)" },
    {
      value: "medium",
      emoji: "🌶️",
      label: "Medium",
      subtitle: "(hmm spicy I see)",
    },
    {
      value: "unhinged",
      emoji: "🔥",
      label: "Unhinged",
      subtitle: "(you wanna go all out!!!)",
    },
  ];

  const getTotalSteps = () => {
    return ship === "Brozone" ? 3 : 4;
  };

  const handleShipSelect = (selectedShip: Ship) => {
    setShip(selectedShip);
    setLevel(null);
    setUnhingedMode(null);
  };

  const handleLevelSelect = (selectedLevel: Level) => {
    if (selectedLevel === "unhinged") {
      setLevel(selectedLevel);
      setShowModal(true);
    } else {
      setLevel(selectedLevel);
      setUnhingedMode(null);
    }
  };

  const handleUnhingedSelect = (mode: UnhingedMode) => {
    setUnhingedMode(mode);
    setShowModal(false);
  };

  const handleGenerate = () => {
    if (!yourName || !theirName || !ship) return;

    setIsGenerating(true);

    setTimeout(() => {
      const formData = {
        yourName,
        theirName,
        relationship: ship,
        boldness: ship === "Brozone" ? "safe" : level || "safe",
        unhingedType: unhingedMode || undefined,
      };

      // Encode form data to base64
      const encodedParams = btoa(JSON.stringify(formData));

      // Redirect to dynamic route
      router.push(`/message/${encodedParams}`);
      setIsGenerating(false);
    }, 500);
  };

  const canGoNext = () => {
    if (currentStep === 1) return yourName.trim() !== "";
    if (currentStep === 2) return ship !== null;
    if (currentStep === 3) return theirName.trim() !== "";
    if (currentStep === 4) {
      if (!level) return false;
      if (level === "unhinged" && !unhingedMode) return false;
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (!canGoNext()) return;

    if (currentStep === 3 && ship === "Brozone") {
      // Skip to generate for Brozone
      handleGenerate();
    } else if (currentStep < getTotalSteps()) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  return (
    <>
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: getTotalSteps() }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === currentStep
                  ? "w-8 bg-pink-500"
                  : index + 1 < currentStep
                    ? "w-2 bg-pink-400"
                    : "w-2 bg-pink-200"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {/* Step 1: Your Name */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="text-gray-800 font-semibold block text-xl">
                  What's your name? 👋
                </label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="e.g. John"
                  className="w-full px-4 py-3 rounded-xl bg-pink-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 2: Relationship Type */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="text-gray-800 font-semibold block text-xl">
                  What's the vibe? 🎯
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {ships.map((s, index) => (
                    <motion.button
                      key={s.value}
                      onClick={() => handleShipSelect(s.value)}
                      className={`p-4 rounded-xl transition-all duration-200 ${
                        ship === s.value
                          ? "bg-pink-500 text-white shadow-lg scale-105"
                          : "bg-pink-50 text-gray-800 hover:bg-pink-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-3xl mb-1">{s.emoji}</div>
                      <div className="font-semibold">{s.label}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Their Name */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="text-gray-800 font-semibold block text-xl">
                  What's their name? 💭
                </label>
                <input
                  type="text"
                  value={theirName}
                  onChange={(e) => setTheirName(e.target.value)}
                  placeholder="e.g. Amara"
                  className="w-full px-4 py-3 rounded-xl bg-pink-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm"
                  autoFocus
                />
              </motion.div>
            )}

            {/* Step 4: Message Level - Only show if NOT Brozone */}
            {currentStep === 4 && ship !== "Brozone" && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <label className="text-gray-800 font-semibold block text-xl">
                  How do you want the message? 😏
                </label>
                <div className="space-y-2">
                  {levels.map((l, index) => (
                    <motion.button
                      key={l.value}
                      onClick={() => handleLevelSelect(l.value)}
                      className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                        level === l.value
                          ? "bg-pink-500 text-white shadow-lg"
                          : "bg-pink-50 text-gray-800 hover:bg-pink-100"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-2xl">{l.emoji}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{l.label}</div>
                        <div
                          className={`text-sm ${level === l.value ? "text-pink-100" : "text-gray-600"}`}
                        >
                          {l.subtitle}
                        </div>
                      </div>
                      {level === l.value &&
                        l.value === "unhinged" &&
                        unhingedMode && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white text-pink-500 font-semibold">
                            {unhingedMode === "raw" ? "Raw 🔥" : "Fantasy 📖"}
                          </span>
                        )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {currentStep > 1 && (
            <motion.button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </motion.button>
          )}

          <motion.button
            onClick={handleNext}
            disabled={!canGoNext() || isGenerating}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full transition-all font-semibold text-lg shadow-lg ${
              !canGoNext() || isGenerating
                ? "bg-pink-300 text-white cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
            whileHover={canGoNext() && !isGenerating ? { scale: 1.05 } : {}}
            whileTap={canGoNext() && !isGenerating ? { scale: 0.95 } : {}}
          >
            {isGenerating ? (
              <Heart className="w-6 h-6 animate-heartbeat" fill="white" />
            ) : currentStep === getTotalSteps() ||
              (currentStep === 3 && ship === "Brozone") ? (
              <>
                <Heart className="w-6 h-6" />
                Generate Message 💘
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Unhinged Modal */}
      <UnhingedModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setLevel(null);
        }}
        onSelect={handleUnhingedSelect}
      />
    </>
  );
}
