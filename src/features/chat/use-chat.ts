import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { sendQuery, type QueryResponse } from "./api"
import type { ChatMessage } from "./types"

function createMessage(
  role: ChatMessage["role"],
  content: string,
  status: ChatMessage["status"],
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    status,
    createdAt: new Date().toISOString(),
  }
}

interface MutationContext {
  assistantMessageId: string
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const mutation = useMutation<QueryResponse, Error, string, MutationContext>({
    mutationFn: sendQuery,
    onMutate: (query) => {
      const userMessage = createMessage("user", query, "done")
      const assistantMessage = createMessage("assistant", "", "pending")
      setMessages((prev) => [...prev, userMessage, assistantMessage])
      return { assistantMessageId: assistantMessage.id }
    },
    onSuccess: (data, _query, context) => {
      if (!context) return
      setMessages((prev) =>
        prev.map((message) =>
          message.id === context.assistantMessageId
            ? { ...message, content: data.response, citations: data.citations, status: "done" }
            : message,
        ),
      )
    },
    onError: (error, _query, context) => {
      if (!context) return
      setMessages((prev) =>
        prev.map((message) =>
          message.id === context.assistantMessageId
            ? {
                ...message,
                content: error.message || "Something went wrong. Please try again.",
                status: "error",
              }
            : message,
        ),
      )
    },
  })

  function sendMessage(query: string) {
    const trimmed = query.trim()
    if (!trimmed || mutation.isPending) return
    mutation.mutate(trimmed)
  }

  return { messages, sendMessage, isPending: mutation.isPending }
}
