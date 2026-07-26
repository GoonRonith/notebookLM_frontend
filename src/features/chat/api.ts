import type { Citation } from "./types"

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8001").replace(/\/+$/, "")

export interface QueryResponse {
  response: string
  citations?: Citation[]
}

async function parseErrorMessage(res: Response, fallback: string) {
  const body = await res.json().catch(() => null)
  return (body && typeof body.message === "string" && body.message) || fallback
}

export async function sendQuery(query: string): Promise<QueryResponse> {
  const res = await fetch(`${API_BASE_URL}/api/source/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Failed to get a response"))
  }

  return res.json()
}
