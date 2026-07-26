import { createFileRoute } from '@tanstack/react-router'

import { IndexingSidebar } from '@/components/sources/indexing-sidebar'
import { SourceUploadGrid } from '@/components/sources/source-upload-grid'
import { SourcesProvider } from '@/features/sources/sources-store'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <SourcesProvider>
      <div className="flex min-h-[75vh] w-full flex-col gap-6 p-4 md:flex-row">
        <aside className="w-full shrink-0 md:w-72">
          <IndexingSidebar />
        </aside>
        <SourceUploadGrid />
      </div>
    </SourcesProvider>
  )
}