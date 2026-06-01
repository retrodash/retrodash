import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const text: string = body?.text ?? "";
  const type: "card" | "action" = body?.type === "action" ? "action" : "card";

  if (!text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  if (text.trim().length > 500) {
    return NextResponse.json({ error: "Text too long" }, { status: 400 });
  }

  const prompt =
    type === "action"
      ? `You are a Scrum coach. Rewrite this retrospective action item to be specific, measurable, and start with a strong verb. Maximum 320 characters. Return only the rewritten text, no explanations, no quotes:\n\n${text}`
      : `You are a Scrum coach. Rewrite this retrospective card to be clear, concise, and constructive. Maximum 320 characters. Return only the rewritten text, no explanations, no quotes:\n\n${text}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    const improved = result.response.text().trim();
    return NextResponse.json({ improved });
  } catch (err) {
    console.error("[improve-text]", err);
    return NextResponse.json(
      { error: "Failed to improve text. Try again." },
      { status: 500 },
    );
  }
}
