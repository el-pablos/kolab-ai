// ============================================
// KOLab AI — Type Definitions
// ============================================

// ─── Core Domain Types ───────────────────────

/** Creator/KOL profile — represents a content creator in the database */
export interface Creator {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Social media handle (without @) */
  username: string;
  /** Active platforms */
  platform: Platform[];
  /** Avatar image URL */
  avatar: string;
  /** Short biography */
  bio: string;
  /** Content niches/categories */
  niche: string[];
  /** Primary location */
  location: string;
  /** Total follower count across platforms */
  followers: number;
  /** Average engagement rate as percentage (e.g., 4.5 = 4.5%) */
  engagementRate: number;
  /** Average views per content piece */
  avgViews: number;
  /** Personality profile */
  personality: CreatorPersonality;
  /** Audience demographics */
  audienceDemo: AudienceDemographics;
  /** Content style descriptors */
  contentStyle: string[];
  /** Pricing information */
  pricing: CreatorPricing;
  /** Number of past campaigns completed */
  pastCampaigns: number;
  /** Reliability score (0-100, higher = more reliable) */
  reliability: number;
  /** Searchable tags */
  tags: string[];
}

/** Supported social media platforms */
export type Platform = "tiktok" | "instagram" | "youtube" | "twitter";

/** Creator personality profile for tone/style matching */
export interface CreatorPersonality {
  /** Communication tone (e.g., "chaotic energy", "soft spoken", "educational") */
  tone: string;
  /** Humor style (e.g., "meme-heavy", "dry wit", "slapstick") */
  humor: string;
  /** Authenticity score (0-100) */
  authenticity: number;
  /** Energy level (e.g., "high energy", "calm", "chill") */
  energy: string;
  /** Content style (e.g., "luxury", "relatable", "edgy") */
  style: string;
  /** AI-generated personality summary */
  description: string;
}

/** Audience demographic breakdown */
export interface AudienceDemographics {
  /** Age range (e.g., "18-24") */
  ageRange: string;
  /** Gender distribution (e.g., "70% female") */
  gender: string;
  /** Primary audience location */
  location: string;
  /** Audience interests */
  interests: string[];
  /** Audience trust level toward creator (0-100) */
  trustLevel: number;
  /** Audience purchase intent score (0-100) */
  purchaseIntent: number;
}

/** Creator pricing rates */
export interface CreatorPricing {
  /** Rate per static post (IDR) */
  postRate: number;
  /** Rate per story/ephemeral content (IDR) */
  storyRate: number;
  /** Rate per video content (IDR) */
  videoRate: number;
  /** Currency code */
  currency: string;
}

// ─── Campaign Types ──────────────────────────

/** Campaign brief as stored in the system */
export interface CampaignBrief {
  id: string;
  title: string;
  brand: string;
  objective: string;
  targetAudience: string;
  tone: string;
  budget: number;
  timeline: string;
  deliverables: string[];
  requirements: string[];
  /** Original raw text input */
  rawText: string;
  /** ISO timestamp when brief was parsed */
  parsedAt: string;
}

/** AI-parsed brief result with structured extraction */
export interface ParsedBrief {
  title: string;
  brand: string;
  objective: string;
  targetAudience: TargetAudience;
  tone: string[];
  budget: BudgetInfo;
  timeline: TimelineInfo;
  deliverables: Deliverable[];
  requirements: string[];
  /** SEO/matching keywords extracted from brief */
  keywords: string[];
  /** AI-generated ideal creator profile description */
  idealCreatorProfile: string;
}

/** Target audience specification */
export interface TargetAudience {
  ageRange: string;
  gender: string;
  location: string;
  interests: string[];
  behavior: string[];
}

/** Budget breakdown */
export interface BudgetInfo {
  /** Total campaign budget */
  total: number;
  /** Budget allocated per creator */
  perCreator: number;
  /** Currency code (default: IDR) */
  currency: string;
}

