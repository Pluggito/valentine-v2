"use client";

import { motion } from "framer-motion";
// import ValentineForm from "@/components/valentine-form";
// import BunnyBackground from "@/components/bunny-background";
import ValentineMenuButton from "@/components/valentine-button";
import { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(true);

  const handleNextMenu = () => {};

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 md:px-10 flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
      }}
    >
      {/* Bunny Background  <BunnyBackground />*/}

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="space-y-2 animate-fade-in">
          {/*<motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pink-600">
              Valentine Message Generator 💌
            </h1>
            <p className="text-gray-700 text-lg">
              For your crush, lover… or your bro 😹
            </p>
          </motion.div>*/}

          <motion.h1
            className="text-4xl font-bold text-pink-600 mb-10 font-[Dancing Script] w-full mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to Pluggito Valentine&apos; Special
          </motion.h1>
          <div className="flex items-center justify-center">
            <ValentineMenuButton
              text={"Explore Love"}
              onClick={handleNextMenu}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          </div>

          {/* <ValentineForm /> */}
        </div>
      </div>
    </main>
  );
}
