"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">KOLab AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
              Fitur
            </a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
              Cara Kerja
            </a>
            <a href="#tech" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">
              Teknologi
            </a>
          </div>
          <Link href="/dashboard">
            <Button size="sm">
              Masuk Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
                <Zap className="h-3.5 w-3.5" />
                Powered by Google Gemini AI
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
            >
              <span className="gradient-text">AI Intelligence</span>
              <br />
              untuk Creator Economy
              <br />
              Indonesia
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            >
              Bukan sekadar database KOL. KOLab AI adalah{" "}
              <span className="font-semibold text-violet-600">
                campaign intelligence engine
              </span>{" "}
              yang memahami personality creator, audience trust, dan konteks
              lokal Indonesia secara semantik.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <Button size="xl" className="group">
                  Mulai Sekarang
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/brief">
                <Button variant="outline" size="xl">
                  Upload Brief
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: "156+", label: "Creator Profiles" },
                { value: "98%", label: "Akurasi Matching" },
                { value: "< 5s", label: "Brief Parsing" },
                { value: "10+", label: "Niche Indonesia" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              Bukan Platform KOL Biasa
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              AI yang benar-benar memahami creator dan campaign secara semantik
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-violet-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 group-hover:from-violet-200 group-hover:to-indigo-200 transition-colors dark:from-violet-900 dark:to-indigo-900">
                  <feature.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              Cara Kerja
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white shadow-lg shadow-violet-500/25">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
              Dibangun dengan Teknologi Terbaik
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Google Gemini 2.0",
              "Next.js 14",
              "TypeScript",
              "Tailwind CSS",
              "Google Cloud Run",
              "Framer Motion",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </div>
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
            className="rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 shadow-2xl shadow-violet-500/20"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Siap Revolusi Campaign Strategy?
            </h2>
            <p className="mt-4 text-lg text-violet-100">
              Mulai gunakan AI intelligence untuk menemukan creator yang benar-benar cocok.
            </p>
            <Link href="/dashboard">
              <Button
                size="xl"
                className="mt-8 bg-white text-violet-700 hover:bg-violet-50 shadow-lg"
              >
                Masuk Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-violet-600" />
            <span className="font-bold gradient-text">KOLab AI</span>
          </div>
          <p className="text-sm text-slate-500">
            Built with ❤️ for #JuaraVibeCoding 2026 — Powered by Google Gemini AI
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © 2026 El Pablo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
