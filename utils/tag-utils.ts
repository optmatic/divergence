import type { Tag } from "@/types/comparison-types";

// Predefined tags with consistent styling - now with lime green background
export const tags: Record<string, Tag> = {
  humility: {
    id: "humility",
    name: "Humility",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  pride: {
    id: "pride",
    name: "Pride",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  forgiveness: {
    id: "forgiveness",
    name: "Forgiveness",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  retaliation: {
    id: "retaliation",
    name: "Retaliation",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  love: {
    id: "love",
    name: "Love",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  enmity: {
    id: "enmity",
    name: "Enmity",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  meekness: {
    id: "meekness",
    name: "Meekness",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  aggression: {
    id: "aggression",
    name: "Aggression",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  wealth: {
    id: "wealth",
    name: "Wealth",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  spiritualValues: {
    id: "spiritualValues",
    name: "Spiritual Values",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  immigration: {
    id: "immigration",
    name: "Immigration",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  rhetoric: {
    id: "rhetoric",
    name: "Rhetoric",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  economicPolicy: {
    id: "economicPolicy",
    name: "Economic Policy",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  socialWelfare: {
    id: "socialWelfare",
    name: "Social Welfare",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  justiceSystem: {
    id: "justiceSystem",
    name: "Justice System",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  sermon: {
    id: "sermon",
    name: "Sermon on the Mount",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
  parable: {
    id: "parable",
    name: "Parable",
    color: "bg-lime-100 text-wood-900 border border-lime-200",
  },
};

// Map categories to tag IDs
export const categoryToTags: Record<string, string[]> = {
  "Humility vs Pride": ["humility", "pride"],
  "Forgiveness vs Retaliation": ["forgiveness", "retaliation"],
  "Love vs Enmity": ["love", "enmity"],
  "Meekness vs Aggression": ["meekness", "aggression"],
  "Wealth vs Spiritual Values": ["wealth", "spiritualValues"],
  Immigration: ["immigration"],
  Rhetoric: ["rhetoric"],
  "Economic Policy": ["economicPolicy"],
  "Social Welfare": ["socialWelfare"],
  "Justice System": ["justiceSystem"],
};

// Get tag objects from tag IDs
export function getTagsFromIds(tagIds: string[]): Tag[] {
  return tagIds.map((id) => tags[id]).filter(Boolean);
}

// Get category from tags
export function getCategoryFromTags(tagIds: string[]): string | null {
  for (const [category, categoryTags] of Object.entries(categoryToTags)) {
    if (categoryTags.some((tag) => tagIds.includes(tag))) {
      return category;
    }
  }
  return null;
}

// Add a new tag
export function addTag(id: string, name: string, color: string): Tag {
  const newTag = { id, name, color };
  tags[id] = newTag;
  return newTag;
}

// CSS classes for selected tags
export const selectedTagClasses =
  "bg-wood-900 text-white border-2 border-wood-900 font-medium";
