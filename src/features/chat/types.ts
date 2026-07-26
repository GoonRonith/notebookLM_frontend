export type ChatMessageStatus = "pending" | "done" | "error"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  status: ChatMessageStatus
  createdAt: string
}
