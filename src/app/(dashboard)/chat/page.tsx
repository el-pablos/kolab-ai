"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Loader2,
  Bot,
  User,
  Lightbulb,
  Search,
  BarChart3,
  Users,
  Target,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/types";

const suggestedQuestions = [
  "Carikan creator beauty yang cocok untuk campaign skincare premium",
  "Siapa creator dengan audience trust tertinggi?",
  "Analisis creator mana yang cocok untuk brand F&B keluarga",
  "Berapa budget ideal untuk campaign TikTok dengan 5 creator?",
  "Creator mana yang paling reliable untuk deadline ketat?",
];

const aiCapabilities = [
  {
    icon: Search,
    title: "Cari Creator",
    desc: "Temukan creator berdasarkan niche, audience, personality",
  },
  {
    icon: BarChart3,
    title: "Analisis Campaign",
    desc: "Evaluasi performa dan ROI campaign",
  },
  {
    icon: Users,
    title: "Rekomendasi Strategi",
    desc: "Saran strategi influencer marketing",
  },
  {
    icon: Target,
    title: "Budget Planning",
    desc: "Estimasi budget dan alokasi per creator",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          message: text,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle both old format {response} and new format {data: {response}}
        const aiResponse = data.data?.response || data.response || "Maaf, tidak ada respons dari AI.";
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          content: aiResponse,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content:
            "Hmm, ada masalah nih. Server lagi sibuk atau ada error di sisi kami. Coba lagi dalam beberapa detik ya! 🙏",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        role: "assistant",
        content:
          "Waduh, gagal terhubung ke server. Cek koneksi internet kamu ya, atau coba refresh halaman ini. Kalau masih error, mungkin server lagi maintenance sebentar.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Campaign Assistant
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Chat dengan AI yang memahami creator economy Indonesia — tanya apapun soal campaign, creator, atau strategi.
          </p>
        </div>
        <Badge variant="default" className="gap-1">
          <Sparkles className="h-3 w-3" />
          Gemini 2.5 Flash
        </Badge>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-4 dark:from-violet-900 dark:to-indigo-900">
                    <Bot className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    Halo! Gw KOLab AI
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-md">
                    Gw bisa bantu lu cari creator, analisis campaign, kasih rekomendasi strategi,
                    atau jawab pertanyaan soal influencer marketing di Indonesia.
                  </p>

                  {/* AI Capabilities */}
                  <div className="mt-6 w-full max-w-lg">
                    <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1 justify-center">
                      <Sparkles className="h-3 w-3" />
                      Kemampuan AI
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {aiCapabilities.map((cap) => (
                        <div
                          key={cap.title}
                          className="flex items-start gap-2 rounded-lg border border-slate-100 p-3 text-left dark:border-slate-800"
                        >
                          <cap.icon className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {cap.title}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {cap.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested questions */}
                  <div className="mt-6 space-y-2 w-full max-w-lg">
                    <p className="text-xs text-slate-400 flex items-center gap-1 justify-center">
                      <Lightbulb className="h-3 w-3" />
                      Coba tanya:
                    </p>
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-sm rounded-lg border border-slate-200 px-4 py-2.5 text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all dark:border-slate-700 dark:text-slate-400 dark:hover:border-violet-700 dark:hover:bg-violet-950"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {/* Error indicator for error messages */}
                      {msg.role === "assistant" && msg.content?.includes("gagal") && (
                        <div className="flex items-center gap-1.5 mb-2 text-amber-600 dark:text-amber-400">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Ada masalah</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                      {/* Retry hint for error messages */}
                      {msg.role === "assistant" && (msg.content?.includes("gagal") || msg.content?.includes("error") || msg.content?.includes("masalah")) && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                          <RefreshCw className="h-3 w-3" />
                          <span>Kirim ulang pesan untuk coba lagi</span>
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700">
                        <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
                      <span className="text-sm text-slate-500">
                        Sedang berpikir...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="flex gap-3">
              <Textarea
                placeholder="Tanya apapun tentang creator, campaign, atau strategi... (Enter untuk kirim, Shift+Enter untuk baris baru)"
                className="min-h-[44px] max-h-[120px] resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="shrink-0 h-[44px]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Powered by Google Gemini 2.5 Flash • KOLab AI memahami konteks Indonesia • Data tidak disimpan
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
