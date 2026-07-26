import { FileTextIcon, CaptionsIcon, Link2Icon, VideoIcon, FileIcon, type LucideIcon } from "lucide-react"

import type { SourceKind } from "./types"

export interface SourceKindConfig {
  kind: SourceKind
  label: string
  description: string
  icon: LucideIcon
  mode: "file" | "url"
  accept?: string
}

export const SOURCE_KIND_CONFIGS: SourceKindConfig[] = [
  {
    kind: "pdf",
    label: "PDF",
    description: "Upload a PDF document",
    icon: FileTextIcon,
    mode: "file",
    accept: ".pdf,application/pdf",
  },
  {
    kind: "srt",
    label: "SRT File",
    description: "Upload a subtitle (.srt) file",
    icon: CaptionsIcon,
    mode: "file",
    accept: ".srt",
  },
  {
    kind: "website",
    label: "Website Link",
    description: "Add a webpage URL",
    icon: Link2Icon,
    mode: "url",
  },
  {
    kind: "video",
    label: "Video",
    description: "Upload an MP4 video",
    icon: VideoIcon,
    mode: "file",
    accept: "video/mp4,.mp4",
  },
  {
    kind: "text",
    label: "Text File",
    description: "Upload a plain text (.txt) file",
    icon: FileIcon,
    mode: "file",
    accept: ".txt,text/plain",
  },
]
