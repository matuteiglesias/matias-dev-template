"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PromptFormProps {
  placeholder?: string
  onSubmit: (question: string) => void
  loading?: boolean
}

export function PromptForm({ placeholder, onSubmit, loading = false }: PromptFormProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value)
      setValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder={placeholder || "Ask your document..."}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </Button>
    </form>
  )
}
