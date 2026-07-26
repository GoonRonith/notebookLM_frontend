export type ChatMessageStatus = "pending" | "done" | "error"

export type CitationSourceType = "pdf" | "srt" | "text" | "video" | "webpage"

export interface Citation {
  label: string
  url?: string
  snippet: string
  sourceType?: CitationSourceType
  /** PDF: 1-indexed page number to open the viewer on. */
  page?: number
  /** Video: seconds into the file where the cited segment starts/ends. */
  startSeconds?: number
  endSeconds?: number
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  status: ChatMessageStatus
  createdAt: string
  citations?: Citation[]
}
