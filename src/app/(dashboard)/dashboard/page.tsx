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
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, sampleCampaigns } from "@/lib/data/campaigns";
import { creators } from "@/lib/data/creators";

const statCards = [
  {
    title: "Total Campaign",
    value: dashboardStats.totalCampaigns,
    change: "+3 bulan ini",
    icon: Briefcase,
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Campaign Aktif",
    value: dashboardStats.activeCampaigns,
    change: "2 menunggu matching",
    icon: Target,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Creator Matched",
    value: dashboardStats.matchedCreators,
    change: `dari ${dashboardStats.totalCreators} total`,
    icon: Users,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Avg Fit Score",
    value: `${dashboardStats.avgFitScore}%`,
    change: "+5.2% dari bulan lalu",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview campaign intelligence dan creator matching
          </p>
        </div>
        <Badge variant="default" className="gap-1">
          <Sparkles className="h-3 w-3" />
          AI Active
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} shadow-sm`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.change}</p>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-1 dark:text-slate-400">
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-violet-600" />
                Campaign Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-900"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {campaign.brief.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {campaign.brief.brand} •{" "}
                        {formatCurrency(campaign.brief.budget)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        campaign.status === "active"
                          ? "success"
                          : campaign.status === "completed"
                          ? "secondary"
                          : "warning"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Creators */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-600" />
                Top Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {creators.slice(0, 5).map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white text-xs font-bold">
                      {creator.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate dark:text-white">
                        {creator.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        ER {creator.engagementRate}% •{" "}
                        {(creator.followers / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-violet-600">
                        Trust {creator.audienceDemo.trustLevel}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-violet-600" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Total Budget</span>
                    <span className="font-medium">
                      {formatCurrency(dashboardStats.totalBudget)}
                    </span>
                  </div>
                  <Progress value={65} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Completion Rate</span>
                    <span className="font-medium">
                      {dashboardStats.completionRate}%
                    </span>
                  </div>
                  <Progress value={dashboardStats.completionRate} />
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Campaign on track</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
