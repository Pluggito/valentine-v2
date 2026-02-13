"use client";

import axios from "axios";

export default function Gpt4() {
  const fetchMessage = async () => {
    const options = {
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/gpt4",
      headers: {
        "x-rapidapi-key": "04082f6d57msh8052ff38a951369p10d90ajsnc7390354caf8",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "user",
            content: "hi",
          },
        ],
        web_access: false,
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
