import { NextRequest, NextResponse } from "next/server";
import { processChat } from "@/lib/ai/chat-engine";
import { ChatMessage } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang (max 5.000 karakter)" },
        { status: 400 }
      );
    }

    const chatHistory: ChatMessage[] = Array.isArray(messages) ? messages : [];
    const response = await processChat(chatHistory, message);

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gagal memproses pesan. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
