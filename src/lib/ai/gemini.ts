import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

/**
 * Initialize Gemini AI client
 * Uses server-side env variable GEMINI_API_KEY
 */
export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY tidak ditemukan di environment variables"
      );
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Get Gemini generative model instance
 * Default: gemini-2.0-flash (fast, capable)
 */
export function getModel(modelName = "gemini-2.5-flash"): GenerativeModel {
  if (!model) {
    const client = getGeminiClient();
    model = client.getGenerativeModel({ model: modelName });
  }
  return model;
}

/**
 * Generate text response from Gemini
 */
export async function generateText(prompt: string): Promise<string> {
  const geminiModel = getModel();
  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  return response.text();
}

/**
 * Generate structured JSON response from Gemini
 */
export async function generateJSON<T>(prompt: string): Promise<T> {
  const geminiModel = getModel();
  const result = await geminiModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : text.trim();

  try {
    return JSON.parse(jsonStr) as T;
  } catch {
    throw new Error(`Gagal parse JSON dari Gemini response: ${text.slice(0, 200)}`);
  }
}

/**
 * Generate embeddings for semantic matching
 * Uses text-embedding-004 model
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getGeminiClient();
  const embeddingModel = client.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

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
