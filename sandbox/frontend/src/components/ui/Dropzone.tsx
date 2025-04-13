// components/ui/Dropzone.tsx
"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"


interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void
  accept?: string | string[]
  multiple?: boolean
  disabled?: boolean
}

export default function Dropzone({
  onFilesAccepted,
  accept = ['.pdf', '.txt'],
  multiple = true,
  disabled = false,
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesAccepted(acceptedFiles)
      }
    },
    [onFilesAccepted]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    disabled,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer transition-all ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-zinc-300 dark:border-zinc-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {isDragActive ? "Drop the files here..." : "Drag and drop files here, or click to browse"}
      </p>
      <p className="text-xs text-zinc-400 mt-1">PDF and TXT only. Max size: 10MB</p>
    </div>
  )
}
