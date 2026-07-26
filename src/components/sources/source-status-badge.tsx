import { CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import type { IndexingStatus } from "@/features/sources/types"

export function SourceStatusBadge({ status }: { status: IndexingStatus }) {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline">
          <ClockIcon />
          Pending
        </Badge>
      )
    case "PROCESSING":
      return (
        <Badge variant="secondary">
          <Spinner className="size-3" />
          Indexing…
        </Badge>
      )
    case "COMPLETED":
      return (
        <Badge className="bg-emerald-600 text-white [a]:hover:bg-emerald-600/80">
          <CheckCircle2Icon />
          Indexed
        </Badge>
      )
    case "FAILED":
      return (
        <Badge variant="destructive">
          <XCircleIcon />
          Failed
        </Badge>
      )
    default:
      return null
  }
}
