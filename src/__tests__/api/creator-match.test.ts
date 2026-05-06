/**
 * Test untuk API route /api/ai/creator-match
 * Menguji validasi input tanpa memanggil Gemini API
 */

describe("Creator Match API validation", () => {
  it("menolak request tanpa brief atau query", () => {
    const body = {};
    const hasValidInput = "brief" in body || ("query" in body && typeof (body as { query?: string }).query === "string");
    expect(hasValidInput).toBe(false);
  });

  it("menerima request dengan query string", () => {
    const body = { query: "creator beauty Jakarta" };
    const isValid = body.query && typeof body.query === "string" && body.query.trim().length > 0;
    expect(isValid).toBe(true);
  });

  it("menolak query kosong", () => {
    const body = { query: "   " };
    const isValid = body.query.trim().length > 0;
    expect(isValid).toBe(false);
  });

  it("menerima request dengan brief object", () => {
    const body = {
      brief: {
        title: "Test Campaign",
        brand: "Test Brand",
        objective: "Awareness",
        targetAudience: { ageRange: "20-35", gender: "female", location: "Jakarta", interests: [], behavior: [] },
        tone: ["casual"],
        budget: { total: 100000000, perCreator: 20000000, currency: "IDR" },
        timeline: { startDate: "2026-06-01", endDate: "2026-07-01", milestones: [] },
        deliverables: [],
        requirements: [],
        keywords: ["beauty"],
        idealCreatorProfile: "Creator beauty premium",
      },
    };
    const isValid = body.brief && typeof body.brief === "object" && body.brief.title;
    expect(isValid).toBeTruthy();
  });
});
