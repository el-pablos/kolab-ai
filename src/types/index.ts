// ============================================
// KOLab AI — Type Definitions
// ============================================

/** Creator/KOL profile */
export interface Creator {
  id: string;
  name: string;
  username: string;
  platform: Platform[];
  avatar: string;
  bio: string;
  niche: string[];
  location: string;
  followers: number;
  engagementRate: number;
  avgViews: number;
  personality: CreatorPersonality;
  audienceDemo: AudienceDemographics;
  contentStyle: string[];
  pricing: CreatorPricing;
  pastCampaigns: number;
  reliability: number; // 0-100
  tags: string[];
}

export type Platform = "tiktok" | "instagram" | "youtube" | "twitter";

export interface CreatorPersonality {
  tone: string; // e.g., "chaotic energy", "soft spoken", "educational"
  humor: string; // e.g., "meme-heavy", "dry wit", "slapstick"
  authenticity: number; // 0-100
  energy: string; // e.g., "high energy", "calm", "chill"
  style: string; // e.g., "luxury", "relatable", "edgy"
  description: string; // AI-generated personality summary
}

export interface AudienceDemographics {
  ageRange: string;
  gender: string; // e.g., "70% female"
  location: string;
  interests: string[];
  trustLevel: number; // 0-100
  purchaseIntent: number; // 0-100
}

export interface CreatorPricing {
  postRate: number;
  storyRate: number;
  videoRate: number;
  currency: string;
}

/** Campaign Brief */
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
  rawText: string;
  parsedAt: string;
}

/** AI-parsed brief result */
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
  keywords: string[];
  idealCreatorProfile: string;
}

export interface TargetAudience {
  ageRange: string;
  gender: string;
  location: string;
  interests: string[];
  behavior: string[];
}

export interface BudgetInfo {
  total: number;
  perCreator: number;
  currency: string;
}

export interface TimelineInfo {
  startDate: string;
  endDate: string;
  milestones: string[];
}

export interface Deliverable {
  type: string;
  quantity: number;
  platform: Platform;
  description: string;
}

/** Creator-Campaign Match Result */
export interface MatchResult {
  creator: Creator;
  score: number; // 0-100 overall fit
  breakdown: MatchBreakdown;
  reasoning: string; // AI explanation
}

export interface MatchBreakdown {
  audienceFit: number;
  toneFit: number;
  nicheFit: number;
  budgetFit: number;
  reliabilityScore: number;
  engagementQuality: number;
}

/** Campaign */
export interface Campaign {
  id: string;
  brief: CampaignBrief;
  status: CampaignStatus;
  creators: CampaignCreator[];
  createdAt: string;
  updatedAt: string;
}

export type CampaignStatus =
  | "draft"
  | "briefing"
  | "matching"
  | "outreach"
  | "active"
  | "review"
  | "completed";

export interface CampaignCreator {
  creator: Creator;
  status: "shortlisted" | "contacted" | "confirmed" | "declined" | "completed";
  fitScore: number;
  deliverables: CampaignDeliverable[];
}

export interface CampaignDeliverable {
  id: string;
  type: string;
  status: "pending" | "submitted" | "revision" | "approved";
  dueDate: string;
  submittedAt?: string;
}

/** Chat Message */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/** Dashboard Stats */
export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalCreators: number;
  matchedCreators: number;
  avgFitScore: number;
  totalBudget: number;
  completionRate: number;
}
