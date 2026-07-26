import { type FormEvent, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import type { SourceKindConfig } from "@/features/sources/constants"
import { useAddSource } from "@/features/sources/use-add-source"

interface UploadSourceDialogProps {
  config: SourceKindConfig | null
  onOpenChange: (open: boolean) => void
}

export function UploadSourceDialog({ config, onOpenChange }: UploadSourceDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const mutation = useAddSource()

  function reset() {
    setFile(null)
    setUrl("")
    mutation.reset()
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) reset()
    onOpenChange(nextOpen)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!config) return

    if (config.mode === "file") {
      if (!file) return
      await mutation.mutateAsync({ kind: config.kind, name: file.name, file })
    } else {
      const trimmedUrl = url.trim()
      if (!trimmedUrl) return
      await mutation.mutateAsync({ kind: config.kind, name: trimmedUrl, url: trimmedUrl })
    }

    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={config !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        {config && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle>Add {config.label}</DialogTitle>
              <DialogDescription>{config.description}</DialogDescription>
            </DialogHeader>

            {config.mode === "file" ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="source-file">Choose file</Label>
                <Input
                  id="source-file"
                  type="file"
                  accept={config.accept}
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Label htmlFor="source-url">Website URL</Label>
                <Input
                  id="source-url"
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </div>
            )}

            {mutation.isError && (
              <p className="text-sm text-destructive">{(mutation.error as Error).message}</p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  mutation.isPending ||
                  (config.mode === "file" ? !file : url.trim().length === 0)
                }
              >
                {mutation.isPending && <Spinner className="size-4" />}
                Add source
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
