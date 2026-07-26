import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { getSourceStatus } from "./api"
import { useSources } from "./sources-store"
import type { IndexingStatus } from "./types"

const POLL_INTERVAL_MS = 3000

function isTerminalStatus(status: IndexingStatus | undefined) {
  return status === "COMPLETED" || status === "FAILED"
}

/**
 * Polls the backend for the indexing status of a source while it is still
 * pending/processing, and syncs the result back into the sources store.
 */
export function useSourceStatus(eventId: string, currentStatus: IndexingStatus) {
  const { updateSourceStatus } = useSources()

  const query = useQuery({
    queryKey: ["source-status", eventId],
    queryFn: () => getSourceStatus(eventId),
    enabled: !isTerminalStatus(currentStatus),
    refetchInterval: (q) => (isTerminalStatus(q.state.data?.indexingStatus) ? false : POLL_INTERVAL_MS),
  })

  useEffect(() => {
    const nextStatus = query.data?.indexingStatus
    if (nextStatus && nextStatus !== currentStatus) {
      updateSourceStatus(eventId, nextStatus)
    }
  }, [query.data?.indexingStatus, eventId, currentStatus, updateSourceStatus])

  return query
}
