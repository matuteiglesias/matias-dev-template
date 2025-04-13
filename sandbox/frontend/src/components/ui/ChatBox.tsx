import ResponseBlock from "./ResponseBlock"
import { Message } from "@/types"; 



interface ChatBoxProps {
  messages: Message[]
}

export default function ChatBox({ messages }: ChatBoxProps) {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {messages.map((msg) =>
        msg.role === "user" ? (
          <div key={msg.id} className="text-right text-sm text-zinc-700 dark:text-zinc-200">
            <span className="bg-zinc-200 dark:bg-zinc-700 px-3 py-2 rounded-lg inline-block">
              {msg.content}
            </span>
          </div>
        ) : (
          <ResponseBlock key={msg.id} content={msg.content} />
        )
      )}
    </div>
  )
}
