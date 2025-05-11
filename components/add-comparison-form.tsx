"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tag } from "@/components/ui/tag"
import { tags } from "@/utils/tag-utils"
import { useState } from "react"
import type { Comparison, ComparisonType } from "@/types/comparison-types"

interface AddComparisonFormProps {
  type: ComparisonType
  onAdd: (comparison: Comparison) => void
  onCancel: () => void
}

export function AddComparisonForm({ type, onAdd, onCancel }: AddComparisonFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const newComparison: Comparison = {
      id: `${Date.now()}`,
      category: (formData.get("category") as string) || "Uncategorized",
      jesus: {
        teaching: formData.get("jesusTeaching") as string,
        reference: formData.get("jesusReference") as string,
        context: formData.get("jesusContext") as string,
        tags: selectedTags.filter((tag) =>
          ["sermon", "parable", "humility", "forgiveness", "love", "meekness", "spiritualValues"].includes(tag),
        ),
      },
      trump: {
        [type === "personal" ? "statement" : "policy"]: formData.get("trumpAction") as string,
        context: formData.get("trumpContext") as string,
        contradiction: formData.get("contradiction") as string,
        tags: selectedTags.filter((tag) =>
          [
            "pride",
            "retaliation",
            "enmity",
            "aggression",
            "immigration",
            "rhetoric",
            "economicPolicy",
            "socialWelfare",
            "justiceSystem",
          ].includes(tag),
        ),
      },
      tags: selectedTags,
    }

    onAdd(newComparison)
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  // Group tags by category for better organization
  const tagCategories = {
    "Scripture Types": ["sermon", "parable"],
    Themes: ["humility", "forgiveness", "love", "meekness", "spiritualValues", "wealth"],
    Contrasts: ["pride", "retaliation", "enmity", "aggression"],
    "Policy Areas": ["immigration", "rhetoric", "economicPolicy", "socialWelfare", "justiceSystem"],
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" placeholder="e.g., Humility vs Pride" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Jesus's Teaching</h3>

              <div className="space-y-2">
                <Label htmlFor="jesusTeaching">Teaching</Label>
                <Input id="jesusTeaching" name="jesusTeaching" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jesusReference">Biblical Reference</Label>
                <Input id="jesusReference" name="jesusReference" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jesusContext">Context</Label>
                <Textarea id="jesusContext" name="jesusContext" required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Donald Trump's {type === "personal" ? "Statement/Action" : "Policy"}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="trumpAction">{type === "personal" ? "Statement/Action" : "Policy"}</Label>
                <Textarea id="trumpAction" name="trumpAction" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trumpContext">Context</Label>
                <Textarea id="trumpContext" name="trumpContext" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contradiction">Contradiction</Label>
                <Textarea id="contradiction" name="contradiction" required />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tags (apply to both)</Label>
            {Object.entries(tagCategories).map(([category, tagIds]) => (
              <div key={category} className="space-y-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {tagIds.map(
                    (tagId) =>
                      tags[tagId] && (
                        <Tag
                          key={tagId}
                          tag={tags[tagId]}
                          clickable
                          selected={selectedTags.includes(tagId)}
                          onClick={() => toggleTag(tagId)}
                        />
                      ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Comparison</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
