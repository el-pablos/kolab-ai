import { NextRequest } from "next/server";
import { parseBrief } from "@/lib/ai/brief-parser";
import { apiErrorResponse, apiSuccessResponse } from "@/lib/ai/utils";

// ============================================
// POST /api/ai/brief-parser
// Parse raw campaign brief text into structured data
// ============================================

/** Maximum brief text length in characters */
const MAX_BRIEF_LENGTH = 10000;

/** Minimum brief text length for meaningful parsing */
const MIN_BRIEF_LENGTH = 20;

/**
 * Brief parser endpoint — accepts raw brief text,
 * returns AI-parsed structured campaign brief.
 *
 * @param request - NextRequest with JSON body { brief: string }
 * @returns JSON response with { success: true, data: { result: ParsedBrief } }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return apiErrorResponse("Request body harus valid JSON", 400);
    }

    const { brief } = body as Record<string, unknown>;

    // Validate brief field
    if (!brief || typeof brief !== "string") {
      return apiErrorResponse("Field 'brief' wajib diisi (string)", 400);
    }

    const trimmedBrief = brief.trim();

    if (trimmedBrief.length < MIN_BRIEF_LENGTH) {
      return apiErrorResponse(
        `Brief terlalu pendek (min ${MIN_BRIEF_LENGTH} karakter). Berikan deskripsi campaign yang lebih detail.`,
        400
      );
    }

    if (trimmedBrief.length > MAX_BRIEF_LENGTH) {
      return apiErrorResponse(
        `Brief terlalu panjang (max ${MAX_BRIEF_LENGTH.toLocaleString()} karakter)`,
        400
      );
    }

    const result = await parseBrief(trimmedBrief);

    // Cache parsed briefs for 5 minutes (same brief = same result)
    return apiSuccessResponse({ result }, 300);
  } catch (error) {
    return apiErrorResponse(
      "Gagal menganalisis brief. Silakan coba lagi.",
      500,
      error
    );
  }
}
