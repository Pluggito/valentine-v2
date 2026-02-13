"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { generateValentineMessage } from "@/lib/message-genrator";
import MessageOutput from "@/components/message-output";
import BunnyBackground from "@/components/bunny-background";

export default function MessagePage() {
  const params = useParams();
  const encodedParams = params.params as string;

  // Decode the URL parameter
  let formData;
  let message = "";

  try {
    const decodedString = atob(encodedParams);
    formData = JSON.parse(decodedString);
    message = generateValentineMessage(formData);
  } catch (error) {
    // Invalid URL parameter
    return (
      <main
        className="relative min-h-screen overflow-hidden px-4 md:px-10 flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
        }}
      >
        <BunnyBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            Oops! Invalid Link 💔
          </h1>
          <p className="text-gray-700 mb-6">
            This Valentine message link seems to be broken.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all"
          >
            Create Your Own Message
          </a>
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 md:px-10 flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(to right, #fce7f3, #fee2e2, #fce7f3)",
      }}
    >
      <BunnyBackground />

      <div className="relative z-10 w-full max-w-md">
        <MessageOutput message={message} />
      </div>
    </main>
  );
}
