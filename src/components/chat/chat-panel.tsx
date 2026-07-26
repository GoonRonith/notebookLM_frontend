import { useState, type FormEvent, type KeyboardEvent } from "react"
import { SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { MessageCircleIcon } from "lucide-react"
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller"
import { Message, MessageContent } from "@/components/ui/message"
import { BubbleGroup, Bubble, BubbleContent } from "@/components/ui/bubble"
import { useChat } from "@/features/chat/use-chat"

export function ChatPanel() {
  const { messages, sendMessage, isPending } = useChat()
  const [input, setInput] = useState("")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    sendMessage(input)
    setInput("")
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage(input)
      setInput("")
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3">
      <MessageScrollerProvider>
        <MessageScroller className="min-h-0 flex-1 rounded-2xl border bg-card">
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-4">
              {messages.length === 0 ? (
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleIcon />
                    </EmptyMedia>
                    <EmptyTitle>Ask about your sources</EmptyTitle>
                    <EmptyDescription>
                      Questions are answered using the documents, videos and pages you&apos;ve added.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                messages.map((message) => (
                  <MessageScrollerItem key={message.id} messageId={message.id}>
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <BubbleGroup>
                          <Bubble
                            align={message.role === "user" ? "end" : "start"}
                            variant={message.role === "user" ? "default" : "muted"}
                          >
                            <BubbleContent>
                              {message.status === "pending" ? (
                                <span className="flex items-center gap-2 text-muted-foreground">
                                  <Spinner /> Thinking...
                                </span>
                              ) : (
                                <span className="whitespace-pre-wrap">{message.content}</span>
                              )}
                            </BubbleContent>
                          </Bubble>
                        </BubbleGroup>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your sources..."
          className="max-h-40"
          disabled={isPending}
        />
        <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
          {isPending ? <Spinner /> : <SendIcon />}
        </Button>
      </form>
    </div>
  )
}
