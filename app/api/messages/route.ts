import { NextRequest, NextResponse } from "next/server";

// In-memory storage (in production, use a database)
const messages = new Map<
  string,
  { message: string; partner: string; sender: string }
>();

// Generate a short random ID
function generateShortId(): string {
  return Math.random().toString(36).substring(2, 8);
}

export async function POST(request: NextRequest) {
  try {
    const { message, partner, sender } = await request.json();

    // Generate a unique short ID
    let id = generateShortId();
    while (messages.has(id)) {
      id = generateShortId();
    }

    // Store the message
    messages.set(id, { message, partner, sender });

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error storing message:", error);
    return NextResponse.json(
      { error: "Failed to store message" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 },
      );
    }

    const data = messages.get(id);

    if (!data) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving message:", error);
    return NextResponse.json(
      { error: "Failed to retrieve message" },
      { status: 500 },
    );
  }
}
