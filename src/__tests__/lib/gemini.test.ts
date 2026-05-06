import { cosineSimilarity } from "@/lib/ai/gemini";

describe("cosineSimilarity", () => {
  it("mengembalikan 1 untuk vektor identik", () => {
    const vec = [1, 2, 3, 4, 5];
    expect(cosineSimilarity(vec, vec)).toBeCloseTo(1.0);
  });

  it("mengembalikan 0 untuk vektor orthogonal", () => {
    const a = [1, 0, 0];
    const b = [0, 1, 0];
    expect(cosineSimilarity(a, b)).toBeCloseTo(0.0);
  });

  it("mengembalikan -1 untuk vektor berlawanan", () => {
    const a = [1, 2, 3];
    const b = [-1, -2, -3];
    expect(cosineSimilarity(a, b)).toBeCloseTo(-1.0);
  });

  it("mengembalikan 0 jika panjang vektor berbeda", () => {
    const a = [1, 2, 3];
    const b = [1, 2];
    expect(cosineSimilarity(a, b)).toBe(0);
  });

  it("mengembalikan 0 jika salah satu vektor nol", () => {
    const a = [0, 0, 0];
    const b = [1, 2, 3];
    expect(cosineSimilarity(a, b)).toBe(0);
  });

  it("menghitung similarity dengan benar untuk vektor arbitrary", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    // dot = 4+10+18 = 32
    // normA = sqrt(1+4+9) = sqrt(14)
    // normB = sqrt(16+25+36) = sqrt(77)
    // similarity = 32 / (sqrt(14) * sqrt(77))
    const expected = 32 / (Math.sqrt(14) * Math.sqrt(77));
    expect(cosineSimilarity(a, b)).toBeCloseTo(expected);
  });
});
