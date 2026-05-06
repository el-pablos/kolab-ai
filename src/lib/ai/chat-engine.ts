import { ChatMessage } from "@/types";
import { generateText } from "./gemini";
import { creators } from "@/lib/data/creators";
import { sampleCampaigns } from "@/lib/data/campaigns";

const SYSTEM_CONTEXT = `Kamu adalah KOLab AI — AI Campaign Intelligence Assistant untuk creator economy Indonesia.

Kamu membantu brand dan agency dalam:
1. Menemukan creator/KOL yang tepat untuk campaign mereka
2. Menganalisis brief campaign
3. Memberikan insight tentang creator personality dan audience
4. Menyarankan strategi campaign
5. Menjawab pertanyaan tentang influencer marketing di Indonesia

KONTEKS DATA:
- Kamu punya akses ke ${creators.length} creator profiles
- Ada ${sampleCampaigns.length} campaign yang sedang berjalan
- Kamu memahami konteks Indonesia: slang, niche lokal, budaya TikTok Indo

PERSONALITY:
- Bicara casual tapi profesional (bahasa Indonesia campur English tech terms)
- Berikan insight yang actionable
- Jangan terlalu formal, tapi tetap informatif
- Gunakan data dan angka saat relevan

CREATOR DATABASE SUMMARY:
${creators.map((c) => `- ${c.name} (@${c.username}): ${c.niche.join(", ")} | ${c.personality.style} | ${c.followers.toLocaleString()} followers | ER ${c.engagementRate}%`).join("\n")}
`;

/**
 * Process chat message dan generate AI response
 */
export async function processChat(
  messages: ChatMessage[],
  userMessage: string
): Promise<string> {
  // Build conversation history
  const conversationHistory = messages
    .slice(-10) // Keep last 10 messages for context
    .map((m) => `${m.role === "user" ? "User" : "KOLab AI"}: ${m.content}`)
    .join("\n\n");

  const prompt = `${SYSTEM_CONTEXT}

CONVERSATION HISTORY:
${conversationHistory}

User: ${userMessage}

KOLab AI:`;

  const response = await generateText(prompt);
  return response;
}
