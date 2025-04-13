// components/ui/DocSidebar.tsx
"use client"

import React from "react"

interface Document {
  id: string
  name: string
}

interface DocSidebarProps {
  documents: Document[]
  selectedId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export default function DocSidebar({
  documents,
  selectedId,
  onSelect,
  onDelete,
}: DocSidebarProps) {
  return (
    <aside className="w-64 border-r h-full flex flex-col bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-semibold px-4 py-3 border-b">Your Documents</h2>

      <div className="flex-1 overflow-y-auto">
        {documents.length === 0 ? (
          <p className="text-sm text-gray-500 px-4 py-4">No documents uploaded yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  selectedId === doc.id
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <span
                  onClick={() => onSelect(doc.id)}
                  className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100 flex-1"
                >
                  {doc.name}
                </span>
                <button
                  onClick={() => onDelete(doc.id)}
                  className="text-zinc-500 hover:text-red-500 ml-2"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
