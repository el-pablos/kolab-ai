import { NextRequest, NextResponse } from "next/server";
import { parseBrief } from "@/lib/ai/brief-parser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brief } = body;

    if (!brief || typeof brief !== "string" || brief.trim().length === 0) {
      return NextResponse.json(
        { error: "Brief text wajib diisi" },
        { status: 400 }
      );
    }

    if (brief.length > 10000) {
      return NextResponse.json(
        { error: "Brief terlalu panjang (max 10.000 karakter)" },
        { status: 400 }
      );
    }

    const result = await parseBrief(brief);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Brief parser error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gagal menganalisis brief. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
