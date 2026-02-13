"use client";

import axios from "axios";

export default function Gpt4() {
  const fetchMessage = async () => {
    const options = {
      method: "POST",
      // url: "https://chatgpt-42.p.rapidapi.com/gpt4",
      // url: "https://chatgpt-42.p.rapidapi.com/chatgpt",
      url: "https://chat-gpt26.p.rapidapi.com/",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        //"x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "'x-rapidapi-host": "chat-gpt26.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        model: "GPT-5-mini",
        messages: [
          {
            role: "user",
            content: "hi",
          },
        ],
        // web_access: false,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={fetchMessage}
        className="bg-blue-500 text-white p-2 rounded cursor-pointer"
      >
        Generate
      </button>
    </div>
  );
}
