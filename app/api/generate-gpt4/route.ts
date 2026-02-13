import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { buildPrompt } from "@/lib/prompts";
import { ValentineData } from "@/lib/valentine-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const data: ValentineData = await request.json();

    // Validate that this is an unhinged message
    if (data.messageType !== "unhinged") {
      return NextResponse.json(
        { error: "Only unhinged messages should use GPT-4 endpoint" },
        { status: 400 },
      );
    }

    // Build the prompt
    const prompt = buildPrompt(data);

    // Call GPT-4 API via RapidAPI
    const options = {
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/gpt4",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        web_access: false,
      },
    };

    try {
      const response = await axios.request(options);
      const message = response.data.result || response.data.message || "";

      return NextResponse.json({ message });
    } catch (error: any) {
      const status = error?.response?.status;
      console.error("GPT-4 API Error:", error?.message || error);

      // If GPT-4 rate limited or server error, fall back to Gemini
      if (status === 429 || status === 500) {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const message = response.text();

          return NextResponse.json({ message, fallback: "gemini" });
        } catch (geminiError) {
          console.error("Gemini fallback error:", geminiError);
          return NextResponse.json(
            { error: "Failed to generate message with GPT-4 and Gemini fallback" },
            { status: 500 },
          );
        }
      }

      return NextResponse.json(
        { error: "Failed to generate message" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("GPT-4 handler error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 },
    );
  }
}
