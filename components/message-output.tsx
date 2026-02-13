"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Link2, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface MessageOutputProps {
  message: string;
}

export default function MessageOutput({ message }: MessageOutputProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleStartOver = () => {
    router.push("/");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-pink-600">
          Your Message 💌
        </h1>
        <p className="text-gray-700 text-lg">Ready to send? 😏</p>
      </motion.div>

      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </motion.div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={handleCopyMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 text-base font-semibold rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>✓ Copied!</>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy
              </>
            )}
          </motion.button>
          <motion.button
            onClick={handleCopyLink}
            className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 text-base font-semibold rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {linkCopied ? (
              <>✓ Link Copied!</>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                Copy Link
              </>
            )}
          </motion.button>
        </div>

        <motion.button
          onClick={handleStartOver}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 text-base font-semibold rounded-full transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5 animate-heartbeat" fill="white" />
          Start Over
        </motion.button>
      </motion.div>
    </div>
  );
}
