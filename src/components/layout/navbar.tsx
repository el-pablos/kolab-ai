"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSidebar } from "@/context/sidebar-context";
import {
  Bell,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export function Navbar() {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Campaign baru dibuat",
      desc: "Peluncuran Serum Vitamin C Premium",
      time: "2 menit lalu",
      unread: true,
    },
    {
      id: 2,
      title: "Creator matched",
      desc: "Anya Maharani cocok untuk campaign Anda",
      time: "1 jam lalu",
      unread: true,
    },
    {
      id: 3,
      title: "Brief berhasil diparsing",
      desc: "AI telah menganalisis brief Anda",
      time: "3 jam lalu",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-40 flex w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Left: Toggle + Search */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle */}
          <button
            onClick={handleToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Search */}
          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari creator, campaign..."
                className="h-11 w-[320px] rounded-lg border border-gray-200 bg-transparent py-2.5 pl-11 pr-14 text-sm text-gray-800 placeholder:text-gray-400 focus:border-violet-300 focus:outline-none focus:ring-3 focus:ring-violet-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-violet-800 xl:w-[400px]"
              />
              <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <span>⌘</span>
                <span>K</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                {notifications.filter((n) => n.unread).length}
              </span>
            </button>

            {/* Notification dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Notifikasi
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        notif.unread ? "bg-violet-50/50 dark:bg-violet-500/5" : ""
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20">
                        <Bell className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {notif.desc}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {notif.time}
                        </p>
                      </div>
                      {notif.unread && (
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2">
                  <button className="w-full text-center text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold">
                EP
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  El Pablo
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin
                </p>
              </div>
              <ChevronDown className="hidden md:block h-4 w-4 text-gray-400" />
            </button>

            {/* User menu dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    El Pablo
                  </p>
                  <p className="text-xs text-gray-500">admin@kolab.ai</p>
                </div>
                <div className="py-1">
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
