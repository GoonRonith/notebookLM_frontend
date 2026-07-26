import { useMutation } from "@tanstack/react-query"

import { addSourceFile, addSourceUrl } from "./api"
import { useSources } from "./sources-store"
import type { SourceKind } from "./types"

interface AddSourcePayload {
  kind: SourceKind
  name: string
  file?: File
  url?: string
}

export function useAddSource() {
  const { addSource } = useSources()

  return useMutation({
    mutationFn: async (payload: AddSourcePayload) => {
      const response = payload.file
        ? await addSourceFile(payload.file)
        : await addSourceUrl(payload.url ?? "")
      return { response, payload }
    },
    onSuccess: ({ response, payload }) => {
      addSource({
        eventId: response.eventId,
        kind: payload.kind,
        name: payload.name,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      })
    },
  })
}
