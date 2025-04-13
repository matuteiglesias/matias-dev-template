"use client"

import { useState } from "react"
import { PromptForm } from "@/components/ui/PromptForm"

export default function AskPage() {
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleAsk(question: string) {
    setLoading(true)
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setAnswer(data.answer || "No answer returned.")
    } catch (e) {
      setAnswer("Error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ask Your Doc</h1>
      <PromptForm onSubmit={handleAsk} loading={loading} />
      {answer && (
        <div className="bg-muted p-4 rounded border text-sm whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  )
}