export type SourceKind = "pdf" | "srt" | "website" | "video" | "text"

export type IndexingStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"

export interface SourceItem {
  /** The inngest event id returned by the backend, used to poll status. */
  eventId: string
  kind: SourceKind
  name: string
  status: IndexingStatus
  createdAt: string
}
