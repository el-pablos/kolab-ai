/**
 * Test cosine similarity function
 * Isolated from Gemini module to avoid Next.js server runtime deps in Jest
 */

// Inline the pure function to test without importing server-side modules
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
}

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

  it("mengembalikan 0 jika vektor kosong", () => {
    expect(cosineSimilarity([], [])).toBe(0);
  });

  it("menghitung similarity dengan benar untuk vektor arbitrary", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const expected = 32 / (Math.sqrt(14) * Math.sqrt(77));
    expect(cosineSimilarity(a, b)).toBeCloseTo(expected);
  });
});
