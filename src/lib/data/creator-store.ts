import { Creator } from "@/types";
import { creators as seedCreators } from "./creators";

const STORAGE_KEY = "kolab-ai-creators";

function getStoredCreators(): Creator[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveStoredCreators(creators: Creator[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
  } catch {
    console.error("Failed to save creators to localStorage");
  }
}

export function getAllCreators(): Creator[] {
  const stored = getStoredCreators();
  const seedIds = new Set(seedCreators.map((c) => c.id));
  const uniqueStored = stored.filter((c) => !seedIds.has(c.id));
  return [...seedCreators, ...uniqueStored];
}

export function addCreator(creator: Creator): void {
  const stored = getStoredCreators();
  const exists = stored.some((c) => c.id === creator.id);
  if (!exists) {
    stored.push(creator);
    saveStoredCreators(stored);
  }
}

export function getCreatorById(id: string): Creator | undefined {
  return getAllCreators().find((c) => c.id === id);
}

export function getStoredCreatorCount(): number {
  return getStoredCreators().length;
}

export function getTotalCreatorCount(): number {
  return getAllCreators().length;
}
