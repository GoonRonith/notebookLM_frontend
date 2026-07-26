import { useRef } from "react"
import { ExternalLinkIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Citation } from "@/features/chat/types"

interface CitationViewerDialogProps {
  citation: Citation | null
  onOpenChange: (open: boolean) => void
}

export function CitationViewerDialog({ citation, onOpenChange }: CitationViewerDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <Dialog open={!!citation} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        {citation ? (
          <>
            <DialogHeader>
              <DialogTitle>{citation.label}</DialogTitle>
              <DialogDescription className="line-clamp-2">{citation.snippet}</DialogDescription>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-auto">
              {citation.sourceType === "pdf" && citation.url ? (
                <iframe
                  key={`${citation.url}#page=${citation.page ?? 1}`}
                  src={`${citation.url}#page=${citation.page ?? 1}`}
                  title={citation.label}
                  className="h-[70vh] w-full rounded-lg border"
                />
              ) : citation.sourceType === "video" && citation.url ? (
                <video
                  key={citation.url}
                  ref={videoRef}
                  src={citation.url}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  onLoadedMetadata={() => {
                    if (videoRef.current && typeof citation.startSeconds === "number") {
                      videoRef.current.currentTime = citation.startSeconds
                    }
                  }}
                />
              ) : citation.sourceType === "webpage" && citation.url ? (
                <iframe
                  key={citation.url}
                  src={citation.url}
                  title={citation.label}
                  className="h-[70vh] w-full rounded-lg border"
                />
              ) : (
                <p className="whitespace-pre-wrap rounded-lg border bg-muted p-4 text-sm text-muted-foreground">
                  {citation.snippet}
                </p>
              )}
            </div>

            {citation.url ? (
              <DialogFooter>
                <Button
                  variant="outline"
                  render={<a href={citation.url} target="_blank" rel="noopener noreferrer" />}
                >
                  Open original
                  <ExternalLinkIcon />
                </Button>
              </DialogFooter>
            ) : null}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
