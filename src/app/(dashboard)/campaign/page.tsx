"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  DollarSign,
  Calendar,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sampleCampaigns } from "@/lib/data/campaigns";
import Link from "next/link";

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)}M`;
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)}jt`;
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function getStatusIcon(status: string) {
  switch (status) {
    case "active":
      return <Clock className="h-4 w-4 text-emerald-500" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
    case "matching":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    default:
      return <Clock className="h-4 w-4 text-slate-400" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "success";
    case "completed":
      return "secondary";
    case "matching":
      return "warning";
    case "draft":
      return "outline";
    default:
      return "secondary";
  }
}

function getProgressValue(status: string): number {
  switch (status) {
    case "draft":
      return 10;
    case "briefing":
      return 20;
    case "matching":
      return 40;
    case "outreach":
      return 55;
    case "active":
      return 70;
    case "review":
      return 85;
    case "completed":
      return 100;
    default:
      return 0;
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "draft":
      return "Draft — Brief belum final";
    case "briefing":
      return "Briefing — Menyusun detail campaign";
    case "matching":
      return "Matching — AI sedang mencari creator";
    case "outreach":
      return "Outreach — Menghubungi creator";
    case "active":
      return "Active — Campaign sedang berjalan";
    case "review":
      return "Review — Menunggu approval konten";
    case "completed":
      return "Completed — Campaign selesai";
    default:
      return status;
  }
}

export default function CampaignPage() {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Campaign Workspace
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola semua campaign dari brief hingga completion — pantau progress dan status setiap campaign di satu tempat.
          </p>
        </div>
        <Link href="/brief">
          <Button>
            <Plus className="h-4 w-4" />
            Campaign Baru
          </Button>
        </Link>
      </div>

      {/* Status Legend — Collapsible */}
      <div>
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Panduan Status Campaign</span>
          {showLegend ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="mt-2 border-slate-100 dark:border-slate-800">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Setiap campaign melewati tahapan berikut:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 dark:bg-slate-900">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Draft</span>
                        <p className="text-slate-500">Brief belum final</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-2 dark:bg-amber-950/30">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <div>
                        <span className="font-medium text-amber-700 dark:text-amber-300">Matching</span>
                        <p className="text-amber-600 dark:text-amber-400">AI mencari creator</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950/30">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div>
                        <span className="font-medium text-emerald-700 dark:text-emerald-300">Active</span>
                        <p className="text-emerald-600 dark:text-emerald-400">Campaign berjalan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2 dark:bg-blue-950/30">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <span className="font-medium text-blue-700 dark:text-blue-300">Completed</span>
                        <p className="text-blue-600 dark:text-blue-400">Campaign selesai</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-3">
                    Progress bar menunjukkan posisi campaign di pipeline: Draft (10%) → Briefing (20%) → Matching (40%) → Outreach (55%) → Active (70%) → Review (85%) → Completed (100%)
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: "12", icon: Briefcase, color: "text-violet-600", desc: "Semua campaign" },
          { label: "Aktif", value: "3", icon: Clock, color: "text-emerald-600", desc: "Sedang berjalan" },
          { label: "Selesai", value: "8", icon: CheckCircle2, color: "text-blue-600", desc: "Campaign sukses" },
          { label: "Draft", value: "1", icon: AlertCircle, color: "text-amber-600", desc: "Menunggu action" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="text-[10px] text-slate-400">{stat.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Daftar Campaign
          </h2>
          <p className="text-xs text-slate-400">
            Klik &quot;Detail&quot; untuk melihat info lengkap
          </p>
        </div>

        {sampleCampaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800">
              <Briefcase className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
              Belum ada campaign
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              Mulai dengan upload brief campaign kamu. AI akan membantu parsing brief dan mencari creator yang cocok.
            </p>
            <Link href="/brief">
              <Button className="mt-4">
                <Plus className="h-4 w-4" />
                Buat Campaign Pertama
              </Button>
            </Link>
          </motion.div>
        ) : (
          sampleCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Campaign Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(campaign.status)}
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {campaign.brief.title}
                        </h3>
                        <Badge
                          variant={getStatusColor(campaign.status) as "default" | "secondary" | "success" | "warning" | "destructive" | "outline"}
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 ml-7">
                        {campaign.brief.brand} • {campaign.brief.objective}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 ml-7 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          {formatCurrency(campaign.brief.budget)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {campaign.brief.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {campaign.brief.deliverables.length} deliverables
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="mt-3 ml-7">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">
                            {getStatusLabel(campaign.status)}
                          </span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {getProgressValue(campaign.status)}%
                          </span>
                        </div>
                        <Progress value={getProgressValue(campaign.status)} className="h-1.5" />
                      </div>
                    </div>

                    {/* Action */}
                    <Button variant="outline" size="sm" className="shrink-0">
                      Detail
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
