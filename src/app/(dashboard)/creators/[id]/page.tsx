"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  MapPin,
  Star,
  Heart,
  Shield,
  Zap,
  DollarSign,
  Eye,
  MessageSquare,
  Briefcase,
  Info,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCreators } from "@/lib/data/creator-store";
import { Creator } from "@/types";

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

function formatCurrency(amount: number): string {
  return `Rp ${(amount / 1000000).toFixed(0)}jt`;
}

function MetricTooltip({ text }: { text: string }) {
  return (
    <div className="relative group/tip inline-flex ml-1">
      <HelpCircle className="h-3 w-3 text-slate-400 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none w-48 text-center z-10 leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}

export default function CreatorProfilePage() {
  const params = useParams();
  const creatorId = params.id as string;
  const allCreators = getAllCreators();
  const creator = allCreators.find((c: Creator) => c.id === creatorId);
  const [showMetricInfo, setShowMetricInfo] = useState(false);

  if (!creator) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-slate-700">
          Creator tidak ditemukan
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Creator dengan ID ini tidak ada di database kami.
        </p>
        <Link href="/creators">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Discovery
          </Button>
        </Link>
      </div>
    );
  }

  const personalityMetrics = [
    {
      label: "Authenticity",
      value: creator.personality.authenticity,
      tooltip: "Seberapa genuine dan asli konten creator ini. Skor tinggi = jarang terasa 'iklan banget'.",
    },
    {
      label: "Audience Trust",
      value: creator.audienceDemo.trustLevel,
      tooltip: "Tingkat kepercayaan audience terhadap rekomendasi creator. Diukur dari engagement quality & sentiment.",
    },
    {
      label: "Purchase Intent",
      value: creator.audienceDemo.purchaseIntent,
      tooltip: "Persentase audience yang cenderung membeli produk setelah direkomendasikan creator ini.",
    },
    {
      label: "Reliability",
      value: creator.reliability,
      tooltip: "Track record creator dalam memenuhi deadline dan deliverables. Skor tinggi = jarang telat atau revisi berlebihan.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/creators">
        <Button variant="ghost" size="sm" className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Discovery
        </Button>
      </Link>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold text-3xl shadow-lg shadow-violet-500/20">
                {creator.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {creator.name}
                  </h1>
                  <Badge variant="default">{creator.personality.style}</Badge>
                </div>
                <p className="text-slate-500 mt-1">{creator.username}</p>
                <p className="text-sm text-slate-600 mt-2 dark:text-slate-400">
                  {creator.bio}
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-violet-500" />
                    {formatFollowers(creator.followers)} followers
                  </span>
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    {creator.engagementRate}% ER
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-blue-500" />
                    {formatFollowers(creator.avgViews)} avg views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    {creator.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-slate-500" />
                    {creator.pastCampaigns} campaigns
                  </span>
                </div>

                {/* Platforms & Niche */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {creator.platform.map((p) => (
                    <Badge key={p} variant="outline" className="capitalize">
                      {p}
                    </Badge>
                  ))}
                  {creator.niche.map((n) => (
                    <Badge key={n} variant="secondary">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="personality" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personality">AI Personality</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        {/* Personality Tab */}
        <TabsContent value="personality">
          <div className="grid md:grid-cols-2 gap-4">
            {/* AI Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-5 w-5 text-violet-600" />
                  AI Personality Analysis
                </CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Analisis personality creator berdasarkan konten dan interaksi mereka
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                  {creator.personality.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                    <p className="text-xs text-slate-500">Tone</p>
                    <p className="text-sm font-medium mt-0.5">
                      {creator.personality.tone}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                    <p className="text-xs text-slate-500">Energy</p>
                    <p className="text-sm font-medium mt-0.5">
                      {creator.personality.energy}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                    <p className="text-xs text-slate-500">Humor</p>
                    <p className="text-sm font-medium mt-0.5">
                      {creator.personality.humor}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
                    <p className="text-xs text-slate-500">Style</p>
                    <p className="text-sm font-medium mt-0.5">
                      {creator.personality.style}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="h-5 w-5 text-violet-600" />
                    Trust & Performance Metrics
                  </CardTitle>
                  <button
                    onClick={() => setShowMetricInfo(!showMetricInfo)}
                    className="text-xs text-slate-400 hover:text-violet-600 flex items-center gap-1 transition-colors"
                  >
                    <Info className="h-3.5 w-3.5" />
                    Apa artinya?
                  </button>
                </div>
                {showMetricInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 mt-2 dark:bg-slate-900"
                  >
                    Metrik ini dihitung AI berdasarkan analisis konten, engagement pattern, dan track record campaign sebelumnya. Skor 80+ = sangat baik, 60-79 = baik, di bawah 60 = perlu pertimbangan.
                  </motion.div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalityMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-600 dark:text-slate-400 flex items-center">
                          {metric.label}
                          <MetricTooltip text={metric.tooltip} />
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {metric.value}%
                        </span>
                      </div>
                      <Progress value={metric.value} />
                    </div>
                  ))}
                </div>

                {/* Content Style */}
                <div className="mt-6">
                  <p className="text-xs text-slate-500 mb-2">Content Style</p>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.contentStyle.map((style) => (
                      <Badge key={style} variant="outline" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-violet-600" />
                Audience Demographics
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Data demografi audience creator ini — gunakan untuk memastikan audience mereka sesuai target campaign kamu
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-500 mb-1">Age Range</p>
                  <p className="text-lg font-semibold">
                    {creator.audienceDemo.ageRange}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Mayoritas usia audience</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-500 mb-1">Gender</p>
                  <p className="text-lg font-semibold">
                    {creator.audienceDemo.gender}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Distribusi gender audience</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-xs text-slate-500 mb-1">Location</p>
                  <p className="text-lg font-semibold">
                    {creator.audienceDemo.location}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Lokasi dominan audience</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.audienceDemo.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5" />
                        Trust Level
                        <MetricTooltip text="Seberapa besar audience mempercayai rekomendasi creator ini. Diukur dari engagement quality." />
                      </span>
                      <span className="font-semibold">
                        {creator.audienceDemo.trustLevel}%
                      </span>
                    </div>
                    <Progress value={creator.audienceDemo.trustLevel} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        Purchase Intent
                        <MetricTooltip text="Persentase audience yang cenderung membeli setelah melihat rekomendasi dari creator ini." />
                      </span>
                      <span className="font-semibold">
                        {creator.audienceDemo.purchaseIntent}%
                      </span>
                    </div>
                    <Progress value={creator.audienceDemo.purchaseIntent} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-violet-600" />
                Rate Card
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Harga ini berdasarkan rate card resmi creator. Harga aktual bisa berbeda tergantung scope, durasi, dan negosiasi.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 p-5 text-center dark:border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Feed Post
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-2 dark:text-white">
                    {formatCurrency(creator.pricing.postRate)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">per post</p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 p-5 text-center dark:border-violet-800 dark:bg-violet-950">
                  <p className="text-xs text-violet-600 uppercase tracking-wide font-medium">
                    Video Content
                  </p>
                  <p className="text-2xl font-bold text-violet-700 mt-2 dark:text-violet-300">
                    {formatCurrency(creator.pricing.videoRate)}
                  </p>
                  <p className="text-xs text-violet-500 mt-1">per video</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-5 text-center dark:border-slate-800">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Story/Reels
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-2 dark:text-white">
                    {formatCurrency(creator.pricing.storyRate)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">per story</p>
                </div>
              </div>

              {/* Pricing context */}
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3 dark:bg-amber-950/30 dark:border-amber-900">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                    <p className="font-medium">Catatan tentang harga:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-600 dark:text-amber-400">
                      <li>Rate card bisa berubah tergantung scope campaign</li>
                      <li>Paket bundling (multi-post) biasanya dapat diskon 10-20%</li>
                      <li>Harga belum termasuk biaya produksi tambahan (jika ada)</li>
                      <li>Negosiasi langsung dengan creator untuk harga final</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
