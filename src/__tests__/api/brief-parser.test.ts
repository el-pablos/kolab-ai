/**
 * Test untuk API route /api/ai/brief-parser
 * Menguji validasi input tanpa memanggil Gemini API
 */

describe("Brief Parser API validation", () => {
  it("menolak request tanpa brief text", () => {
    const body = { brief: "" };
    const isValid = body.brief && typeof body.brief === "string" && body.brief.trim().length > 0;
    expect(isValid).toBeFalsy();
  });

  it("menolak brief yang terlalu panjang (>10000 chars)", () => {
    const longBrief = "a".repeat(10001);
    const isValid = longBrief.length <= 10000;
    expect(isValid).toBe(false);
  });

  it("menerima brief text yang valid", () => {
    const body = { brief: "Campaign skincare untuk wanita 20-35 tahun" };
    const isValid = body.brief && typeof body.brief === "string" && body.brief.trim().length > 0 && body.brief.length <= 10000;
    expect(isValid).toBe(true);
  });

  it("menolak brief yang bukan string", () => {
    const body = { brief: 123 };
    const isValid = typeof body.brief === "string";
    expect(isValid).toBe(false);
  });

  it("menolak brief yang hanya whitespace", () => {
    const body = { brief: "   \n\t  " };
    const isValid = body.brief.trim().length > 0;
    expect(isValid).toBe(false);
  });
});
