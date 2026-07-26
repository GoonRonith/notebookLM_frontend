import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import type { IndexingStatus, SourceItem } from "./types"

const STORAGE_KEY = "notebooklm-clone:sources"

interface SourcesContextValue {
  sources: SourceItem[]
  addSource: (source: SourceItem) => void
  updateSourceStatus: (eventId: string, status: IndexingStatus) => void
  removeSource: (eventId: string) => void
}

const SourcesContext = createContext<SourcesContextValue | null>(null)

function readInitialSources(): SourceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SourceItem[]) : []
  } catch {
    return []
  }
}

export function SourcesProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<SourceItem[]>(readInitialSources)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sources))
  }, [sources])

  const value = useMemo<SourcesContextValue>(
    () => ({
      sources,
      addSource: (source) => setSources((prev) => [source, ...prev]),
      updateSourceStatus: (eventId, status) =>
        setSources((prev) =>
          prev.map((item) => (item.eventId === eventId ? { ...item, status } : item)),
        ),
      removeSource: (eventId) =>
        setSources((prev) => prev.filter((item) => item.eventId !== eventId)),
    }),
    [sources],
  )

  return <SourcesContext.Provider value={value}>{children}</SourcesContext.Provider>
}

export function useSources() {
  const ctx = useContext(SourcesContext)
  if (!ctx) {
    throw new Error("useSources must be used within a SourcesProvider")
  }
  return ctx
}
