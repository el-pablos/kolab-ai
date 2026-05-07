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
  Info,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Wand2,
  ArrowRight,
  HelpCircle,
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
  const [showHelp, setShowHelp] = useState(false);

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
      // Handle both old format {result} and new format {data: {result}}
      setParsedBrief(data.data?.result || data.result);
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
          Paste brief campaign kamu di sini — AI akan membaca, memahami konteks, dan mengekstrak semua informasi penting secara otomatis.
        </p>
      </div>

      {/* Apa itu Brief? — Collapsible */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-violet-100 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/30">
          <CardContent className="p-4">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-800 dark:text-violet-300">
                  Apa itu Brief? Gimana cara kerjanya?
                </span>
              </div>
              {showHelp ? (
                <ChevronUp className="h-4 w-4 text-violet-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-violet-600" />
              )}
            </button>

            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-violet-200 dark:border-violet-800 space-y-3 text-sm text-violet-700 dark:text-violet-300">
                    <p>
                      <strong>Brief</strong> adalah dokumen yang berisi detail campaign kamu — mulai dari brand, objective, target audience, budget, sampai deliverables yang diharapkan dari creator.
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">Cara kerja AI Parsing:</p>
                      <div className="grid gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">1</span>
                          <span>Paste brief dalam format apapun (bebas, ga harus terstruktur)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">2</span>
                          <span>AI (Gemini) membaca dan memahami konteks brief kamu</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">3</span>
                          <span>Otomatis mengekstrak: objective, audience, budget, timeline, deliverables</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-200 text-xs font-bold text-violet-700">4</span>
                          <span>AI juga generate profil creator ideal berdasarkan brief</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-violet-500 italic">
                      Tips: Semakin detail brief kamu, semakin akurat hasil parsing AI-nya.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-violet-600" />
                Campaign Brief
                <div className="relative group ml-1">
                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    AI akan menganalisis teks apapun — ga perlu format khusus
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste campaign brief di sini... Bisa dalam format apapun — AI akan memahaminya.

Contoh isi brief:
• Nama brand & produk
• Objective campaign
• Target audience
• Budget
• Timeline
• Deliverables yang diharapkan
• Requirements khusus"
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
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                Powered by Gemini AI — brief kamu tidak disimpan di server
              </p>
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
                className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950"
              >
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
                    <p className="text-xs text-red-500 mt-1">
                      Pastikan brief kamu berisi informasi campaign yang jelas. Coba lagi atau gunakan contoh brief untuk melihat cara kerjanya.
                    </p>
                  </div>
                </div>
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
                <p className="mt-1 text-xs text-slate-400">
                  Mengekstrak objective, audience, budget, dan deliverables
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
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Brief berhasil dianalisis oleh AI
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 ml-7">
                    AI telah mengekstrak {parsedBrief.deliverables.length} deliverables, {parsedBrief.keywords.length} keywords, dan profil creator ideal dari brief kamu.
                  </p>
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
                      <p className="text-xs font-medium text-violet-700 mb-1 dark:text-violet-300 flex items-center gap-1">
                        <Wand2 className="h-3.5 w-3.5" />
                        Profil Creator Ideal (AI Generated)
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

                    {/* Next Step */}
                    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                      <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Langkah Selanjutnya
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Brief sudah diparsing! Sekarang kamu bisa langsung cari creator yang cocok berdasarkan profil ideal yang sudah di-generate AI.
                      </p>
                    </div>

                    {/* Action */}
                    <Button className="w-full mt-4" asChild>
                      <a href="/creators">
                        <Sparkles className="h-4 w-4" />
                        Cari Creator yang Cocok
                        <ArrowRight className="h-4 w-4" />
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
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Hasil parsing akan muncul di sini
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Paste campaign brief di sebelah kiri, lalu klik &quot;Parse dengan AI&quot;
                  untuk menganalisis secara otomatis.
                </p>

                {/* Step by step guide */}
                <div className="mt-6 w-full max-w-sm text-left space-y-3">
                  <p className="text-xs font-medium text-slate-500 text-center">Cara Pakai:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">1</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Paste brief campaign (format bebas)</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">2</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Klik &quot;Parse dengan AI&quot; untuk analisis</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">3</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400">Review hasil parsing & cari creator yang cocok</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Atau klik &quot;Contoh Brief&quot; untuk lihat demo
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
