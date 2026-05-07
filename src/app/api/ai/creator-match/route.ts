import { NextRequest } from "next/server";
import { matchCreators, searchCreators } from "@/lib/ai/creator-matcher";
import { ParsedBrief } from "@/types";
import { apiErrorResponse, apiSuccessResponse } from "@/lib/ai/utils";

// ============================================
// POST /api/ai/creator-match
// Match creators to brief OR search by natural language query
// ============================================

/** Maximum search query length */
const MAX_QUERY_LENGTH = 1000;

/**
 * Creator matching endpoint — supports two modes:
 *
 * 1. **Brief mode**: Pass `brief` (ParsedBrief) to get ranked creator matches
 * 2. **Search mode**: Pass `query` (string) for semantic creator search
 *
 * @param request - NextRequest with JSON body { brief?: ParsedBrief, query?: string }
 * @returns JSON response with { success: true, data: { results: MatchResult[] } }
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

    const { brief, query } = body as Record<string, unknown>;

    // Mode 1: Match berdasarkan parsed brief
    if (brief && typeof brief === "object") {
      // Basic structural validation of brief object
      const parsedBrief = brief as ParsedBrief;
      if (!parsedBrief.title || !parsedBrief.targetAudience || !parsedBrief.keywords) {
        return apiErrorResponse(
          "Brief tidak valid. Pastikan memiliki field: title, targetAudience, keywords",
          400
        );
      }

      const results = await matchCreators(parsedBrief);
      // Cache match results for 2 minutes
      return apiSuccessResponse({ results }, 120);
    }

    // Mode 2: Semantic search berdasarkan query
    if (query !== undefined) {
      if (typeof query !== "string") {
        return apiErrorResponse("Field 'query' harus berupa string", 400);
      }

      const trimmedQuery = query.trim();
      if (trimmedQuery.length === 0) {
        return apiErrorResponse("Query pencarian tidak boleh kosong", 400);
      }

      if (trimmedQuery.length > MAX_QUERY_LENGTH) {
        return apiErrorResponse(
          `Query terlalu panjang (max ${MAX_QUERY_LENGTH} karakter)`,
          400
        );
      }

      const results = await searchCreators(trimmedQuery);
      return apiSuccessResponse({ results }, 60);
    }

    return apiErrorResponse(
      "Harus menyertakan 'brief' (object) atau 'query' (string) dalam request body",
      400
    );
  } catch (error) {
    return apiErrorResponse(
      "Gagal melakukan matching. Silakan coba lagi.",
      500,
      error
    );
  }
}
