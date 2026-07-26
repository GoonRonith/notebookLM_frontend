import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'

const RootLayout = () => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full gap-4 bg-background">
      <Sidebar className="shrink-0 border-r">
        <SidebarHeader className="border-b">
          <h1 className="font-heading text-lg font-semibold">NotebookLM</h1>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-2 p-4">
          <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted [&.active]:bg-muted [&.active]:text-foreground">
            Home
          </Link>
          <Link to="/chat" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted [&.active]:bg-muted [&.active]:text-foreground">
            Chat
          </Link>
          <Link to="/about" className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted [&.active]:bg-muted [&.active]:text-foreground">
            About
          </Link>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
    <TanStackRouterDevtools />
  </SidebarProvider>
)

export const Route = createRootRoute({ component: RootLayout })