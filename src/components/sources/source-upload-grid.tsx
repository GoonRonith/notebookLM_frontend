import { useState } from "react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SOURCE_KIND_CONFIGS, type SourceKindConfig } from "@/features/sources/constants"
import { UploadSourceDialog } from "./upload-source-dialog"

export function SourceUploadGrid() {
  const [activeConfig, setActiveConfig] = useState<SourceKindConfig | null>(null)

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-heading text-2xl font-semibold">Add a source</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Upload a PDF, subtitle file, video, or plain text file — or paste a
          website link — to start indexing.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SOURCE_KIND_CONFIGS.map((config) => {
          const Icon = config.icon
          return (
            <button
              key={config.kind}
              type="button"
              onClick={() => setActiveConfig(config)}
              className="text-left focus-visible:outline-none"
            >
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{config.label}</CardTitle>
                  <CardDescription>{config.description}</CardDescription>
                </CardHeader>
              </Card>
            </button>
          )
        })}
      </div>

      <UploadSourceDialog
        config={activeConfig}
        onOpenChange={(open) => !open && setActiveConfig(null)}
      />
    </div>
  )
}
