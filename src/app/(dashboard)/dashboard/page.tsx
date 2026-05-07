"use client";

import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, sampleCampaigns } from "@/lib/data/campaigns";
import { creators } from "@/lib/data/creators";

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overview campaign intelligence dan creator matching
          </p>
        </div>
        <Badge variant="default" className="gap-1.5 py-1 px-3">
          <Sparkles className="h-3.5 w-3.5" />
          AI Active
        </Badge>
      </div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
      >
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
                    {sampleCampaigns.length} campaign aktif
                  </p>
                </div>
              </div>
              <button className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
                Lihat Semua
              </button>
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
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Campaign Performance
                </h3>
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
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Top Creator
                </h3>
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-4">
                {creators.slice(0, 5).map((creator, idx) => (
                  <div key={creator.id} className="flex items-center gap-3">
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
                  </div>
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
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Budget Overview
                </h3>
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
