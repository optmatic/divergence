"use client";

import { useState, useEffect } from "react";
import ComparisonTable from "@/components/comparison-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarWithFilters } from "@/components/sidebar-with-filters";
import { Menu, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "@/components/mobile-nav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function HomePage() {
  // Initialize state with empty arrays/strings to avoid undefined
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // This ensures we only render the full component after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  // Render a simplified version during SSR to avoid hydration mismatches
  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
              <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile menu button (fixed position) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md bg-forest-50 border-wood-200"
            >
              <Menu className="h-5 w-5 text-wood-900" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[350px] overflow-auto bg-forest-50 border-forest-200 sidebar-bg"
          >
            <MobileNav
              selectedTags={selectedTags}
              onTagToggle={toggleTag}
              onClearTags={clearTags}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1">
        {/* Fixed sidebar */}
        <div className="hidden md:block w-72 shrink-0 relative">
          {/* This is a placeholder div to maintain layout space */}
          <div className="w-72 shrink-0" aria-hidden="true"></div>

          {/* The actual fixed sidebar */}
          <div
            className="fixed border-r border-forest-200 sidebar-bg overflow-hidden z-40"
            style={{
              width: "18rem",
              top: 0,
              bottom: "0",
              height: "100vh",
            }}
          >
            <div className="p-4 h-full">
              <div className="mb-6">
                <h1 className="text-xl font-serif font-semibold text-wood-900">
                  Christianity & MAGA: Divergent Paths
                </h1>
              </div>
              <SidebarWithFilters
                selectedTags={selectedTags}
                onTagToggle={toggleTag}
                onClearTags={clearTags}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                className="h-[calc(100vh-80px)]"
              />
            </div>
          </div>
        </div>

        <main className="flex-1 pt-16 md:pt-0 bg-forest-50/30">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Card className="mb-8 border-forest-200 shadow-sm" id="overview">
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CardHeader className="pb-4 pt-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                    <CardTitle className="text-wood-900 font-serif text-left text-base font-normal">
                      About this Resource
                    </CardTitle>
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-wood-900" />
                    ) : (
                      <Plus className="h-5 w-5 text-wood-900" />
                    )}
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-4 pb-6">
                    <p className="text-black mb-4 font-cursive">
                      This website presents factual comparisons between the
                      teachings of Jesus Christ and the statements, behaviours,
                      and policies of Donald Trump. The purpose is to provide an
                      educational resource that highlights the similarities and
                      differences between religious teachings and political
                      actions, without commentary or editorialising.
                    </p>
                    <p className="text-black mb-4 font-cursive">
                      The comparisons below are organised into two categories:
                      Personal Conduct and Policies. Each entry includes a
                      teaching of Jesus (with biblical reference where
                      applicable) and a corresponding statement, behaviour, or
                      policy position of Donald Trump.
                    </p>
                    <p className="text-black font-cursive">
                      This comparison is not exhaustive and may be expanded in
                      the future with additional entries. The goal is to provide
                      a factual basis for reflection on the relationship between
                      religious teachings and political leadership.
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <div id="comparisons">
              <ComparisonTable
                selectedTags={selectedTags}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
