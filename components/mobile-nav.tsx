"use client";

import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { tags, selectedTagClasses } from "@/utils/tag-utils";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  selectedTags?: string[];
  onTagToggle?: (tagId: string) => void;
  onClearTags?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function MobileNav({
  selectedTags,
  onTagToggle,
  onClearTags,
  searchQuery,
  onSearchChange,
}: MobileNavProps) {
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
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="text-wood-900 font-serif text-xl font-semibold">
          Christianity & MAGA: Divergent Paths
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-wood-900" />
            <Input
              placeholder="Search comparisons..."
              value={safeSearchQuery}
              onChange={(e) => safeOnSearchChange(e.target.value)}
              className="pl-8 border-forest-200 bg-white focus-visible:ring-wood-900 font-cursive text-black"
            />
          </div>

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
            <div className="mt-2">
              <button
                onClick={safeOnClearTags}
                className="text-sm text-wood-900 hover:text-wood-950 font-cursive"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
