import type { IndexingStatus } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8001"

/**
 * The backend doesn't have auth wired up yet, so the userId used by the
 * inngest workflow is currently hardcoded server-side. Mirror it here so
 * status polling hits the right row.
 * TODO: replace once authentication is implemented.
 */
export const CURRENT_USER_ID = "288332fb-7f0c-4508-858f-d0a7e0da461b"

export interface AddSourceResponse {
  message: string
  filePath?: string
  url?: string
  eventId: string
}

export interface SourceRecord {
  id: string
  inngestEventId: string
  userId: string
  indexingStatus: IndexingStatus
  imagekitId: string | null
  imagekitUrl: string | null
  createdAt: string
  updatedAt: string
}

async function parseErrorMessage(res: Response, fallback: string) {
  const body = await res.json().catch(() => null)
  return (body && typeof body.message === "string" && body.message) || fallback
}

export async function addSourceFile(file: File): Promise<AddSourceResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_BASE_URL}/api/source/add-source`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to upload source"))
  }

  return res.json()
}

export async function addSourceUrl(url: string): Promise<AddSourceResponse> {
  const res = await fetch(`${API_BASE_URL}/api/source/add-source`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to submit URL"))
  }

  return res.json()
}

export async function getSourceStatus(eventId: string): Promise<SourceRecord | undefined> {
  const res = await fetch(
    `${API_BASE_URL}/api/source/get-source/${CURRENT_USER_ID}/${eventId}`,
  )

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to fetch source status"))
  }

  const data = await res.json()
  return data.source
}