/** Campaign timeline */
export interface TimelineInfo {
  /** Campaign start date (YYYY-MM-DD) */
  startDate: string;
  /** Campaign end date (YYYY-MM-DD) */
  endDate: string;
  /** Key milestones */
  milestones: string[];
}

/** Individual deliverable specification */
export interface Deliverable {
  /** Content type */
  type: string;
  /** Number of pieces required */
  quantity: number;
  /** Target platform */
  platform: Platform;
  /** Description of the deliverable */
  description: string;
}

// ─── Matching Types ──────────────────────────

/** Creator-Campaign match result with scoring */
export interface MatchResult {
  /** Matched creator profile */
  creator: Creator;
  /** Overall fit score (0-100) */
  score: number;
  /** Detailed score breakdown by category */
  breakdown: MatchBreakdown;
  /** AI-generated reasoning for the match score */
  reasoning: string;
}

/** Detailed match score breakdown (all values 0-100) */
export interface MatchBreakdown {
  /** How well creator's audience matches campaign target */
  audienceFit: number;
  /** How well creator's tone matches campaign tone */
  toneFit: number;
  /** How relevant creator's niche is to campaign */
  nicheFit: number;
  /** How well creator's pricing fits campaign budget */
  budgetFit: number;
  /** Creator's historical reliability score */
  reliabilityScore: number;
  /** Quality of engagement (trust + purchase intent) */
  engagementQuality: number;
}

// ─── Campaign Management Types ───────────────

/** Full campaign entity */
export interface Campaign {
  id: string;
  brief: CampaignBrief;
  status: CampaignStatus;
  creators: CampaignCreator[];
  /** ISO timestamp */
  createdAt: string;
  /** ISO timestamp */
  updatedAt: string;
}

/** Campaign lifecycle status */
export type CampaignStatus =
  | "draft"
  | "briefing"
  | "matching"
  | "outreach"
  | "active"
  | "review"
  | "completed";

/** Creator assigned to a campaign */
export interface CampaignCreator {
  creator: Creator;
  status: "shortlisted" | "contacted" | "confirmed" | "declined" | "completed";
  fitScore: number;
  deliverables: CampaignDeliverable[];
}

/** Deliverable tracking within a campaign */
export interface CampaignDeliverable {
  id: string;
  type: string;
  status: "pending" | "submitted" | "revision" | "approved";
  /** ISO date string */
  dueDate: string;
  /** ISO timestamp when submitted */
  submittedAt?: string;
}

// ─── Chat Types ──────────────────────────────

/** Chat message in conversation history */
export interface ChatMessage {
  /** Unique message identifier */
  id: string;
  /** Message sender role */
  role: "user" | "assistant";
  /** Message content text */
  content: string;
  /** ISO timestamp */
  timestamp: string;
  /** Optional metadata (e.g., matched creators, parsed brief) */
  metadata?: Record<string, unknown>;
}

// ─── Dashboard Types ─────────────────────────

/** Aggregated dashboard statistics */
export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalCreators: number;
  matchedCreators: number;
  /** Average fit score across all matches (0-100) */
  avgFitScore: number;
  /** Total budget across all campaigns (IDR) */
  totalBudget: number;
  /** Campaign completion rate as percentage */
  completionRate: number;
}

// ─── API Types ───────────────────────────────

/** Standard API success response wrapper */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

/** Standard API error response wrapper */
export interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

/** Union type for all API responses */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** Request body for POST /api/ai/chat */
export interface ChatRequestBody {
  message: string;
  messages?: ChatMessage[];
}

/** Response data for POST /api/ai/chat */
export interface ChatResponseData {
  response: string;
}

/** Request body for POST /api/ai/brief-parser */
export interface BriefParserRequestBody {
  brief: string;
}

/** Response data for POST /api/ai/brief-parser */
export interface BriefParserResponseData {
  result: ParsedBrief;
}

/** Request body for POST /api/ai/creator-match */
export interface CreatorMatchRequestBody {
  brief?: ParsedBrief;
  query?: string;
}

/** Response data for POST /api/ai/creator-match */
export interface CreatorMatchResponseData {
  results: MatchResult[];
}
