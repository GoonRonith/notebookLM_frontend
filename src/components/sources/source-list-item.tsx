import { FileIcon } from "lucide-react"

import { SOURCE_KIND_CONFIGS } from "@/features/sources/constants"
import { useSourceStatus } from "@/features/sources/use-source-status"
import type { SourceItem } from "@/features/sources/types"
import { SourceStatusBadge } from "./source-status-badge"

export function SourceListItem({ source }: { source: SourceItem }) {
  useSourceStatus(source.eventId, source.status)

  const config = SOURCE_KIND_CONFIGS.find((item) => item.kind === source.kind)
  const Icon = config?.icon ?? FileIcon

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
        <Icon className="size-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate text-sm font-medium" title={source.name}>
          {source.name}
        </p>
        <SourceStatusBadge status={source.status} />
      </div>
    </div>
  )
}
