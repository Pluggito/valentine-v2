"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ValentineMenuButton from "./valentine-button";
import Welcome from "./welcome-text";
import { ValentineData } from "@/lib/valentine-data";
import { getApiEndpoint } from "@/lib/prompts";

export default function Home() {
  const [nextPage, setNextPage] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [shipType, setShipType] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessageTypeModal, setShowMessageTypeModal] = useState(false);
  const [showFantasyRawModal, setShowFantasyRawModal] = useState(false);
  const [fantasyOrRaw, setFantasyOrRaw] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleNextPage = () => {
    if (nextPage === 2 && !name.trim()) return;
    if (nextPage === 3 && !partnerName.trim()) return;
    if (nextPage === 4 && !shipType) return;

    // After ship type is selected, show message type modal
    if (nextPage === 4 && shipType && !messageType) {
      setShowMessageTypeModal(true);
      return;
    }

    setIsClicked(false);
    setNextPage(nextPage + 1);
  };

  const handleBackToMenu = () => {
    setNextPage(nextPage - 1);
  };

  const handleReset = () => {
    setNextPage(1);
    setIsClicked(false);
    setName("");
    setPartnerName("");
    setShipType("");
    setMessageType("");
    setFantasyOrRaw("");
    setShowMessageTypeModal(false);
    setShowFantasyRawModal(false);
    setIsGenerating(false);
  };

  const handleGenerateMessage = async () => {
    setIsGenerating(true);

    const valentineData: ValentineData = {
      name,
      partnerName,
      shipType: shipType as ValentineData["shipType"],
      messageType: messageType as ValentineData["messageType"],
      fantasyOrRaw: fantasyOrRaw as ValentineData["fantasyOrRaw"],
    };

    try {
      const endpoint = getApiEndpoint(valentineData.messageType);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valentineData),
      });

      const data = await response.json();

      if (data.message) {
        // Store message via API to get a short ID
        const storeResponse = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: data.message,
            partner: partnerName,
            sender: name,
          }),
        });

        const storeData = await storeResponse.json();

        // Navigate with just the short ID
        router.push(`/message?id=${storeData.id}&from=creator`);
      } else {
        alert("Failed to generate message. Please try again.");
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error generating message:", error);
      alert("An error occurred. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleMessageTypeChoice = (choice: string) => {
    setMessageType(choice);
    setShowMessageTypeModal(false);

    // Check if we need to show fantasy/raw modal
    if (
      choice === "unhinged" &&
      (shipType === "crush" ||
        shipType === "relationship" ||
        shipType === "situationship")
    ) {
      setTimeout(() => {
        setShowFantasyRawModal(true);
      }, 300);
    } else {
      // Proceed to next page
      setTimeout(() => {
        setNextPage(nextPage + 1);
      }, 300);
    }
  };

  const handleFantasyRawChoice = (choice: string) => {
    setFantasyOrRaw(choice);
    setShowFantasyRawModal(false);
    // After modal choice, proceed to next page
    setTimeout(() => {
      setNextPage(nextPage + 1);
    }, 300);
  };

  useEffect(() => {
    const heartEmojis = ["❤️", "💕", "💖", "💗", "💓", "💝", "💘"];
    let lastTime = 0;
    const throttleDelay = 50;

    const createHeart = (x: number, y: number) => {
      const heart = document.createElement("div");
      heart.className = "heart-particle";
      heart.textContent =
        heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 30;

      heart.style.left = x + offsetX + "px";
      heart.style.top = y + offsetY + "px";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > throttleDelay) {
        createHeart(e.clientX, e.clientY);
        lastTime = currentTime;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > throttleDelay) {
        const touch = e.touches[0];
        createHeart(touch.clientX, touch.clientY);
        lastTime = currentTime;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      createHeart(touch.clientX, touch.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createHeart(e.clientX, e.clientY);
        }, i * 100);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const shipTypes = [
    { value: "crush", label: "Crush", emoji: "😍" },
    { value: "relationship", label: "Relationship", emoji: "💑" },
    { value: "situationship", label: "Situationship", emoji: "🤷‍♀️" },
    { value: "brozone", label: "Brozone", emoji: "🤝" },
  ];

  const messageTypes = [
    {
      value: "safe",
      label: "Safe",
      emoji: "😊",
      description: "Sweet & wholesome",
    },
    {
      value: "medium",
      label: "Medium",
      emoji: "😏",
      description: "A little spicy",
    },
    {
      value: "unhinged",
      label: "Unhinged",
      emoji: "🔥",
      description: "No holds barred",
    },
  ];

  return (
    <>
      <style jsx global>{`
        .heart-particle {
          position: fixed;
          pointer-events: none;
          font-size: 20px;
          animation: float-up 3s ease-out forwards;
          z-index: 1;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg) scale(0.5);
          }
        }
      `}</style>

      <main
        className="flex items-center justify-center min-h-screen relative"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
        }}
      >
        {/* MESSAGE TYPE MODAL */}
        <AnimatePresence>
          {showMessageTypeModal && (
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMessageTypeModal(false)}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink-300"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-4xl font-bold text-pink-600 mb-2 font-[Dancing Script] text-center">
                  Choose Your Message Style 💌
                </h3>
                <p className="text-center text-pink-800 mb-6">
                  How bold should your message be?
                </p>

                <div className="space-y-3">
                  {messageTypes.map((msg) => (
                    <button
                      key={msg.value}
                      onClick={() => handleMessageTypeChoice(msg.value)}
                      className="w-full p-4 bg-pink-100 hover:bg-pink-200 border-2 border-pink-300 hover:border-pink-400 rounded-xl transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-pink-700">
                            {msg.emoji} {msg.label}
                          </div>
                          <div className="text-sm text-pink-600">
                            {msg.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowMessageTypeModal(false)}
                  className="mt-6 w-full text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FANTASY OR RAW MODAL */}
        <AnimatePresence>
          {showFantasyRawModal && (
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFantasyRawModal(false)}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink-300"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold text-pink-600 mb-4 font-[Dancing Script] text-center">
                  Choose Your Vibe 🔥
                </h3>
                <p className="text-center text-pink-800 mb-6">
                  How unhinged should we go?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handleFantasyRawChoice("fantasy")}
                    className="w-full p-4 bg-pink-100 hover:bg-pink-200 border-2 border-pink-300 hover:border-pink-400 rounded-xl transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-pink-700">
                          ✨ Fantasy
                        </div>
                        <div className="text-sm text-pink-600">
                          Romantic & dreamy
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleFantasyRawChoice("raw")}
                    className="w-full p-4 bg-red-100 hover:bg-red-200 border-2 border-red-300 hover:border-red-400 rounded-xl transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-red-700">
                          🔥 Raw
                        </div>
                        <div className="text-sm text-red-600">
                          Direct & intense
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => setShowFantasyRawModal(false)}
                  className="mt-6 w-full text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PAGE 1 */}
        {nextPage === 1 && (
          <section className="w-full max-w-4xl px-6">
            <div className="flex flex-col items-center justify-center">
              <Welcome />
              <motion.h1
                className="text-6xl font-bold text-pink-600 mb-10 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Welcome to Pluggito Valentine&apos;s Special
              </motion.h1>
              <ValentineMenuButton
                text={"Explore Love"}
                onClick={handleNextPage}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
              />
            </div>
          </section>
        )}

        {/* PAGE 2 */}
        {nextPage === 2 && (
          <section className="w-full max-w-2xl px-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-8 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                What&apos;s your name?
              </motion.h2>

              <motion.div
                className="w-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  placeholder="Enter your name"
                  value={name}
                  className="w-full p-4 rounded-lg bg-white/50 backdrop-blur-sm text-pink-900 placeholder-pink-400 border-2 border-pink-300 hover:border-pink-400 focus:border-pink-500 shadow-lg focus:outline-none text-lg font-medium transition-all"
                  autoComplete="off"
                  required
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && name.trim()) {
                      handleNextPage();
                    }
                  }}
                  name="Username"
                  autoFocus
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-xs sm:w-md flex justify-center items-center"
              >
                <ValentineMenuButton
                  text={"Proceed"}
                  onClick={handleNextPage}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* PAGE 3 */}
        {nextPage === 3 && (
          <section className="w-full max-w-2xl px-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-4 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hello, {name}! 💕
              </motion.h2>
              <motion.h3
                className="text-3xl font-bold text-black mb-8 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Enter your partner&apos;s name
              </motion.h3>

              <motion.div
                className="w-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  placeholder="Enter your partner's name"
                  value={partnerName}
                  className="w-full p-4 rounded-lg bg-white/50 backdrop-blur-sm text-pink-900 placeholder-pink-400 border-2 border-pink-300 hover:border-pink-400 focus:border-pink-500 shadow-lg focus:outline-none text-lg font-medium transition-all"
                  autoComplete="off"
                  required
                  onChange={(e) => setPartnerName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && partnerName.trim()) {
                      handleNextPage();
                    }
                  }}
                  name="PartnerName"
                  autoFocus
                />
              </motion.div>

              <motion.div
                className="flex justify-center items-center gap-4 mt-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button
                  onClick={handleBackToMenu}
                  className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-medium"
                >
                  Back
                </button>
                <ValentineMenuButton
                  text={"Proceed"}
                  onClick={handleNextPage}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* PAGE 4 - SHIP TYPE SELECTOR */}
        {nextPage === 4 && (
          <section className="w-full max-w-3xl px-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-2 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Alright, {name}! 💕
              </motion.h2>
              <motion.h3
                className="text-3xl font-bold text-black mb-8 font-[Dancing Script] text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                What&apos;s the vibe with {partnerName}?
              </motion.h3>

              {/* SHIP TYPE SELECTOR */}
              <motion.div
                className="w-full mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-xl font-bold text-pink-700 mb-4 text-center">
                  Choose Your Ship Type
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {shipTypes.map((ship, index) => (
                    <motion.button
                      key={ship.value}
                      onClick={() => setShipType(ship.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        shipType === ship.value
                          ? "bg-pink-200 border-pink-500 shadow-lg"
                          : "bg-white/50 border-pink-300 hover:border-pink-400 hover:bg-pink-100"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-3xl mb-1">{ship.emoji}</div>
                      <div className="text-lg font-bold text-pink-800">
                        {ship.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* NAVIGATION BUTTONS */}
              <motion.div
                className="flex justify-center items-center gap-4 mt-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <button
                  onClick={handleBackToMenu}
                  className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-medium"
                >
                  Back
                </button>
                <ValentineMenuButton
                  text={"Continue"}
                  onClick={handleNextPage}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* PAGE 5 - SUMMARY & GENERATE */}
        {nextPage === 5 && !isGenerating && (
          <section className="w-full max-w-4xl px-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl font-bold text-pink-600 mb-6 font-[Dancing Script]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your Message is Ready! 💌
              </motion.h1>
              <motion.div
                className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border-2 border-pink-300 mb-6 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-lg">
                  <strong>For:</strong> {partnerName}
                </p>
                <p className="text-lg">
                  <strong>Ship:</strong> {shipType}
                </p>
                <p className="text-lg">
                  <strong>Boldness:</strong> {messageType}
                </p>
                {fantasyOrRaw && (
                  <p className="text-lg">
                    <strong>Style:</strong> {fantasyOrRaw}
                  </p>
                )}
              </motion.div>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button
                  onClick={handleBackToMenu}
                  className="px-6 py-3 bg-white border-2 border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition-all font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateMessage}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  Generate Message ✨
                </button>
              </motion.div>
            </motion.div>
          </section>
        )}

        {/* LOADING STATE */}
        {isGenerating && (
          <section className="w-full max-w-4xl px-6">
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💌
              </motion.div>
              <h2 className="text-4xl font-bold text-pink-600 mb-4 font-[Dancing Script]">
                Generating Your Message...
              </h2>
              <p className="text-lg text-pink-700 mb-8">
                Crafting the perfect words for {partnerName} ✨
              </p>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-pink-500 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </main>
    </>
  );
}
