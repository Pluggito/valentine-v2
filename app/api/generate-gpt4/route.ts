import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { buildPrompt } from "@/lib/prompts";
import { ValentineData } from "@/lib/valentine-data";

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

    const response = await axios.request(options);
    const message = response.data.result || response.data.message || "";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("GPT-4 API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 },
    );
  }
}
