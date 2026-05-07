import { Creator } from "@/types";
import { generateJSON } from "./gemini";
import { sanitizeInput } from "./utils";

const SUPPORTED_PLATFORMS = ["tiktok.com", "instagram.com", "youtube.com"] as const;

export function detectPlatform(url: string): string | null {
  const lower = url.toLowerCase();
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  return null;
}

export function extractUsername(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "";
    return last.replace(/^@/, "");
  } catch {
    return url.replace(/^@/, "");
  }
}

export function isValidSocialURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return SUPPORTED_PLATFORMS.some((p) => parsed.hostname.includes(p));
  } catch {
    return false;
  }
}

export async function analyzeCreatorFromURL(url: string): Promise<Creator> {
  const platform = detectPlatform(url);
  const username = extractUsername(url);
  const sanitizedUrl = sanitizeInput(url, 500);

  const prompt = `Kamu adalah AI Creator Intelligence Engine bernama KOLab AI.
Tugasmu adalah menganalisis profil creator/influencer dari URL sosial media berikut.

URL: ${sanitizedUrl}
Platform: ${platform || "unknown"}
Username: ${username}

Berdasarkan pengetahuanmu tentang creator ini (atau jika tidak dikenal, buat estimasi realistis berdasarkan username dan platform), generate profil creator lengkap dalam format JSON berikut:

\`\`\`json
{
  "id": "creator-ai-${Date.now()}",
  "name": "Nama lengkap creator",
  "username": "@${username}",
  "platform": ["${platform || "tiktok"}"],
  "avatar": "/images/avatars/default.jpg",
  "bio": "Bio singkat creator dalam bahasa Indonesia",
  "niche": ["niche1", "niche2"],
  "location": "Kota, Indonesia",
  "followers": 100000,
  "engagementRate": 5.0,
  "avgViews": 50000,
  "personality": {
    "tone": "deskripsi tone creator",
    "humor": "tipe humor",
    "authenticity": 80,
    "energy": "level energy",
    "style": "gaya konten",
    "description": "Deskripsi personality lengkap dalam bahasa Indonesia, termasuk konteks lokal"
  },
  "audienceDemo": {
    "ageRange": "18-35",
    "gender": "60% female",
    "location": "Jakarta, Indonesia",
    "interests": ["interest1", "interest2"],
    "trustLevel": 80,
    "purchaseIntent": 65
  },
  "contentStyle": ["style1", "style2"],
  "pricing": {
    "postRate": 5000000,
    "storyRate": 2000000,
    "videoRate": 10000000,
    "currency": "IDR"
  },
  "pastCampaigns": 10,
  "reliability": 80,
  "tags": ["tag1", "tag2"]
}
\`\`\`

ATURAN:
- Jika creator dikenal, gunakan data yang kamu tahu
- Jika tidak dikenal, buat estimasi REALISTIS berdasarkan platform dan username
- Followers harus angka realistis (bukan 0)
- Engagement rate antara 1-15%
- Pricing dalam IDR, realistis untuk creator Indonesia
- Personality description HARUS dalam bahasa Indonesia dan mencakup konteks lokal
- Tags harus relevan dengan niche dan budaya creator Indonesia
- Pastikan output valid JSON`;

  const creator = await generateJSON<Creator>(prompt);

  if (!creator.id) creator.id = `creator-ai-${Date.now()}`;
  if (!creator.username) creator.username = `@${username}`;

  return creator;
}
