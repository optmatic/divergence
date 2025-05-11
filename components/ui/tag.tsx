"use client"

import { cn } from "@/lib/utils"
import type { Tag as TagType } from "@/types/comparison-types"
import { X } from "lucide-react"

interface TagProps {
  tag: TagType
  onRemove?: () => void
  className?: string
  clickable?: boolean
  onClick?: () => void
  selected?: boolean
  size?: "sm" | "md"
}

export function Tag({ tag, onRemove, className, clickable = false, onClick, selected = false, size = "md" }: TagProps) {
  // Safety check for tag
  if (!tag || typeof tag !== "object") {
    return null
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        tag.color || "bg-gray-100 text-gray-800",
        clickable && "cursor-pointer hover:opacity-90",
        selected && "ring-2 ring-offset-1",
        className,
      )}
      onClick={clickable && onClick ? onClick : undefined}
    >
      {tag.name || "Unknown"}
      {onRemove && (
        <button
          type="button"
          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-gray-200 hover:bg-opacity-20 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {tag.name || "tag"}</span>
        </button>
      )}
    </span>
  )
}
