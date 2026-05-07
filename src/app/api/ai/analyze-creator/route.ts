import { NextRequest } from "next/server";
import { analyzeCreatorFromURL, isValidSocialURL } from "@/lib/ai/creator-analyzer";
import { apiErrorResponse, apiSuccessResponse } from "@/lib/ai/utils";

const MAX_URL_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return apiErrorResponse("Request body harus valid JSON", 400);
    }

    const { url } = body as Record<string, unknown>;

    if (!url || typeof url !== "string") {
      return apiErrorResponse("Field 'url' wajib diisi (string)", 400);
    }

    const trimmedUrl = url.trim();

    if (trimmedUrl.length > MAX_URL_LENGTH) {
      return apiErrorResponse(`URL terlalu panjang (max ${MAX_URL_LENGTH} karakter)`, 400);
    }

    if (!isValidSocialURL(trimmedUrl)) {
      return apiErrorResponse(
        "URL tidak valid. Gunakan URL dari TikTok, Instagram, atau YouTube.",
        400
      );
    }

    const creator = await analyzeCreatorFromURL(trimmedUrl);

    return apiSuccessResponse({ creator }, 60);
  } catch (error) {
    return apiErrorResponse(
      "Gagal menganalisis profil creator. Silakan coba lagi.",
      500,
      error
    );
  }
}
