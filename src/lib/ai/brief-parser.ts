import { ParsedBrief } from "@/types";
import { generateJSON } from "./gemini";

/**
 * Parse campaign brief text menggunakan Gemini AI
 * Mengekstrak informasi terstruktur dari brief mentah
 */
export async function parseBrief(briefText: string): Promise<ParsedBrief> {
  const prompt = `Kamu adalah AI Campaign Intelligence Engine bernama KOLab AI.
Tugasmu adalah menganalisis campaign brief berikut dan mengekstrak informasi terstruktur.

BRIEF:
"""
${briefText}
"""

Analisis brief di atas dan kembalikan dalam format JSON berikut:
\`\`\`json
{
  "title": "judul campaign yang kamu identifikasi",
  "brand": "nama brand/perusahaan",
  "objective": "tujuan utama campaign",
  "targetAudience": {
    "ageRange": "rentang usia target (contoh: 18-35)",
    "gender": "gender target (contoh: 70% female)",
    "location": "lokasi target",
    "interests": ["interest 1", "interest 2"],
    "behavior": ["behavior 1", "behavior 2"]
  },
  "tone": ["tone 1", "tone 2"],
  "budget": {
    "total": 0,
    "perCreator": 0,
    "currency": "IDR"
  },
  "timeline": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD",
    "milestones": ["milestone 1", "milestone 2"]
  },
  "deliverables": [
    {
      "type": "video/post/story/reel",
      "quantity": 1,
      "platform": "tiktok/instagram/youtube/twitter",
      "description": "deskripsi deliverable"
    }
  ],
  "requirements": ["requirement 1", "requirement 2"],
  "keywords": ["keyword relevan 1", "keyword 2"],
  "idealCreatorProfile": "deskripsi profil creator ideal untuk campaign ini dalam bahasa Indonesia"
}
\`\`\`

PENTING:
- Jika informasi tidak tersedia di brief, buat estimasi yang masuk akal berdasarkan konteks
- Budget dalam IDR (Rupiah Indonesia)
- Gunakan bahasa Indonesia untuk idealCreatorProfile
- Pastikan output valid JSON`;

  return generateJSON<ParsedBrief>(prompt);
}
