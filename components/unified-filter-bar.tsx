"use client"
import { Tag } from "@/components/ui/tag"
import { tags } from "@/utils/tag-utils"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface UnifiedFilterBarProps {
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearTags: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function UnifiedFilterBar({
  selectedTags,
  onTagToggle,
  onClearTags,
  searchQuery,
  onSearchChange,
}: UnifiedFilterBarProps) {
  // Group tags by category for better organization
  const tagCategories = {
    "Scripture Types": ["sermon", "parable"],
    Themes: ["humility", "forgiveness", "love", "meekness", "spiritualValues", "wealth"],
    Contrasts: ["pride", "retaliation", "enmity", "aggression"],
    "Policy Areas": ["immigration", "rhetoric", "economicPolicy", "socialWelfare", "justiceSystem"],
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search comparisons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-3">
        {Object.entries(tagCategories).map(([category, tagIds]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {tagIds.map(
                (tagId) =>
                  tags[tagId] && (
                    <Tag
                      key={tagId}
                      tag={tags[tagId]}
                      clickable
                      selected={selectedTags.includes(tagId)}
                      onClick={() => onTagToggle(tagId)}
                    />
                  ),
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="pt-2 border-t">
          <button onClick={onClearTags} className="text-sm text-gray-500 hover:text-gray-700">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
