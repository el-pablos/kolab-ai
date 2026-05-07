"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  Link2,
  Users,
  TrendingUp,
  MapPin,
  Star,
  AlertCircle,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Creator } from "@/types";
import { addCreator } from "@/lib/data/creator-store";

function detectPlatform(url: string): string | null {
  const lower = url.toLowerCase();
  if (lower.includes("tiktok.com")) return "TikTok";
  if (lower.includes("instagram.com")) return "Instagram";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "YouTube";
  return null;
}

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

const loadingSteps = [
  "Membaca profil publik...",
  "Menganalisis personality creator...",
  "Mendeteksi audience demographics...",
  "Mengestimasi engagement quality...",
  "Membuat profil intelligence...",
];

export default function AddCreatorPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const platform = url ? detectPlatform(url) : null;

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);
    setCreator(null);
    setSaved(false);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, loadingSteps.length - 1));
    }, 2000);

    try {
      const response = await fetch("/api/ai/analyze-creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menganalisis creator");
      }

      setCreator(data.data?.creator || data.creator);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link href="/creators">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Discovery
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Tambah Creator Baru
        </h1>
        <p className="text-slate-500 mt-1">
          Paste URL profil sosial media — AI akan menganalisis dan membuat profil intelligence secara otomatis.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Link2 className="h-5 w-5 text-violet-600" />
                URL Profil Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="https://tiktok.com/@username"
                  className="pl-10 h-12 text-base"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                />
              </div>

              {platform && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <Badge variant="success">{platform} terdeteksi</Badge>
                </motion.div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!url.trim() || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analisis dengan AI
                  </>
                )}
              </Button>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-medium">Contoh URL yang didukung:</p>
                {[
                  "https://tiktok.com/@anyamaharani",
                  "https://instagram.com/radityadika",
                  "https://youtube.com/@gadaborneo",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setUrl(example)}
                    className="block w-full text-left text-xs text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded px-2 py-1 transition-colors font-mono"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 dark:text-slate-300">
                Cara Kerja
              </h3>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Paste URL", desc: "Masukkan URL profil TikTok, Instagram, atau YouTube" },
                  { step: "2", title: "AI Analisis", desc: "Gemini AI membaca profil publik dan menganalisis personality, audience, dan engagement" },
                  { step: "3", title: "Profil Siap", desc: "Creator profile lengkap siap untuk matching dengan campaign" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                Powered by Google Gemini 2.5 Flash — Data diambil dari profil publik, bukan scraping.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Result Section */}
        <div>
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="relative mb-6">
                  <div className="h-20 w-20 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-violet-600" />
                </div>
                <div className="space-y-2 text-center">
                  {loadingSteps.map((step, i) => (
                    <motion.p
                      key={step}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                      className={`text-sm ${i <= loadingStep ? "text-violet-600 font-medium" : "text-slate-300"}`}
                    >
                      {i < loadingStep ? "✓" : i === loadingStep ? "⏳" : "○"} {step}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950"
              >
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setError(null)}>
                  Coba Lagi
                </Button>
              </motion.div>
            )}

            {creator && !isLoading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Profil berhasil dianalisis oleh AI</span>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold text-xl">
                        {creator.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{creator.name}</h3>
                        <p className="text-sm text-slate-500">{creator.username}</p>
                        <p className="text-sm text-slate-600 mt-1 dark:text-slate-400">{creator.bio}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {formatFollowers(creator.followers)} followers
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            ER {creator.engagementRate}%
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {creator.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Trust {creator.audienceDemo?.trustLevel}%
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {creator.niche?.map((n) => (
                            <Badge key={n} variant="default" className="text-xs">{n}</Badge>
                          ))}
                          {creator.tags?.slice(0, 3).map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {creator.personality && (
                      <div className="mt-4 rounded-lg bg-violet-50 p-4 dark:bg-violet-950">
                        <p className="text-xs font-medium text-violet-700 mb-1 dark:text-violet-300">
                          🧠 AI Personality Analysis
                        </p>
                        <p className="text-sm text-violet-800 dark:text-violet-200">
                          {creator.personality.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="text-xs">
                            <span className="text-violet-500">Tone:</span>{" "}
                            <span className="font-medium text-violet-700 dark:text-violet-300">{creator.personality.tone}</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-violet-500">Style:</span>{" "}
                            <span className="font-medium text-violet-700 dark:text-violet-300">{creator.personality.style}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Authenticity</p>
                        <Progress value={creator.personality?.authenticity || 0} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Reliability</p>
                        <Progress value={creator.reliability || 0} />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (creator) {
                            addCreator(creator);
                            setSaved(true);
                          }
                        }}
                        disabled={saved}
                      >
                        {saved ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Tersimpan
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Simpan ke Database
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => { setCreator(null); setUrl(""); }}>
                        Analisis Lagi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!creator && !isLoading && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800">
                  <Link2 className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Paste URL untuk mulai
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Masukkan URL profil TikTok, Instagram, atau YouTube di sebelah kiri. AI akan menganalisis profil publik creator secara otomatis.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
