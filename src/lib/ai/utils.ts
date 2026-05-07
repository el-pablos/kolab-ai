import { NextResponse } from "next/server";

// ============================================
// KOLab AI — Shared Utilities
// ============================================

/** Maximum retry attempts for transient AI failures */
const MAX_RETRIES = 3;

/** Base delay in ms for exponential backoff */
const BASE_DELAY_MS = 1000;

/**
 * Sanitize user input to prevent prompt injection attacks.
 * Strips control characters and wraps in delimiters that the model
 * is instructed to treat as opaque data.
 *
 * @param input - Raw user-provided string
 * @param maxLength - Maximum allowed length (truncates beyond)
 * @returns Sanitized string safe for prompt interpolation
 */
export function sanitizeInput(input: string, maxLength = 10000): string {
  return input
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .replace(/```/g, "` ` `") // break markdown code fences
    .trim();
}

/**
 * Execute an async function with exponential backoff retry.
 * Only retries on transient errors (network, rate limit, 5xx).
 *
 * @param fn - Async function to execute
 * @param retries - Number of retry attempts (default: 3)
 * @returns Result of the function
 * @throws Last error if all retries exhausted
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on non-transient errors
      const message = lastError.message.toLowerCase();
      const isTransient =
        message.includes("rate limit") ||
        message.includes("timeout") ||
        message.includes("503") ||
        message.includes("429") ||
        message.includes("network") ||
        message.includes("econnreset") ||
        message.includes("fetch failed");

      if (!isTransient || attempt === retries) {
        throw lastError;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = BASE_DELAY_MS * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError ?? new Error("Retry exhausted with unknown error");
}

/**
 * Extract JSON from AI response text that may be wrapped in markdown code fences.
 *
 * @param text - Raw AI response text
 * @returns Parsed JSON string (still needs JSON.parse)
 */
export function extractJSON(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return jsonMatch ? jsonMatch[1].trim() : text.trim();
}

/**
 * Create a standardized API error response with proper headers.
 *
 * @param message - User-facing error message
 * @param status - HTTP status code
 * @param internalError - Internal error for logging (not exposed)
 * @returns NextResponse with error payload and headers
 */
export function apiErrorResponse(
  message: string,
  status: number,
  internalError?: unknown
): NextResponse {
  if (internalError) {
    console.error(`[KOLab API Error ${status}]`, internalError);
  }

  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}

/**
 * Create a standardized API success response with proper headers.
 *
 * @param data - Response payload
 * @param cacheMaxAge - Cache-Control max-age in seconds (0 = no-store)
 * @returns NextResponse with data payload and headers
 */
export function apiSuccessResponse<T>(
  data: T,
  cacheMaxAge = 0
): NextResponse {
  const cacheControl =
    cacheMaxAge > 0
      ? `private, max-age=${cacheMaxAge}, stale-while-revalidate=${cacheMaxAge * 2}`
      : "no-store";

  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": cacheControl,
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
