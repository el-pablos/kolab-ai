"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Sparkles,
  Loader2,
  CheckCircle2,
  Target,
  Users,
  Calendar,
  DollarSign,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParsedBrief } from "@/types";

export default function BriefPage() {
  const [briefText, setBriefText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parsedBrief, setParsedBrief] = useState<ParsedBrief | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParseBrief = async () => {
    if (!briefText.trim()) return;

    setIsLoading(true);
    setError(null);
    setParsedBrief(null);

    try {
      const response = await fetch("/api/ai/brief-parser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: briefText }),
      });

      if (!response.ok) {
        throw new Error("Gagal parsing brief. Coba lagi.");
      }

      const data = await response.json();
      setParsedBrief(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const sampleBrief = `Campaign: Peluncuran Skincare "GlowUp Serum" 
Brand: GlowLab Indonesia
Budget: Rp 150.000.000

Objective: Meningkatkan awareness dan consideration untuk produk baru serum vitamin C kami di kalangan wanita muda urban.

Target Audience: Wanita 20-35 tahun, tinggal di kota besar (Jakarta, Bandung, Surabaya), aktif di TikTok dan Instagram, tertarik skincare dan self-care.

Tone: Premium tapi approachable, educational tapi tidak membosankan. Harus terasa authentic, bukan hard-sell.

Deliverables:
- 3 TikTok video (review + tutorial)
- 5 Instagram stories (before-after)
- 1 YouTube video (detailed review)

Timeline: Juni - Juli 2026

Requirements:
- Creator harus punya audience yang trust reviewnya
- Wajib mention key ingredients (Vitamin C 15%, Niacinamide)
- Before-after minimal 2 minggu pemakaian
- Honest review (boleh mention kekurangan)
- Tidak boleh collab dengan competitor 3 bulan terakhir`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Upload Campaign Brief
        </h1>
        <p className="text-slate-500 mt-1">
          Paste brief campaign — AI akan menganalisis dan mengekstrak informasi secara otomatis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-violet-600" />
                Campaign Brief
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste campaign brief di sini... Bisa dalam format apapun — AI akan memahaminya."
                className="min-h-[400px] text-sm"
                value={briefText}
                onChange={(e) => setBriefText(e.target.value)}
              />
              <div className="flex items-center gap-3 mt-4">
                <Button
                  onClick={handleParseBrief}
                  disabled={!briefText.trim() || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      AI sedang menganalisis...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Parse dengan AI
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setBriefText(sampleBrief)}
                >
                  <Upload className="h-4 w-4" />
                  Contoh Brief
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result Section */}
        <div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-violet-600" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Gemini AI sedang menganalisis brief...
                </p>
              </motion.div>
            )}

            {parsedBrief && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Success indicator */}
                <div className="flex items-center gap-2 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Brief berhasil dianalisis oleh AI
                  </span>
                </div>

                {/* Parsed Results */}
                <Card>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {parsedBrief.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {parsedBrief.brand}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <Target className="h-3.5 w-3.5" />
                          Objective
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {parsedBrief.objective}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <Users className="h-3.5 w-3.5" />
                          Target Audience
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {parsedBrief.targetAudience.ageRange},{" "}
                          {parsedBrief.targetAudience.gender}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          Budget
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Rp{" "}
                          {parsedBrief.budget.total.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Timeline
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {parsedBrief.timeline.startDate} -{" "}
                          {parsedBrief.timeline.endDate}
                        </p>
                      </div>
                    </div>

                    {/* Tone */}
                    <div>
                      <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        Tone & Keywords
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedBrief.tone.map((t) => (
                          <Badge key={t} variant="default">
                            {t}
                          </Badge>
                        ))}
                        {parsedBrief.keywords.map((k) => (
                          <Badge key={k} variant="secondary">
                            {k}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Ideal Creator */}
                    <div className="rounded-lg border border-violet-100 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950">
                      <p className="text-xs font-medium text-violet-700 mb-1 dark:text-violet-300">
                        🎯 Profil Creator Ideal (AI Generated)
                      </p>
                      <p className="text-sm text-violet-800 dark:text-violet-200">
                        {parsedBrief.idealCreatorProfile}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <p className="text-xs text-slate-500 mb-2">
                        Deliverables
                      </p>
                      <div className="space-y-1.5">
                        {parsedBrief.deliverables.map((d, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            {d.quantity}x {d.type} ({d.platform})
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <Button className="w-full mt-4" asChild>
                      <a href="/creators">
                        <Sparkles className="h-4 w-4" />
                        Cari Creator yang Cocok
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!parsedBrief && !isLoading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Belum ada brief
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Paste campaign brief di sebelah kiri, lalu klik &quot;Parse dengan AI&quot;
                  untuk menganalisis secara otomatis.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
