"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  personalConductComparisons,
  policyComparisons,
} from "@/data/comparisons";
import { getTagsFromIds } from "@/utils/tag-utils";
import { getBibleGatewayUrl } from "@/utils/bible-utils";
import type { Comparison } from "@/types/comparison-types";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  selectedTags?: string[];
  searchQuery?: string;
}

export default function ComparisonTable({
  selectedTags = [],
  searchQuery = "",
}: ComparisonTableProps) {
  const [personalComparisons, setPersonalComparisons] = useState(
    personalConductComparisons
  );
  const [policyComps, setPolicyComparisons] = useState(policyComparisons);

  // Filter function that applies both tag filtering and search
  const filterComparisons = (comparisons: Comparison[]) => {
    return comparisons.filter((item) => {
      // Tag filtering
      const passesTagFilter =
        selectedTags.length === 0 ||
        selectedTags.some(
          (tag) =>
            item.tags.includes(tag) ||
            item.jesus.tags.includes(tag) ||
            item.trump.tags.includes(tag)
        );

      // Search filtering
      const searchLower = searchQuery.toLowerCase();
      const passesSearch =
        searchQuery === "" ||
        item.jesus.teaching.toLowerCase().includes(searchLower) ||
        item.jesus.reference.toLowerCase().includes(searchLower) ||
        item.jesus.context.toLowerCase().includes(searchLower) ||
        (item.trump.statement &&
          item.trump.statement.toLowerCase().includes(searchLower)) ||
        (item.trump.policy &&
          item.trump.policy.toLowerCase().includes(searchLower)) ||
        item.trump.context.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower);

      return passesTagFilter && passesSearch;
    });
  };

  const filteredPersonalComparisons = filterComparisons(personalComparisons);
  const filteredPolicyComparisons = filterComparisons(policyComps);

  // Render a comparison row - reused for both personal and policy tables
  const renderComparisonRow = (comparison: Comparison, index: number) => (
    <tr
      key={comparison.id}
      className={index % 2 === 0 ? "bg-white" : "bg-forest-50"}
    >
      <td className="border border-forest-200 p-3">
        <p className="font-medium text-black font-cursive">
          {comparison.jesus.teaching}
        </p>
        <p className="text-sm text-black mt-1 font-cursive">
          <a
            href={getBibleGatewayUrl(comparison.jesus.reference)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:underline font-medium"
          >
            {comparison.jesus.reference}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
          : {comparison.jesus.context}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {getTagsFromIds(comparison.jesus.tags).map((tag) => (
            <span
              key={tag.id}
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-cursive",
                tag.color
              )}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </td>
      <td className="border border-forest-200 p-3">
        <p className="text-black font-cursive">
          {comparison.trump.statement || comparison.trump.policy}
        </p>
        <p className="text-sm text-black mt-1 font-cursive">
          {comparison.trump.context}
        </p>
        <p className="text-sm italic mt-2 text-black font-cursive">
          {comparison.trump.contradiction}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {getTagsFromIds(comparison.trump.tags).map((tag) => (
            <span
              key={tag.id}
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-cursive",
                tag.color
              )}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-forest-100">
          <TabsTrigger
            value="policies"
            className="data-[state=active]:bg-wood-900 data-[state=active]:text-white font-serif"
          >
            Policies
          </TabsTrigger>
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-wood-900 data-[state=active]:text-white font-serif"
          >
            Personal Conduct
          </TabsTrigger>
        </TabsList>

        <TabsContent value="policies">
          <Card className="border-forest-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-wood-900 font-serif">
                Contrasting the Teachings of Jesus Christ with the Policies of
                Donald Trump
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="bg-forest-100">
                        <th className="border border-forest-200 p-3 text-left w-1/2 text-wood-900 font-serif">
                          Jesus's Teaching
                        </th>
                        <th className="border border-forest-200 p-3 text-left w-1/2 text-wood-900 font-serif">
                          Donald Trump's Policy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPolicyComparisons.length > 0 ? (
                        filteredPolicyComparisons.map(renderComparisonRow)
                      ) : (
                        <tr>
                          <td
                            colSpan={2}
                            className="border border-forest-200 p-6 text-center text-black font-cursive"
                          >
                            No comparisons match your current filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal">
          <Card className="border-forest-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-wood-900 font-serif">
                Contrasting the Teachings of Jesus Christ with the Actions and
                Statements of Donald Trump
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="bg-forest-100">
                        <th className="border border-forest-200 p-3 text-left w-1/2 text-wood-900 font-serif">
                          Jesus's Teaching
                        </th>
                        <th className="border border-forest-200 p-3 text-left w-1/2 text-wood-900 font-serif">
                          Donald Trump's Statement/Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPersonalComparisons.length > 0 ? (
                        filteredPersonalComparisons.map(renderComparisonRow)
                      ) : (
                        <tr>
                          <td
                            colSpan={2}
                            className="border border-forest-200 p-6 text-center text-black font-cursive"
                          >
                            No comparisons match your current filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
