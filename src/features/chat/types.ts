export type ChatMessageStatus = "pending" | "done" | "error"

export interface Citation {
  label: string
  url?: string
  snippet: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  status: ChatMessageStatus
  createdAt: string
  citations?: Citation[]
}
