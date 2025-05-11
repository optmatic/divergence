"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tags, selectedTagClasses } from "@/utils/tag-utils";

interface SidebarWithFiltersProps {
  selectedTags?: string[];
  onTagToggle?: (tagId: string) => void;
  onClearTags?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export function SidebarWithFilters({
  selectedTags,
  onTagToggle,
  onClearTags,
  searchQuery,
  onSearchChange,
  className,
}: SidebarWithFiltersProps) {
  // Ensure we have valid values for all props
  const safeSelectedTags = selectedTags || [];
  const safeSearchQuery = searchQuery || "";
  const safeOnTagToggle = onTagToggle || (() => {});
  const safeOnClearTags = onClearTags || (() => {});
  const safeOnSearchChange = onSearchChange || (() => {});

  // Group tags by category for better organisation
  const tagCategories = {
    "Scripture Types": ["sermon", "parable"],
    Themes: [
      "humility",
      "forgiveness",
      "love",
      "meekness",
      "spiritualValues",
      "wealth",
    ],
    Contrasts: ["pride", "retaliation", "enmity", "aggression"],
    "Policy Areas": [
      "immigration",
      "rhetoric",
      "economicPolicy",
      "socialWelfare",
      "justiceSystem",
    ],
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Search and filter section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-3 mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-wood-900" />
            <Input
              placeholder="Search comparisons..."
              value={safeSearchQuery}
              onChange={(e) => safeOnSearchChange(e.target.value)}
              className="pl-8 border-forest-200 bg-white focus-visible:ring-wood-900 font-cursive text-black"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3">
          <Accordion
            type="multiple"
            defaultValue={Object.keys(tagCategories)}
            className="w-full"
          >
            {Object.entries(tagCategories).map(([category, tagIds]) => (
              <AccordionItem
                key={category}
                value={category}
                className="border-forest-200"
              >
                <AccordionTrigger className="text-sm py-2 text-wood-900 hover:text-wood-950 font-serif">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pb-2">
                    {tagIds.map((tagId) => {
                      if (!tags[tagId]) return null;

                      const isSelected =
                        Array.isArray(safeSelectedTags) &&
                        safeSelectedTags.includes(tagId);

                      return (
                        <button
                          key={tagId}
                          onClick={() => safeOnTagToggle(tagId)}
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-cursive transition-all",
                            isSelected ? selectedTagClasses : tags[tagId].color
                          )}
                        >
                          {tags[tagId].name}
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {Array.isArray(safeSelectedTags) && safeSelectedTags.length > 0 && (
            <div className="mt-4 mb-6">
              <button
                onClick={safeOnClearTags}
                className="text-sm text-wood-900 hover:text-wood-950 font-cursive"
              >
                Clear all filters
              </button>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
