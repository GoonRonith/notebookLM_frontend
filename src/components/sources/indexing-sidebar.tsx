import { InboxIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSources } from "@/features/sources/sources-store"
import { SourceListItem } from "./source-list-item"

export function IndexingSidebar() {
  const { sources } = useSources()

  return (
    <aside className="flex h-full flex-col gap-4 rounded-3xl border bg-sidebar p-4 md:h-[70vh]">
      <div>
        <h2 className="font-heading text-sm font-semibold">Sources</h2>
        <p className="text-xs text-muted-foreground">
          {sources.length} {sources.length === 1 ? "source" : "sources"}
        </p>
      </div>

      {sources.length === 0 ? (
        <Empty className="border-0 p-4">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>No sources yet</EmptyTitle>
            <EmptyDescription>
              Add a source to see indexing progress here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 pr-2">
            {sources.map((source) => (
              <SourceListItem key={source.eventId} source={source} />
            ))}
          </div>
        </ScrollArea>
      )}
    </aside>
  )
}
