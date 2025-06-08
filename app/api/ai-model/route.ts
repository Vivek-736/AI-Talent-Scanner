import OpenAI from "openai";
import { PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { rolePosition, roleDescription, interviewDuration, type } = await req.json();
        const FINAL_PROMPT = PROMPT
        .replace("{{rolePosition}}", rolePosition)
        .replace("{{roleDescription}}", roleDescription)
        .replace("{{interviewDuration}}", interviewDuration)
        .replace("{{type}}", type);

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY
        });

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ]
        });

        return NextResponse.json(completion.choices[0].message);
    } catch (e) {
        return NextResponse.json(e);
    }
}