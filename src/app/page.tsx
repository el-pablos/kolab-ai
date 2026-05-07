"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Brain,
  Users,
  Target,
  Zap,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/page-loader";

const features = [
  {
    icon: Brain,
    title: "Brief Parser AI",
    description:
      "Upload campaign brief dalam format apapun — AI memahami objective, tone, target audience, dan deliverables secara otomatis.",
  },
  {
    icon: Users,
    title: "Semantic Creator Matching",
    description:
      "Bukan sekadar filter followers & ER. AI memahami personality, vibe, dan audience trust setiap creator.",
  },
  {
    icon: Target,
    title: "Indonesian Context",
    description:
      'Memahami "cewek bumi", "anak skena", "ibu-ibu racun TikTok" — konteks lokal yang model luar ga ngerti.',
  },
  {
    icon: BarChart3,
    title: "Campaign Intelligence",
    description:
      "Bukan dashboard biasa. AI yang belajar dari setiap campaign — siapa yang perform, siapa yang chaos.",
  },
  {
    icon: MessageSquare,
    title: "AI Campaign Assistant",
    description:
      "Chat dengan AI yang ngerti campaign lu. Tanya rekomendasi, analisis, atau strategi kapan aja.",
  },
  {
    icon: Shield,
    title: "Trust & Risk Analysis",
    description:
      "Deteksi fake engagement, prediksi creator risk, dan analisis audience trust yang mendalam.",
  },
];

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#fff" }}>
      {/* Page Loader */}
      <PageLoader duration={2500} />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION — Full screen violet with grid */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 40%, #2563eb 100%)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-blue-400/15 blur-3xl" />
        </div>

        {/* Navbar */}
        <nav className="relative z-30 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">KOLab AI</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {["Fitur", "Cara Kerja", "Teknologi"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="px-4 py-1.5 rounded-full border border-white/20 text-white/90 text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <Link href="/dashboard">
            <button className="px-6 py-2.5 rounded-full bg-white text-violet-700 text-sm font-bold hover:bg-white/90 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Masuk Dashboard →
            </button>
          </Link>
        </nav>

        {/* Hero Content */}
        <motion.main
          className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 pb-32 pt-8"
          style={{ y: heroY }}
        >
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Floating cards — desktop */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -bottom-8 -left-24 z-10"
            >
              <div className="w-48 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex flex-col items-center rotate-[-8deg] shadow-2xl hover:rotate-0 transition-transform duration-500"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-300 to-indigo-400 flex items-center justify-center text-white font-bold text-xl border-2 border-white/40">
                  🎯
                </div>
                <p className="font-bold text-sm text-white mt-3">98% Accuracy</p>
                <p className="text-[10px] text-white/70 mt-0.5">AI Matching Score</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:block absolute -top-4 -right-24 z-10"
            >
              <div className="w-48 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex flex-col items-center rotate-[8deg] shadow-2xl hover:rotate-0 transition-transform duration-500"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center text-white font-bold text-xl border-2 border-white/40">
                  🚀
                </div>
                <p className="font-bold text-sm text-white mt-3">156+ Creators</p>
                <p className="text-[10px] text-white/70 mt-0.5">Indonesian KOLs</p>
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full animate-ping opacity-70 bg-emerald-400" />
                <span className="relative block w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                Powered by Google Gemini AI
              </span>
            </motion.div>

            {/* Bold Typography — Stacked */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center space-y-1 md:space-y-2"
            >
              <h1
                className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.9] tracking-tighter text-white uppercase"
                style={{
                  fontFamily: '"Inter", "Arial Black", sans-serif',
                  textShadow: "0 4px 30px rgba(0,0,0,0.3)",
                }}
              >
                <span className="text-white/40">AI</span> Intelligence
              </h1>
              <h1
                className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1] tracking-tight text-white"
              >
                untuk Creator Economy
              </h1>
              <h1
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter uppercase"
                style={{
                  fontFamily: '"Inter", "Arial Black", sans-serif',
                  color: "rgba(255,255,255,0.15)",
                  WebkitTextStroke: "2px rgba(255,255,255,0.6)",
                }}
              >
                Indonesia
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
            >
              Bukan sekadar database KOL. KOLab AI adalah{" "}
              <span className="font-semibold text-white">campaign intelligence engine</span>{" "}
              yang memahami personality creator, audience trust, dan konteks lokal Indonesia secara semantik.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/dashboard">
                <button className="group px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-base shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all">
                  Mulai Sekarang
                  <ArrowRight className="inline-block ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/brief">
                <button className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm">
                  Upload Brief
                </button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
            >
              {[
                { value: "156+", label: "Creator Profiles" },
                { value: "98%", label: "Akurasi Matching" },
                { value: "< 5s", label: "Brief Parsing" },
                { value: "10+", label: "Niche Indonesia" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-white/50 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.main>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CONTENT — White section with parallax overlap */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-20 bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.1)]"
        style={{ y: contentY, marginTop: "-4rem" }}
      >
        {/* Features Section */}
        <section id="fitur" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Bukan Platform KOL Biasa
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
                AI yang benar-benar memahami creator dan campaign secara semantik
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 hover:shadow-xl hover:border-violet-200 hover:bg-white transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="cara-kerja" className="py-20 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Cara Kerja
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                3 langkah dari brief ke creator yang sempurna
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Brief",
                  description:
                    "Paste atau upload campaign brief. AI langsung parsing objective, tone, audience, budget, dan deliverables.",
                },
                {
                  step: "02",
                  title: "AI Matching",
                  description:
                    "Gemini AI mencocokkan brief dengan creator berdasarkan semantic fit — personality, audience trust, dan konteks lokal.",
                },
                {
                  step: "03",
                  title: "Intelligence Report",
                  description:
                    "Dapatkan ranked list creator dengan reasoning detail kenapa mereka cocok. Plus risk analysis dan recommendation.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative text-center group"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-black text-white shadow-xl shadow-violet-500/25 group-hover:shadow-violet-500/40 group-hover:scale-105 transition-all">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="teknologi" className="py-20 border-t border-slate-100 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Dibangun dengan Teknologi Terbaik
              </h2>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { name: "Google Gemini 2.0", color: "border-blue-200 bg-blue-50 text-blue-700" },
                { name: "Next.js 16", color: "border-slate-200 bg-slate-50 text-slate-700" },
                { name: "TypeScript", color: "border-blue-200 bg-blue-50 text-blue-700" },
                { name: "Tailwind CSS", color: "border-cyan-200 bg-cyan-50 text-cyan-700" },
                { name: "Google Cloud Run", color: "border-orange-200 bg-orange-50 text-orange-700" },
                { name: "Framer Motion", color: "border-purple-200 bg-purple-50 text-purple-700" },
              ].map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm ${tech.color}`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
              }}
            >
              {/* Grid inside CTA */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  Siap Revolusi Campaign Strategy?
                </h2>
                <p className="mt-4 text-lg text-white/70">
                  Mulai gunakan AI intelligence untuk menemukan creator yang benar-benar cocok.
                </p>
                <Link href="/dashboard">
                  <button className="mt-8 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition-all">
                    Masuk Dashboard
                    <ArrowRight className="inline-block ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 py-10">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">KOLab AI</span>
            </div>
            <p className="text-sm text-slate-500">
              Built with ❤️ for #JuaraVibeCoding 2026 — Powered by Google Gemini AI
            </p>
            <p className="mt-1 text-xs text-slate-400">
              © 2026 El Pablo. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
