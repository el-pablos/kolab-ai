"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Briefcase,
  Target,
  DollarSign,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
  Activity,
  Upload,
  Search,
  MessageSquare,
  Rocket,
  ArrowRight,
  FileText,
  ChevronDown,
  ChevronUp,
  Compass,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats, sampleCampaigns } from "@/lib/data/campaigns";
import { getAllCreators } from "@/lib/data/creator-store";

const statCards = [
  {
    title: "Total Campaign",
    value: dashboardStats.totalCampaigns,
    change: "+3 bulan ini",
    changeType: "up" as const,
    icon: Briefcase,
  },
  {
    title: "Campaign Aktif",
    value: dashboardStats.activeCampaigns,
    change: "2 menunggu matching",
    changeType: "up" as const,
    icon: Target,
  },
  {
    title: "Creator Matched",
    value: dashboardStats.matchedCreators,
    change: `dari ${dashboardStats.totalCreators} total`,
    changeType: "up" as const,
    icon: Users,
  },
  {
    title: "Avg Fit Score",
    value: `${dashboardStats.avgFitScore}%`,
    change: "+5.2% dari bulan lalu",
    changeType: "up" as const,
    icon: TrendingUp,
  },
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  }
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(0)}jt`;
  }
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 py-0.5 pr-2.5 pl-2 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 py-0.5 pr-2.5 pl-2 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          Completed
        </span>
      );
    case "matching":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 py-0.5 pr-2.5 pl-2 text-xs font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Matching
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 py-0.5 pr-2.5 pl-2 text-xs font-medium text-gray-600">
          {status}
        </span>
      );
  }
}

export default function DashboardPage() {
  const creators = getAllCreators();
  const [showAbout, setShowAbout] = useState(false);

  const guideSteps = [
    {
      step: 1,
      title: "Upload Brief",
      desc: "Paste campaign brief, AI parse otomatis",
      icon: FileText,
      href: "/brief",
      color: "violet",
    },
    {
      step: 2,
      title: "Cari Creator",
      desc: "Semantic search atau tambah via URL",
      icon: Users,
      href: "/creators",
      color: "indigo",
    },
    {
      step: 3,
      title: "AI Matching",
      desc: "Brief dicocokkan dengan creator",
      icon: Sparkles,
      href: "/creators",
      color: "amber",
    },
    {
      step: 4,
      title: "Kelola Campaign",
      desc: "Track progress sampai selesai",
      icon: Briefcase,
      href: "/campaign",
      color: "emerald",
    },
  ] as const;

  const colorMap = {
    violet: {
      bg: "bg-violet-100 dark:bg-violet-500/20",
      text: "text-violet-600 dark:text-violet-400",
      hover: "hover:border-violet-300 dark:hover:border-violet-700",
      number: "bg-violet-600 text-white",
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-500/20",
      text: "text-indigo-600 dark:text-indigo-400",
      hover: "hover:border-indigo-300 dark:hover:border-indigo-700",
      number: "bg-indigo-600 text-white",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
      hover: "hover:border-amber-300 dark:hover:border-amber-700",
      number: "bg-amber-600 text-white",
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-700",
      number: "bg-emerald-600 text-white",
    },
  } as const;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Selamat Datang di KOLab AI
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Platform AI-powered untuk influencer marketing Indonesia — dari brief sampai campaign selesai.
          </p>
        </div>
        <Badge variant="default" className="gap-1.5 py-1 px-3">
          <Sparkles className="h-3.5 w-3.5" />
          AI Active
        </Badge>
      </div>

      {/* Panduan Cepat */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-sm shadow-violet-300/30 dark:shadow-violet-800/30">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Panduan Cepat
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                4 langkah dari brief sampai campaign selesai
              </p>
            </div>
          </div>
          <Link href="/brief">
            <Button size="sm">
              <Rocket className="h-3.5 w-3.5" />
              Mulai dari sini
            </Button>
          </Link>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {guideSteps.map((step, index) => {
              const colors = colorMap[step.color];
              return (
                <Link key={step.step} href={step.href} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Card className={`h-full transition-all duration-200 cursor-pointer group hover:shadow-md ${colors.hover}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${colors.number}`}>
                            {step.step}
                          </span>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} group-hover:scale-110 transition-transform`}>
                            <step.icon className={`h-4 w-4 ${colors.text}`} />
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {step.desc}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-xs font-medium text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Buka</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Tentang KOLab AI — Collapsible */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors"
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Tentang KOLab AI</span>
          {showAbout ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {showAbout && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="mt-2 border-slate-100 dark:border-slate-800">
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>KOLab AI</strong> adalah platform AI-powered yang bantu kamu jalanin influencer marketing campaign dari A sampai Z.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900">
                      <FileText className="h-3.5 w-3.5 text-violet-500 shrink-0 mt-0.5" />
                      <span><strong>Brief Parsing</strong> — AI baca brief kamu dan ekstrak semua info penting otomatis</span>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900">
                      <Search className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span><strong>Semantic Search</strong> — Cari creator pakai bahasa sehari-hari, AI paham konteksnya</span>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>AI Matching</strong> — Cocokkan brief dengan creator berdasarkan personality dan audience</span>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-900">
                      <BarChart3 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Campaign Tracking</strong> — Pantau progress setiap campaign di satu dashboard</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <Link href="/brief" className="block">
          <Card className="hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group dark:hover:border-violet-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/20 group-hover:scale-110 transition-transform">
                <Upload className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">Upload Brief</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Parse campaign brief dengan AI</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/creators" className="block">
          <Card className="hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group dark:hover:border-violet-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20 group-hover:scale-110 transition-transform">
                <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">Cari Creator</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Semantic search dengan AI</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/chat" className="block">
          <Card className="hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group dark:hover:border-violet-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">Chat AI</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tanya apa aja soal campaign</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Overview Metrics</h2>
          <p className="text-xs text-gray-400">Ringkasan performa campaign dan creator matching</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className={`p-5 md:p-6 ${
                index < statCards.length - 1
                  ? "border-b sm:border-b xl:border-b-0 border-gray-200 dark:border-gray-800"
                  : ""
              } ${
                index % 2 === 0 && index < statCards.length - 1
                  ? "sm:border-r border-gray-200 dark:border-gray-800"
                  : ""
              } ${
                index < 2
                  ? "xl:border-r xl:border-b-0 border-gray-200 dark:border-gray-800"
                  : index === 2
                    ? "xl:border-r border-gray-200 dark:border-gray-800"
                    : ""
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800">
                <stat.icon className="h-6 w-6 text-gray-800 dark:text-white/90" />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </span>
                  <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
                    {stat.value}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-xs font-medium ${
                    stat.changeType === "up"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {stat.changeType === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Active Campaigns */}
        <div className="col-span-12 xl:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/20">
                  <Briefcase className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Campaign Terbaru
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {sampleCampaigns.length} campaign — klik untuk detail
                  </p>
                </div>
              </div>
              <Link href="/campaign" className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                Lihat Semua
              </Link>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-3">
                {sampleCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors dark:border-gray-800 dark:hover:bg-white/[0.02]"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
                        {campaign.brief.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {campaign.brief.brand} •{" "}
                        {formatCurrency(campaign.brief.budget)}
                      </p>
                    </div>
                    {getStatusBadge(campaign.status)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chart placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 md:mt-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <BarChart3 className="h-5 w-5 text-gray-800 dark:text-white/90" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Campaign Performance
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Visualisasi reach dan engagement campaign
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                  <span className="text-gray-500 dark:text-gray-400">Reach</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
                  <span className="text-gray-500 dark:text-gray-400">Engagement</span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center p-5 md:p-6 h-[200px]">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Activity className="h-8 w-8" />
                <p className="text-sm">Chart akan ditampilkan di sini</p>
                <p className="text-xs text-gray-300">Data terakumulasi setelah campaign berjalan</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xl:col-span-4 space-y-4 md:space-y-6">
          {/* Top Creators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/20">
                  <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Top Creator
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Berdasarkan trust level
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-4">
                {creators.slice(0, 5).map((creator, idx) => (
                  <Link key={creator.id} href={`/creators/${creator.id}`} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 -m-1 transition-colors dark:hover:bg-white/[0.02]">
                    <span className="text-xs font-medium text-gray-400 w-4">
                      {idx + 1}
                    </span>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white text-xs font-bold">
                      {creator.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate dark:text-white/90">
                        {creator.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ER {creator.engagementRate}% •{" "}
                        {(creator.followers / 1000).toFixed(0)}K followers
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                        {creator.audienceDemo.trustLevel}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Budget Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <DollarSign className="h-5 w-5 text-gray-800 dark:text-white/90" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Budget Overview
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Alokasi dan utilisasi budget
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Total Budget
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {formatCurrency(dashboardStats.totalBudget)}
                    </span>
                  </div>
                  <Progress value={65} />
                  <p className="text-[11px] text-gray-400 mt-1">65% sudah dialokasikan ke campaign</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Completion Rate
                    </span>
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {dashboardStats.completionRate}%
                    </span>
                  </div>
                  <Progress value={dashboardStats.completionRate} />
                  <p className="text-[11px] text-gray-400 mt-1">Campaign yang selesai tepat waktu</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    Campaign on track
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
