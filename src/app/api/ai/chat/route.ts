import { NextRequest } from "next/server";
import { processChat } from "@/lib/ai/chat-engine";
import { ChatMessage } from "@/types";
import { apiErrorResponse, apiSuccessResponse } from "@/lib/ai/utils";

// ============================================
// POST /api/ai/chat
// Process a chat message and return AI response
// ============================================

/** Maximum allowed message length in characters */
const MAX_MESSAGE_LENGTH = 5000;

/** Maximum number of history messages accepted */
const MAX_HISTORY_LENGTH = 50;

/**
 * Chat endpoint — accepts user message + conversation history,
 * returns AI-generated response from KOLab AI assistant.
 *
 * @param request - NextRequest with JSON body { message: string, messages?: ChatMessage[] }
 * @returns JSON response with { success: true, data: { response: string } }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body with error handling for malformed JSON
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return apiErrorResponse("Request body harus valid JSON", 400);
    }

    // Type-safe body extraction
    const { messages, message } = body as Record<string, unknown>;

    // Validate message field
    if (!message || typeof message !== "string") {
      return apiErrorResponse("Field 'message' wajib diisi (string)", 400);
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return apiErrorResponse("Pesan tidak boleh kosong", 400);
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return apiErrorResponse(
        `Pesan terlalu panjang (max ${MAX_MESSAGE_LENGTH.toLocaleString()} karakter)`,
        400
      );
    }

    // Validate messages history array
    let chatHistory: ChatMessage[] = [];
    if (messages !== undefined) {
      if (!Array.isArray(messages)) {
        return apiErrorResponse("Field 'messages' harus berupa array", 400);
      }
      // Truncate excessive history
      chatHistory = messages.slice(-MAX_HISTORY_LENGTH) as ChatMessage[];
    }

    const response = await processChat(chatHistory, trimmedMessage);

    return apiSuccessResponse({ response });
  } catch (error) {
    return apiErrorResponse(
      "Gagal memproses pesan. Silakan coba lagi.",
      500,
      error
    );
  }
}
