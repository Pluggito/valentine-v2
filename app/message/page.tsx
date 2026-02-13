"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Share2, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function MessagePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isCreator = searchParams.get("from") === "creator";
  const [showMessage, setShowMessage] = useState(isCreator);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [partnerName, setPartnerName] = useState("Your Valentine");
  const [senderName, setSenderName] = useState("Someone Special");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      if (typeof window === "undefined") return;

      const messageId = searchParams.get("id");
      if (!messageId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch message from API
        const response = await fetch(`/api/messages?id=${messageId}`);
        const data = await response.json();

        if (data.message) {
          setMessage(data.message);
          setPartnerName(data.partner);
          setSenderName(data.sender);
        }

        // Create short shareable URL
        const url = new URL(window.location.href);
        url.searchParams.delete("from");
        setShareUrl(url.toString());
      } catch (error) {
        console.error("Failed to load message:", error);
        setMessage("Unable to load message");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [searchParams]);

  const handleStartOver = () => {
    router.push("/");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    alert("Message copied to clipboard!");
  };

  if (loading) {
    return (
      <main
        className="flex items-center justify-center min-h-screen p-6"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">💌</div>
          <p className="text-xl text-pink-600">Loading your message...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
      }}
    >
      <AnimatePresence mode="wait">
        {!showMessage ? (
          // WELCOME SCREEN
          <motion.div
            key="welcome"
            className="w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-2 border-pink-300 text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💌
              </motion.div>

              <h1 className="text-5xl font-bold text-pink-600 mb-4 font-[Dancing Script]">
                {senderName} has a surprise for you! 💕
              </h1>

              <p className="text-xl text-pink-700 mb-8">
                They've crafted something special just for you...
              </p>

              <button
                onClick={() => setShowMessage(true)}
                className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Tap to Check It Out ✨
              </button>
            </div>
          </motion.div>
        ) : (
          // MESSAGE SCREEN
          <motion.div
            key="message"
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Email Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6" fill="white" />
                  <h1 className="text-2xl font-bold">Valentine's Message</h1>
                </div>
                <div className="text-sm opacity-90">
                  From: {senderName} &lt;love@valentine.com&gt;
                </div>
                <div className="text-sm opacity-90">
                  To: {partnerName} &lt;sweetheart@valentine.com&gt;
                </div>
              </div>

              {/* Email Body */}
              <div className="p-8">
                <motion.div
                  className="prose prose-pink max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                    {message || "Your message will appear here..."}
                  </div>
                </motion.div>

                {/* Signature */}
                <motion.div
                  className="mt-8 pt-6 border-t border-pink-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p className="text-pink-600 font-semibold text-lg">
                    With love,
                    <br />
                    {senderName} 💕
                  </p>
                </motion.div>

                {/* Share Section */}
                <motion.div
                  className="mt-8 pt-6 border-t border-pink-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="w-5 h-5 text-pink-600" />
                    <h3 className="text-lg font-bold text-pink-700">
                      Share This Message
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-xl border-2 border-pink-300 shadow-md">
                      <QRCodeSVG
                        value={shareUrl}
                        size={150}
                        level="H"
                        includeMargin={true}
                      />
                      <p className="text-xs text-center text-pink-600 mt-2">
                        Scan to view
                      </p>
                    </div>

                    {/* Share Link */}
                    <div className="flex-1 w-full">
                      <p className="text-sm text-gray-600 mb-2">
                        Share this link with {partnerName}:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={shareUrl}
                          readOnly
                          className="flex-1 px-4 py-2 bg-gray-50 border-2 border-pink-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-pink-400"
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all flex items-center gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 p-6 flex justify-between items-center border-t border-gray-200">
                <button
                  onClick={handleStartOver}
                  className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Start Over
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="px-6 py-3 bg-white border-2 border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition-all font-medium"
                >
                  Copy Message
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
