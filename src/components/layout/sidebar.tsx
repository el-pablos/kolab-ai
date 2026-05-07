"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar-context";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Briefcase,
  Sparkles,
  Settings,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Brief", href: "/brief", icon: FileText },
  { label: "Creator Discovery", href: "/creators", icon: Users },
  { label: "Campaign", href: "/campaign", icon: Briefcase },
  { label: "AI Assistant", href: "/chat", icon: MessageSquare },
];

const bottomItems: NavItem[] = [
  { label: "Help & Support", href: "#", icon: HelpCircle },
  { label: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + "/");

  const showFull = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
        showFull ? "w-[290px]" : "w-[90px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-[72px] items-center border-b border-gray-200 dark:border-gray-800 px-5 shrink-0",
          !showFull && "justify-center"
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {showFull && (
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              KOLab AI
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        {/* Menu label */}
        <div
          className={cn(
            "mb-4 text-xs font-medium uppercase tracking-wider text-gray-400",
            !showFull && "text-center"
          )}
        >
          {showFull ? "Menu" : "•••"}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  !showFull && "justify-center",
                  active
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
                      : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                {showFull && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="shrink-0 border-t border-gray-200 dark:border-gray-800 px-4 py-4">
        <nav className="flex flex-col gap-1">
          {bottomItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
                !showFull && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0 text-gray-400" />
              {showFull && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
