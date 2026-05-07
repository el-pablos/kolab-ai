"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Loader2,
  Users,
  TrendingUp,
  MapPin,
  Star,
  Filter,
  Info,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Brain,
  Zap,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Creator, MatchResult } from "@/types";
import { getAllCreators } from "@/lib/data/creator-store";

function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

function CreatorCard({
  creator,
  score,
  reasoning,
}: {
  creator: Creator;
  score?: number;
  reasoning?: string;
}) {
  return (
    <Link href={`/creators/${creator.id}`}>
      <Card className="hover:shadow-lg hover:border-violet-200 transition-all duration-300 cursor-pointer group dark:hover:border-violet-800">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold text-lg">
              {creator.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors dark:text-white dark:group-hover:text-violet-400">
                  {creator.name}
                </h3>
                {score && (
                  <Badge
                    variant={
                      score >= 80
                        ? "success"
                        : score >= 60
                        ? "warning"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {score}% fit
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-500">{creator.username}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {formatFollowers(creator.followers)}
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
                  Trust {creator.audienceDemo.trustLevel}%
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {creator.niche.slice(0, 3).map((n) => (
                  <Badge key={n} variant="outline" className="text-xs">
                    {n}
                  </Badge>
                ))}
                {creator.tags.slice(0, 2).map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>

              {/* AI Reasoning */}
              {reasoning && (
                <p className="mt-2 text-xs text-violet-600 bg-violet-50 rounded-md px-2 py-1 dark:bg-violet-950 dark:text-violet-300">
                  💡 {reasoning}
                </p>
              )}

              {/* Personality */}
              <p className="mt-2 text-xs text-slate-400 italic">
                &quot;{creator.personality.style}&quot; • {creator.personality.tone}
              </p>
            </div>

            {/* Score bar */}
            {score && (
              <div className="hidden sm:block w-16 text-center">
                <div className="text-lg font-bold text-violet-600">{score}</div>
                <Progress value={score} className="mt-1 h-1.5" />
                <p className="text-[10px] text-slate-400 mt-0.5">fit score</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CreatorsPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<MatchResult[] | null>(null);
  const [showTips, setShowTips] = useState(false);
  const creators = getAllCreators();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch("/api/ai/creator-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle both old format {results} and new format {data: {results}}
        setSearchResults(data.data?.results || data.results || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Creator Discovery
          </h1>
          <p className="text-slate-500 mt-1">
            Cari creator dengan natural language — AI memahami konteks, personality, dan audience fit secara semantik.
          </p>
        </div>
        <Link href="/creators/add">
          <Button>
            <Plus className="h-4 w-4" />
            Tambah Creator
          </Button>
        </Link>
      </div>

      {/* AI Search Explanation */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30"
      >
        <Brain className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            Semantic Search — Bukan Keyword Biasa
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
            AI memahami <em>makna</em> pencarian kamu, bukan cuma mencocokkan kata. Tulis deskripsi creator yang kamu butuhkan dalam bahasa sehari-hari — AI akan mengerti konteks, personality, dan audience yang kamu cari.
          </p>
        </div>
      </motion.div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder='Contoh: "creator beauty soft-spoken yang audience-nya ibu-ibu 25-35 di Jakarta"'
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              AI Search
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Quick search suggestions */}
          <div className="mt-3">
            <p className="text-[11px] text-slate-400 mb-2 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Coba pencarian cepat:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "creator beauty premium Jakarta",
                "tech reviewer yang jujur dan chaotic",
                "ibu-ibu racun TikTok food content",
                "anak skena fashion indie Jogja",
                "gaming creator cewek bumi",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                  }}
                  className="text-xs rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:border-violet-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Pencarian — Collapsible */}
      <div>
        <button
          onClick={() => setShowTips(!showTips)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Tips Pencarian AI</span>
          {showTips ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="mt-2 border-slate-100 dark:border-slate-800">
                <CardContent className="p-4">
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">✅ Pencarian yang Bagus:</p>
                      <ul className="space-y-1.5 text-slate-500">
                        <li>&quot;Creator beauty yang tone-nya calm dan educational&quot;</li>
                        <li>&quot;Micro-influencer food Jakarta yang audience-nya keluarga&quot;</li>
                        <li>&quot;Creator tech yang sering review gadget budget&quot;</li>
                        <li>&quot;KOL lifestyle premium yang cocok untuk brand luxury&quot;</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">💡 Yang Bisa Kamu Deskripsikan:</p>
                      <ul className="space-y-1.5 text-slate-500">
                        <li>• <strong>Personality:</strong> chaotic, calm, educational, funny</li>
                        <li>• <strong>Audience:</strong> ibu-ibu, gen-z, profesional muda</li>
                        <li>• <strong>Niche:</strong> beauty, tech, food, fashion, gaming</li>
                        <li>• <strong>Lokasi:</strong> Jakarta, Bandung, Surabaya, dll</li>
                        <li>• <strong>Platform:</strong> TikTok, Instagram, YouTube</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-600 mx-auto" />
              <p className="mt-3 text-sm text-slate-500">
                AI sedang mencari creator yang cocok...
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Menganalisis personality, audience, dan fit score
              </p>
            </div>
          </div>
        )}

        {searchResults && !isSearching && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {searchResults.length} creator
                </span>{" "}
                ditemukan berdasarkan AI matching
              </p>
              <Badge variant="default" className="gap-1">
                <Sparkles className="h-3 w-3" />
                AI Ranked
              </Badge>
            </div>

            {/* Explanation of results */}
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2 dark:bg-slate-900">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>Hasil diurutkan berdasarkan fit score — semakin tinggi, semakin cocok dengan kebutuhan kamu. Klik creator untuk lihat detail.</span>
            </div>

            {searchResults.map((result, index) => (
              <motion.div
                key={result.creator.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CreatorCard
                  creator={result.creator}
                  score={result.score}
                  reasoning={result.reasoning}
                />
              </motion.div>
            ))}
          </>
        )}

        {!searchResults && !isSearching && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Semua creator ({creators.length})
              </p>
              <p className="text-xs text-slate-400">
                Gunakan AI Search untuk hasil yang lebih relevan
              </p>
            </div>
            {creators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <CreatorCard creator={creator} />
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
