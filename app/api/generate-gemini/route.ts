import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/lib/prompts";
import { ValentineData } from "@/lib/valentine-data";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
);

export async function POST(request: NextRequest) {
  try {
    const data: ValentineData = await request.json();

    // Validate that this is not an unhinged message (should use GPT-4 instead)
    if (data.messageType === "unhinged") {
      return NextResponse.json(
        { error: "Unhinged messages should use GPT-4 endpoint" },
        { status: 400 },
      );
    }

    // Build the prompt
    const prompt = buildPrompt(data);

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 },
    );
  }
}
