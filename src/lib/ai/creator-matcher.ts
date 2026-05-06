import { Creator, MatchResult, MatchBreakdown, ParsedBrief } from "@/types";
import { generateText } from "./gemini";
import { creators } from "@/lib/data/creators";

/**
 * Match creators dengan campaign brief menggunakan AI semantic matching
 * Mengembalikan ranked list of creators berdasarkan fit score
 */
export async function matchCreators(
  brief: ParsedBrief,
  creatorList?: Creator[]
): Promise<MatchResult[]> {
  const availableCreators = creatorList || creators;

  const prompt = `Kamu adalah AI Campaign Intelligence Engine bernama KOLab AI.
Tugasmu adalah mencocokkan creator/KOL dengan campaign brief secara semantik.

CAMPAIGN BRIEF:
- Title: ${brief.title}
- Brand: ${brief.brand}
- Objective: ${brief.objective}
- Target Audience: ${brief.targetAudience.ageRange}, ${brief.targetAudience.gender}, ${brief.targetAudience.location}
- Interests: ${brief.targetAudience.interests.join(", ")}
- Tone: ${brief.tone.join(", ")}
- Budget per Creator: ${brief.budget.perCreator} ${brief.budget.currency}
- Ideal Creator: ${brief.idealCreatorProfile}
- Keywords: ${brief.keywords.join(", ")}

AVAILABLE CREATORS:
${availableCreators
  .map(
    (c, i) => `
${i + 1}. ${c.name} (@${c.username})
   - Niche: ${c.niche.join(", ")}
   - Personality: ${c.personality.tone}, ${c.personality.style}
   - Audience: ${c.audienceDemo.ageRange}, ${c.audienceDemo.gender}, ${c.audienceDemo.location}
   - Followers: ${c.followers.toLocaleString()}
   - ER: ${c.engagementRate}%
   - Trust Level: ${c.audienceDemo.trustLevel}/100
   - Reliability: ${c.reliability}/100
   - Tags: ${c.tags.join(", ")}
   - Description: ${c.personality.description}
`
  )
  .join("")}

Untuk SETIAP creator, berikan skor matching (0-100) dengan breakdown:
\`\`\`json
[
  {
    "creatorIndex": 0,
    "score": 85,
    "breakdown": {
      "audienceFit": 90,
      "toneFit": 85,
      "nicheFit": 80,
      "budgetFit": 75,
      "reliabilityScore": 90,
      "engagementQuality": 85
    },
    "reasoning": "Penjelasan singkat dalam bahasa Indonesia kenapa creator ini cocok/tidak cocok"
  }
]
\`\`\`

ATURAN SCORING:
- audienceFit: Seberapa cocok audience creator dengan target campaign
- toneFit: Seberapa cocok personality/tone creator dengan tone campaign
- nicheFit: Seberapa relevan niche creator dengan campaign
- budgetFit: Apakah pricing creator sesuai budget (100 = perfect fit, 0 = way over budget)
- reliabilityScore: Track record reliability creator
- engagementQuality: Kualitas engagement (bukan cuma angka, tapi trust & purchase intent)

Score akhir = weighted average:
- audienceFit: 25%
- toneFit: 20%
- nicheFit: 20%
- budgetFit: 10%
- reliabilityScore: 15%
- engagementQuality: 10%

Kembalikan SEMUA creator dengan skornya, sorted dari tertinggi ke terendah.`;

  const responseText = await generateText(prompt);

  // Parse JSON response
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : responseText.trim();

  let matchData: Array<{
    creatorIndex: number;
    score: number;
    breakdown: MatchBreakdown;
    reasoning: string;
  }>;

  try {
    matchData = JSON.parse(jsonStr);
  } catch {
    // Fallback: generate scores algorithmically
    matchData = availableCreators.map((creator, index) => ({
      creatorIndex: index,
      score: calculateFallbackScore(creator, brief),
      breakdown: calculateFallbackBreakdown(creator, brief),
      reasoning: `Score dihitung berdasarkan kecocokan niche, audience, dan engagement rate.`,
    }));
  }

  // Map to MatchResult
  const results: MatchResult[] = matchData
    .map((match) => ({
      creator: availableCreators[match.creatorIndex],
      score: match.score,
      breakdown: match.breakdown,
      reasoning: match.reasoning,
    }))
    .filter((r) => r.creator) // filter invalid indices
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Fallback scoring jika AI response gagal di-parse
 */
function calculateFallbackScore(
  creator: Creator,
  brief: ParsedBrief
): number {
  const breakdown = calculateFallbackBreakdown(creator, brief);
  return Math.round(
    breakdown.audienceFit * 0.25 +
      breakdown.toneFit * 0.2 +
      breakdown.nicheFit * 0.2 +
      breakdown.budgetFit * 0.1 +
      breakdown.reliabilityScore * 0.15 +
      breakdown.engagementQuality * 0.1
  );
}

function calculateFallbackBreakdown(
  creator: Creator,
  brief: ParsedBrief
): MatchBreakdown {
  // Niche fit: check overlap between creator niche/tags and brief keywords
  const nicheOverlap = creator.tags.filter(
    (tag) =>
      brief.keywords.some((k) => k.toLowerCase().includes(tag.toLowerCase())) ||
      brief.tone.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  ).length;
  const nicheFit = Math.min(100, (nicheOverlap / Math.max(brief.keywords.length, 1)) * 100 + 30);

  // Audience fit based on trust level and purchase intent
  const audienceFit = (creator.audienceDemo.trustLevel + creator.audienceDemo.purchaseIntent) / 2;

  // Tone fit based on personality match
  const toneFit = creator.personality.authenticity * 0.8 + 20;

  // Budget fit
  const budgetFit =
    brief.budget.perCreator >= creator.pricing.videoRate ? 90 : 50;

  return {
    audienceFit: Math.round(audienceFit),
    toneFit: Math.round(toneFit),
    nicheFit: Math.round(nicheFit),
    budgetFit,
    reliabilityScore: creator.reliability,
    engagementQuality: Math.round(
      creator.engagementRate * 10 + creator.audienceDemo.trustLevel * 0.3
    ),
  };
}

/**
 * Semantic search creators berdasarkan natural language query
 */
export async function searchCreators(query: string): Promise<MatchResult[]> {
  const prompt = `Kamu adalah AI Campaign Intelligence Engine bernama KOLab AI.
User mencari creator dengan query berikut:

QUERY: "${query}"

AVAILABLE CREATORS:
${creators
  .map(
    (c, i) => `
${i + 1}. ${c.name} (@${c.username})
   - Niche: ${c.niche.join(", ")}
   - Personality: ${c.personality.tone}, ${c.personality.style}
   - Description: ${c.personality.description}
   - Audience: ${c.audienceDemo.ageRange}, ${c.audienceDemo.gender}
   - ER: ${c.engagementRate}%
   - Tags: ${c.tags.join(", ")}
`
  )
  .join("")}

Berdasarkan query user, ranking creator dari yang paling relevan.
Kembalikan dalam format JSON:
\`\`\`json
[
  {
    "creatorIndex": 0,
    "score": 95,
    "reasoning": "Penjelasan kenapa creator ini cocok dengan query"
  }
]
\`\`\`

Hanya kembalikan creator yang relevan (score > 40). Sorted dari score tertinggi.`;

  const responseText = await generateText(prompt);
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : responseText.trim();

  try {
    const searchResults: Array<{
      creatorIndex: number;
      score: number;
      reasoning: string;
    }> = JSON.parse(jsonStr);

    return searchResults
      .map((r) => ({
        creator: creators[r.creatorIndex],
        score: r.score,
        breakdown: {
          audienceFit: r.score,
          toneFit: r.score,
          nicheFit: r.score,
          budgetFit: 80,
          reliabilityScore: creators[r.creatorIndex]?.reliability || 80,
          engagementQuality: r.score,
        },
        reasoning: r.reasoning,
      }))
      .filter((r) => r.creator);
  } catch {
    // Fallback: simple keyword matching
    return creators
      .filter(
        (c) =>
          c.tags.some((t) => query.toLowerCase().includes(t)) ||
          c.niche.some((n) => query.toLowerCase().includes(n)) ||
          c.personality.style.toLowerCase().includes(query.toLowerCase())
      )
      .map((c) => ({
        creator: c,
        score: 70,
        breakdown: {
          audienceFit: 70,
          toneFit: 70,
          nicheFit: 70,
          budgetFit: 80,
          reliabilityScore: c.reliability,
          engagementQuality: 70,
        },
        reasoning: "Matched berdasarkan keyword search",
      }));
  }
}
