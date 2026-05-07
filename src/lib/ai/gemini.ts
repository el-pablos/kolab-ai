import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { withRetry, extractJSON } from "./utils";

// ============================================
// KOLab AI — Gemini Client (Singleton)
// ============================================

/** Cached GoogleGenerativeAI client instance */
let genAI: GoogleGenerativeAI | null = null;

/** Cached model instances keyed by model name */
const modelCache = new Map<string, GenerativeModel>();

/** Default model for text generation */
const DEFAULT_MODEL = "gemini-2.5-flash";

/** Default model for embeddings */
const EMBEDDING_MODEL = "text-embedding-004";

/**
 * Get or create the GoogleGenerativeAI client singleton.
 * Reads GEMINI_API_KEY from server-side environment variables.
 *
 * @returns GoogleGenerativeAI client instance
 * @throws Error if GEMINI_API_KEY is not configured
 */
export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY tidak ditemukan di environment variables. " +
          "Pastikan variabel sudah di-set di .env.local"
      );
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Get a cached GenerativeModel instance by name.
 * Supports multiple model names simultaneously (fixed singleton bug).
 *
 * @param modelName - Gemini model identifier (default: gemini-2.5-flash)
 * @returns GenerativeModel instance
 */
export function getModel(modelName = DEFAULT_MODEL): GenerativeModel {
  if (!modelCache.has(modelName)) {
    const client = getGeminiClient();
    const model = client.getGenerativeModel({ model: modelName });
    modelCache.set(modelName, model);
  }
  return modelCache.get(modelName)!;
}

/**
 * Generate a text response from Gemini with automatic retry on transient failures.
 *
 * @param prompt - The prompt to send to the model
 * @returns Generated text response
 * @throws Error if generation fails after all retry attempts
 */
export async function generateText(prompt: string): Promise<string> {
  return withRetry(async () => {
    const geminiModel = getModel();
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  });
}

/**
 * Generate a structured JSON response from Gemini with automatic retry.
 * Handles markdown code fence extraction and JSON parsing.
 *
 * @typeParam T - Expected shape of the parsed JSON
 * @param prompt - The prompt requesting JSON output
 * @returns Parsed JSON object of type T
 * @throws Error if JSON parsing fails or generation fails after retries
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  return withRetry(async () => {
    const geminiModel = getModel();
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonStr = extractJSON(text);

    try {
      return JSON.parse(jsonStr) as T;
    } catch {
      throw new Error(
        `Gagal parse JSON dari Gemini response. ` +
          `Raw (first 200 chars): ${text.slice(0, 200)}`
      );
    }
  });
}

/**
 * Generate text embeddings for semantic similarity matching.
 * Uses the text-embedding-004 model.
 *
 * @param text - Input text to embed
 * @returns Array of embedding values (float vector)
 * @throws Error if embedding generation fails
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  return withRetry(async () => {
    const client = getGeminiClient();
    const embeddingModel = client.getGenerativeModel({
      model: EMBEDDING_MODEL,
    });
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  });
}

/**
 * Calculate cosine similarity between two embedding vectors.
 * Returns 0 for mismatched lengths or zero-magnitude vectors.
 *
 * @param a - First embedding vector
 * @param b - Second embedding vector
 * @returns Similarity score between -1 and 1 (1 = identical)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}
