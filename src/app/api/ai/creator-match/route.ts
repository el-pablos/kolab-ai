import { NextRequest, NextResponse } from "next/server";
import { matchCreators, searchCreators } from "@/lib/ai/creator-matcher";
import { ParsedBrief } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brief, query } = body;

    // Mode 1: Match berdasarkan parsed brief
    if (brief) {
      const parsedBrief = brief as ParsedBrief;
      const results = await matchCreators(parsedBrief);
      return NextResponse.json({ results }, { status: 200 });
    }

    // Mode 2: Semantic search berdasarkan query
    if (query && typeof query === "string") {
      if (query.trim().length === 0) {
        return NextResponse.json(
          { error: "Query pencarian tidak boleh kosong" },
          { status: 400 }
        );
      }
      const results = await searchCreators(query);
      return NextResponse.json({ results }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Harus menyertakan 'brief' atau 'query' dalam request body" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Creator match error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gagal melakukan matching. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}
