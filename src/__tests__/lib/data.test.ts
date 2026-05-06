import { creators } from "@/lib/data/creators";
import { sampleCampaigns, dashboardStats } from "@/lib/data/campaigns";

describe("Creator seed data", () => {
  it("memiliki minimal 10 creator profiles", () => {
    expect(creators.length).toBeGreaterThanOrEqual(10);
  });

  it("setiap creator memiliki id unik", () => {
    const ids = creators.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("setiap creator memiliki semua required fields", () => {
    creators.forEach((creator) => {
      expect(creator.id).toBeTruthy();
      expect(creator.name).toBeTruthy();
      expect(creator.username).toBeTruthy();
      expect(creator.platform.length).toBeGreaterThan(0);
      expect(creator.niche.length).toBeGreaterThan(0);
      expect(creator.location).toBeTruthy();
      expect(creator.followers).toBeGreaterThan(0);
      expect(creator.engagementRate).toBeGreaterThan(0);
      expect(creator.personality).toBeDefined();
      expect(creator.audienceDemo).toBeDefined();
      expect(creator.pricing).toBeDefined();
    });
  });

  it("engagement rate dalam range valid (0-100)", () => {
    creators.forEach((creator) => {
      expect(creator.engagementRate).toBeGreaterThan(0);
      expect(creator.engagementRate).toBeLessThanOrEqual(100);
    });
  });

  it("reliability score dalam range 0-100", () => {
    creators.forEach((creator) => {
      expect(creator.reliability).toBeGreaterThanOrEqual(0);
      expect(creator.reliability).toBeLessThanOrEqual(100);
    });
  });

  it("trust level dalam range 0-100", () => {
    creators.forEach((creator) => {
      expect(creator.audienceDemo.trustLevel).toBeGreaterThanOrEqual(0);
      expect(creator.audienceDemo.trustLevel).toBeLessThanOrEqual(100);
    });
  });

  it("pricing dalam IDR dan positif", () => {
    creators.forEach((creator) => {
      expect(creator.pricing.currency).toBe("IDR");
      expect(creator.pricing.postRate).toBeGreaterThan(0);
      expect(creator.pricing.storyRate).toBeGreaterThan(0);
      expect(creator.pricing.videoRate).toBeGreaterThan(0);
    });
  });

  it("platform hanya berisi nilai valid", () => {
    const validPlatforms = ["tiktok", "instagram", "youtube", "twitter"];
    creators.forEach((creator) => {
      creator.platform.forEach((p) => {
        expect(validPlatforms).toContain(p);
      });
    });
  });
});

describe("Campaign seed data", () => {
  it("memiliki sample campaigns", () => {
    expect(sampleCampaigns.length).toBeGreaterThan(0);
  });

  it("setiap campaign memiliki brief yang valid", () => {
    sampleCampaigns.forEach((campaign) => {
      expect(campaign.id).toBeTruthy();
      expect(campaign.brief.title).toBeTruthy();
      expect(campaign.brief.brand).toBeTruthy();
      expect(campaign.brief.budget).toBeGreaterThan(0);
      expect(campaign.status).toBeTruthy();
    });
  });

  it("campaign status adalah nilai valid", () => {
    const validStatuses = [
      "draft",
      "briefing",
      "matching",
      "outreach",
      "active",
      "review",
      "completed",
    ];
    sampleCampaigns.forEach((campaign) => {
      expect(validStatuses).toContain(campaign.status);
    });
  });
});

describe("Dashboard stats", () => {
  it("memiliki semua required fields", () => {
    expect(dashboardStats.totalCampaigns).toBeGreaterThan(0);
    expect(dashboardStats.activeCampaigns).toBeGreaterThanOrEqual(0);
    expect(dashboardStats.totalCreators).toBeGreaterThan(0);
    expect(dashboardStats.avgFitScore).toBeGreaterThan(0);
    expect(dashboardStats.avgFitScore).toBeLessThanOrEqual(100);
    expect(dashboardStats.completionRate).toBeGreaterThanOrEqual(0);
    expect(dashboardStats.completionRate).toBeLessThanOrEqual(100);
  });

  it("active campaigns tidak melebihi total", () => {
    expect(dashboardStats.activeCampaigns).toBeLessThanOrEqual(
      dashboardStats.totalCampaigns
    );
  });
});
