"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Sparkles, Loader2, CheckCircle2, Link2, Users, TrendingUp,
  MapPin, Star, AlertCircle, Globe, Shield, Heart, Eye, DollarSign,
  Briefcase, Info, ChevronDown, ChevronUp, Zap, Brain, BarChart3, Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)}jt`;
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

const loadingSteps = [
  { label: "Mendeteksi platform dan username...", icon: Search },
  { label: "Menganalisis personality creator...", icon: Brain },
  { label: "Mendeteksi audience demographics...", icon: Users },
  { label: "Mengestimasi engagement quality...", icon: BarChart3 },
  { label: "Membuat profil intelligence...", icon: Sparkles },
];

const supportedPlatforms = [
  { name: "TikTok", example: "https://tiktok.com/@username", color: "bg-slate-900 text-white" },
  { name: "Instagram", example: "https://instagram.com/username", color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white" },
  { name: "YouTube", example: "https://youtube.com/@channel", color: "bg-red-600 text-white" },
];

const metricExplanations = [
  { label: "Authenticity", icon: Shield, key: "authenticity" as const, desc: "Seberapa genuine konten creator. Skor tinggi = jarang endorse produk yang ga relevan, audience percaya rekomendasinya." },
  { label: "Trust Level", icon: Heart, key: "trustLevel" as const, desc: "Tingkat kepercayaan audience terhadap creator. Diukur dari kualitas interaksi, bukan sekadar jumlah likes." },
  { label: "Reliability", icon: CheckCircle2, key: "reliability" as const, desc: "Track record creator dalam memenuhi deadline dan deliverables campaign. Skor tinggi = jarang telat, konten sesuai brief." },
  { label: "Purchase Intent", icon: DollarSign, key: "purchaseIntent" as const, desc: "Seberapa besar kemungkinan audience membeli produk yang direkomendasikan creator." },
];

function getMetricValue(creator: Creator, key: string): number {
  if (key === "authenticity") return creator.personality?.authenticity || 0;
  if (key === "trustLevel") return creator.audienceDemo?.trustLevel || 0;
  if (key === "reliability") return creator.reliability || 0;
  if (key === "purchaseIntent") return creator.audienceDemo?.purchaseIntent || 0;
  return 0;
}

export default function AddCreatorPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

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
      if (!response.ok) throw new Error(data.error || "Gagal menganalisis creator");
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

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tambah Creator Baru</h1>
          <p className="text-slate-500 mt-1 max-w-xl">
            Masukkan URL profil sosial media creator. AI akan menganalisis dan membuat profil intelligence secara otomatis berdasarkan knowledge base Gemini.
          </p>
        </div>
        <Badge variant="default" className="gap-1 shrink-0">
          <Sparkles className="h-3 w-3" />
          Gemini 2.5 Flash
        </Badge>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Link2 className="h-5 w-5 text-violet-600" />
                URL Profil Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="https://tiktok.com/@username" className="pl-10 h-12 text-base" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAnalyze()} />
              </div>

              {platform && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600 font-medium">Platform terdeteksi: {platform}</span>
                </motion.div>
              )}

              {url.trim() && !platform && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">URL belum dikenali. Pastikan dari TikTok, Instagram, atau YouTube.</span>
                </div>
              )}

              <Button onClick={handleAnalyze} disabled={!url.trim() || !platform || isLoading} className="w-full" size="lg">
                {isLoading ? (<><Loader2 className="h-4 w-4 animate-spin" />Menganalisis...</>) : (<><Sparkles className="h-4 w-4" />Analisis dengan AI</>)}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-slate-600 mb-3 dark:text-slate-400">Platform yang Didukung</p>
              <div className="space-y-2">
                {supportedPlatforms.map((p) => (
                  <button key={p.name} onClick={() => setUrl(p.example)} className="w-full flex items-center gap-3 rounded-lg border border-slate-100 p-2.5 hover:border-violet-200 hover:bg-violet-50/50 transition-colors text-left dark:border-slate-800 dark:hover:border-violet-800">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${p.color}`}>{p.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{p.name}</p>
                      <p className="text-xs text-slate-400 font-mono truncate">{p.example}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <button onClick={() => setShowGuide(!showGuide)} className="w-full flex items-center justify-between text-left">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 dark:text-slate-400"><Info className="h-3.5 w-3.5" />Bagaimana Cara Kerjanya?</span>
                {showGuide ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {showGuide && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="space-y-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {[
                        { step: "1", icon: Link2, title: "Paste URL", desc: "Masukkan URL profil publik dari TikTok, Instagram, atau YouTube" },
                        { step: "2", icon: Brain, title: "AI Analisis", desc: "Gemini AI menganalisis creator berdasarkan knowledge base — personality, audience, engagement" },
                        { step: "3", icon: Zap, title: "Profil Siap", desc: "Creator profile lengkap siap untuk matching dengan campaign brief" },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                            <item.icon className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 dark:bg-amber-950/30 dark:border-amber-900">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Tentang Akurasi Data</p>
                            <p className="text-xs text-amber-600 mt-0.5 dark:text-amber-400">AI menganalisis berdasarkan knowledge base, bukan live scraping. Untuk creator terkenal, data cukup akurat. Untuk creator kecil/baru, AI memberikan estimasi realistis.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card><CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                      <div className="h-20 w-20 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1 dark:text-slate-300">Menganalisis Creator</h3>
                    <p className="text-sm text-slate-400 mb-6">Gemini AI sedang memproses profil...</p>
                    <div className="w-full max-w-sm space-y-3">
                      {loadingSteps.map((step, i) => (
                        <motion.div key={step.label} initial={{ opacity: 0.3 }} animate={{ opacity: i <= loadingStep ? 1 : 0.3 }} className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${i < loadingStep ? "bg-emerald-100 dark:bg-emerald-900" : i === loadingStep ? "bg-violet-100 dark:bg-violet-900" : "bg-slate-100 dark:bg-slate-800"}`}>
                            {i < loadingStep ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : i === loadingStep ? <Loader2 className="h-4 w-4 text-violet-600 animate-spin" /> : <step.icon className="h-4 w-4 text-slate-400" />}
                          </div>
                          <span className={`text-sm ${i <= loadingStep ? "text-slate-700 font-medium dark:text-slate-300" : "text-slate-400"}`}>{step.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent></Card>
              </motion.div>
            )}

            {error && !isLoading && (
              <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Card className="border-red-200 dark:border-red-900"><CardContent className="p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 mx-auto mb-4 dark:bg-red-900"><AlertCircle className="h-7 w-7 text-red-500" /></div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Gagal Menganalisis</h3>
                  <p className="text-sm text-red-600 mt-2 max-w-md mx-auto dark:text-red-400">{error}</p>
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <Button onClick={handleAnalyze}>Coba Lagi</Button>
                    <Button variant="outline" onClick={() => { setError(null); setUrl(""); }}>Ganti URL</Button>
                  </div>
                </CardContent></Card>
              </motion.div>
            )}

            {creator && !isLoading && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /><span className="text-sm font-medium">Profil berhasil dianalisis</span></div>
                  <Badge variant="warning" className="text-[10px]">AI Estimation</Badge>
                </div>

                <Card><CardContent className="p-6">
                  <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold text-2xl shadow-lg shadow-violet-500/20">{creator.name?.charAt(0) || "?"}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{creator.name}</h3>
                      <p className="text-sm text-slate-500">{creator.username}</p>
                      <p className="text-sm text-slate-600 mt-1 dark:text-slate-400">{creator.bio}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {creator.platform?.map((p) => (<Badge key={p} variant="outline" className="text-xs capitalize">{p}</Badge>))}
                        {creator.niche?.map((n) => (<Badge key={n} variant="default" className="text-xs">{n}</Badge>))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-100 dark:border-slate-800">
                    {[
                      { icon: Users, label: "Followers", value: formatFollowers(creator.followers || 0) },
                      { icon: TrendingUp, label: "Engagement Rate", value: `${creator.engagementRate || 0}%` },
                      { icon: Eye, label: "Avg Views", value: formatFollowers(creator.avgViews || 0) },
                      { icon: MapPin, label: "Lokasi", value: creator.location || "-" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <stat.icon className="h-4 w-4 text-violet-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                        <p className="text-[10px] text-slate-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <Tabs defaultValue="personality" className="mt-4">
                    <TabsList className="w-full">
                      <TabsTrigger value="personality" className="flex-1">Personality</TabsTrigger>
                      <TabsTrigger value="metrics" className="flex-1">Metrik</TabsTrigger>
                      <TabsTrigger value="pricing" className="flex-1">Pricing</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personality" className="mt-4">
                      {creator.personality && (
                        <div className="space-y-3">
                          <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-950/50">
                            <div className="flex items-center gap-2 mb-2"><Brain className="h-4 w-4 text-violet-600" /><p className="text-sm font-semibold text-violet-700 dark:text-violet-300">AI Personality Analysis</p></div>
                            <p className="text-sm text-violet-800 leading-relaxed dark:text-violet-200">{creator.personality.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: "Tone", value: creator.personality.tone },
                              { label: "Energy", value: creator.personality.energy },
                              { label: "Humor", value: creator.personality.humor },
                              { label: "Style", value: creator.personality.style },
                            ].map((attr) => (
                              <div key={attr.label} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{attr.label}</p>
                                <p className="text-sm font-medium text-slate-700 mt-0.5 dark:text-slate-300">{attr.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="metrics" className="mt-4 space-y-3">
                      {metricExplanations.map((metric) => {
                        const value = getMetricValue(creator, metric.key);
                        return (
                          <div key={metric.label} className="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2"><metric.icon className="h-4 w-4 text-violet-500" /><span className="text-sm font-medium text-slate-700 dark:text-slate-300">{metric.label}</span></div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{Math.round(value)}%</span>
                            </div>
                            <Progress value={value} className="h-1.5 mb-2" />
                            <p className="text-[11px] text-slate-400 leading-relaxed">{metric.desc}</p>
                          </div>
                        );
                      })}
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-4">
                      {creator.pricing && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: "Feed Post", value: creator.pricing.postRate },
                              { label: "Video", value: creator.pricing.videoRate },
                              { label: "Story/Reels", value: creator.pricing.storyRate },
                            ].map((rate) => (
                              <div key={rate.label} className="rounded-xl border border-slate-200 p-4 text-center dark:border-slate-800">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{rate.label}</p>
                                <p className="text-lg font-bold text-slate-900 mt-1 dark:text-white">{formatCurrency(rate.value || 0)}</p>
                                <p className="text-[10px] text-slate-400">per konten</p>
                              </div>
                            ))}
                          </div>
                          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                            <div className="flex items-start gap-2"><Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" /><p className="text-xs text-slate-500">Harga di atas adalah estimasi AI berdasarkan followers, engagement rate, dan niche creator. Harga aktual bisa berbeda — negosiasi langsung dengan creator untuk rate final.</p></div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button className="flex-1" size="lg" onClick={() => { if (creator) { addCreator(creator); setSaved(true); } }} disabled={saved}>
                      {saved ? (<><CheckCircle2 className="h-4 w-4" />Tersimpan di Database</>) : (<><Sparkles className="h-4 w-4" />Simpan ke Database</>)}
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => { setCreator(null); setUrl(""); }}>Analisis Lagi</Button>
                  </div>

                  {saved && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3 dark:bg-emerald-950/30 dark:border-emerald-900">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Creator berhasil disimpan</p>
                          <p className="text-xs text-emerald-600 mt-0.5 dark:text-emerald-400">Creator sekarang muncul di halaman Discovery dan bisa di-match dengan campaign brief. <Link href="/creators" className="underline font-medium">Lihat di Discovery</Link></p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent></Card>
              </motion.div>
            )}

            {!creator && !isLoading && !error && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card><CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 mx-auto mb-4 dark:bg-slate-800"><Link2 className="h-8 w-8 text-slate-400" /></div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Paste URL untuk Mulai</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">Masukkan URL profil TikTok, Instagram, atau YouTube di panel kiri. AI akan menganalisis profil creator dan menghasilkan intelligence report lengkap.</p>
                  </div>
                  <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500 mb-4 text-center">APA YANG AKAN KAMU DAPATKAN</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: Brain, title: "Personality Analysis", desc: "Tone, humor style, energy level, dan authenticity score" },
                        { icon: Users, title: "Audience Demographics", desc: "Usia, gender, lokasi, interests, dan trust level" },
                        { icon: BarChart3, title: "Engagement Metrics", desc: "ER, avg views, reliability score, dan purchase intent" },
                        { icon: DollarSign, title: "Pricing Estimation", desc: "Estimasi rate card untuk post, video, dan story" },
                        { icon: Briefcase, title: "Campaign Readiness", desc: "Profil siap untuk matching dengan campaign brief" },
                        { icon: Shield, title: "Trust & Risk Score", desc: "Analisis kepercayaan audience dan risk assessment" },
                      ].map((item) => (
                        <div key={item.title} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/50"><item.icon className="h-4 w-4 text-violet-600 dark:text-violet-400" /></div>
                          <div><p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.title}</p><p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent></Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
