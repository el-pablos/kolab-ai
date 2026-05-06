import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("menggabungkan class names dengan benar", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("menangani conditional classes", () => {
    expect(cn("base", true && "active", false && "hidden")).toBe("base active");
  });

  it("merge tailwind classes tanpa konflik", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toContain("px-4");
    expect(result).toContain("py-1");
    expect(result).not.toContain("px-2");
  });

  it("menangani undefined dan null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("menangani empty string", () => {
    expect(cn("", "foo", "")).toBe("foo");
  });

  it("menangani array of classes", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});
