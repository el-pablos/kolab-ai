"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Users, Sparkles, Briefcase, Check } from "lucide-react";

const steps = [
  { label: "Upload Brief", icon: FileText, href: "/brief" },
  { label: "Cari Creator", icon: Users, href: "/creators" },
  { label: "AI Matching", icon: Sparkles, href: "/creators" },
  { label: "Campaign", icon: Briefcase, href: "/campaign" },
] as const;

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={step.label}>
              <Link
                href={step.href}
                className={`group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
                  isActive
                    ? "bg-violet-100 border border-violet-200 shadow-sm dark:bg-violet-500/15 dark:border-violet-500/30"
                    : isCompleted
                    ? "bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:hover:bg-emerald-500/15"
                    : "bg-slate-50 border border-slate-100 hover:bg-slate-100 dark:bg-slate-800/50 dark:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-violet-600 text-white shadow-sm shadow-violet-300 dark:shadow-violet-800"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <StepIcon className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-[10px] font-medium uppercase tracking-wider ${
                      isActive
                        ? "text-violet-500 dark:text-violet-400"
                        : isCompleted
                        ? "text-emerald-500 dark:text-emerald-400"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className={`text-xs font-semibold whitespace-nowrap ${
                      isActive
                        ? "text-violet-800 dark:text-violet-200"
                        : isCompleted
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </Link>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center px-1">
                  <div
                    className={`h-0.5 w-full rounded-full transition-colors ${
                      isCompleted
                        ? "bg-emerald-300 dark:bg-emerald-600"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: stacked compact */}
      <div className="flex sm:hidden items-center gap-1.5 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={step.label}>
              <Link
                href={step.href}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 transition-all shrink-0 ${
                  isActive
                    ? "bg-violet-100 border border-violet-200 dark:bg-violet-500/15 dark:border-violet-500/30"
                    : isCompleted
                    ? "bg-emerald-50 border border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20"
                    : "bg-slate-50 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-700"
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <StepIcon className="h-3 w-3" />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium whitespace-nowrap ${
                    isActive
                      ? "text-violet-700 dark:text-violet-300"
                      : isCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </Link>

              {index < steps.length - 1 && (
                <div
                  className={`w-3 h-0.5 rounded-full shrink-0 ${
                    isCompleted
                      ? "bg-emerald-300 dark:bg-emerald-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
