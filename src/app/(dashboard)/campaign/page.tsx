"use client";

import React from "react";
import { motion } from "framer-motion";
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

export default function CampaignPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Campaign Workspace
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola semua campaign dari brief hingga completion
          </p>
        </div>
        <Link href="/brief">
          <Button>
            <Plus className="h-4 w-4" />
            Campaign Baru
          </Button>
        </Link>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: "12", icon: Briefcase, color: "text-violet-600" },
          { label: "Aktif", value: "3", icon: Clock, color: "text-emerald-600" },
          { label: "Selesai", value: "8", icon: CheckCircle2, color: "text-blue-600" },
          { label: "Draft", value: "1", icon: AlertCircle, color: "text-amber-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {sampleCampaigns.map((campaign, index) => (
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
                        <span className="text-slate-500">Progress</span>
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
        ))}
      </div>
    </div>
  );
}
