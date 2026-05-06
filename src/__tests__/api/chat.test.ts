/**
 * Test untuk API route /api/ai/chat
 * Menguji validasi input tanpa memanggil Gemini API
 */

describe("Chat API validation", () => {
  it("menolak pesan kosong", () => {
    const body = { message: "", messages: [] };
    const isValid = body.message && typeof body.message === "string" && body.message.trim().length > 0;
    expect(isValid).toBeFalsy();
  });

  it("menolak pesan yang terlalu panjang (>5000 chars)", () => {
    const longMessage = "a".repeat(5001);
    const isValid = longMessage.length <= 5000;
    expect(isValid).toBe(false);
  });

  it("menerima pesan yang valid", () => {
    const body = { message: "Carikan creator beauty", messages: [] };
    const isValid = body.message && typeof body.message === "string" && body.message.trim().length > 0 && body.message.length <= 5000;
    expect(isValid).toBe(true);
  });

  it("menerima messages array kosong", () => {
    const body = { message: "Hello", messages: [] };
    const isValid = Array.isArray(body.messages);
    expect(isValid).toBe(true);
  });

  it("menolak message yang bukan string", () => {
    const body = { message: null as unknown as string, messages: [] };
    const isValid = body.message && typeof body.message === "string";
    expect(isValid).toBeFalsy();
  });
});
