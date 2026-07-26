import { createFileRoute } from '@tanstack/react-router'

import { ChatPanel } from '@/components/chat/chat-panel'

export const Route = createFileRoute('/chat')({
  component: Chat,
})

function Chat() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col p-4">
      <ChatPanel />
    </div>
  )
}
