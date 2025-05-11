import type { Comparison, ComparisonType } from "@/types/comparison-types"

export const personalConductComparisons: Comparison[] = [
  {
    id: "humility-pride-1",
    category: "Humility vs Pride",
    jesus: {
      teaching: "Everyone who exalts himself will be humbled",
      reference: "Luke 14:11",
      context: "For all those who exalt themselves will be humbled, and those who humble themselves will be exalted.",
      tags: ["humility", "sermon"],
    },
    trump: {
      statement:
        "I'm really rich... I have the best words... I'm the most successful person ever to run for president.",
      context: "Various campaign speeches and interviews",
      contradiction: "Frequently boasts about personal achievements, wealth, and intelligence",
      tags: ["pride"],
    },
    tags: ["humility", "pride"],
  },
  {
    id: "forgiveness-retaliation-1",
    category: "Forgiveness vs Retaliation",
    jesus: {
      teaching: "Turn the other cheek",
      reference: "Matthew 5:39",
      context: "When someone strikes you on the right cheek, turn to him the other also.",
      tags: ["forgiveness", "sermon"],
    },
    trump: {
      statement: "If someone hits you, hit them back ten times harder.",
      context: "Stated at various rallies and in his book 'Think Big and Kick Ass'",
      contradiction: "Advocates retaliation rather than non-violence",
      tags: ["retaliation"],
    },
    tags: ["forgiveness", "retaliation"],
  },
  {
    id: "love-enmity-1",
    category: "Love vs Enmity",
    jesus: {
      teaching: "Love your enemies, do good to those who hate you",
      reference: "Luke 6:27",
      context: "Jesus taught to love enemies and pray for those who persecute you",
      tags: ["love", "sermon"],
    },
    trump: {
      statement: "When people treat me unfairly, I don't let them forget it.",
      context: "Various public statements and social media posts about critics and opponents",
      contradiction: "Maintains public feuds and criticises opponents",
      tags: ["enmity"],
    },
    tags: ["love", "enmity"],
  },
  {
    id: "meekness-aggression-1",
    category: "Meekness vs Aggression",
    jesus: {
      teaching: "Blessed are the meek, for they shall inherit the earth",
      reference: "Matthew 5:5",
      context: "Jesus praised meekness and humility in the Beatitudes",
      tags: ["meekness", "sermon"],
    },
    trump: {
      statement: "You have to be tough. You have to be nasty. You have to be mean.",
      context: "Business advice given in speeches and books",
      contradiction: "Advocates for aggressive rather than meek behaviour",
      tags: ["aggression"],
    },
    tags: ["meekness", "aggression"],
  },
  {
    id: "wealth-spiritual-1",
    category: "Wealth vs Spiritual Values",
    jesus: {
      teaching:
        "It is easier for a camel to go through the eye of a needle than for a rich person to enter the kingdom of God",
      reference: "Matthew 19:24",
      context: "Jesus warned about the spiritual dangers of wealth",
      tags: ["spiritualValues"],
    },
    trump: {
      statement: "The beauty of me is that I'm very rich.",
      context: "Frequently emphasises his wealth as a positive attribute",
      contradiction: "Celebrates wealth as a primary virtue",
      tags: ["wealth"],
    },
    tags: ["wealth", "spiritualValues"],
  },
]

export const policyComparisons: Comparison[] = [
  {
    id: "immigration-1",
    category: "Immigration",
    jesus: {
      teaching: "I was a stranger and you invited me in",
      reference: "Matthew 25:35",
      context: "Jesus taught that welcoming strangers is equivalent to welcoming him",
      tags: ["immigration", "parable"],
    },
    trump: {
      policy:
        "Zero tolerance immigration policy that led to family separations; travel bans from predominantly Muslim countries",
      context: "Immigration policies implemented during presidency",
      contradiction: "Restricted rather than welcomed strangers and refugees",
      tags: ["immigration"],
    },
    tags: ["immigration"],
  },
  {
    id: "rhetoric-1",
    category: "Rhetoric",
    jesus: {
      teaching: "Blessed are the peacemakers",
      reference: "Matthew 5:9",
      context: "Jesus taught that peacemakers are blessed and called children of God",
      tags: ["rhetoric", "sermon"],
    },
    trump: {
      policy:
        "Rhetoric calling for 'revenge' against political opponents; described the press as 'the enemy of the people'",
      context: "Campaign speeches and social media statements",
      contradiction: "Used divisive rhetoric rather than peace-building language",
      tags: ["rhetoric"],
    },
    tags: ["rhetoric"],
  },
  {
    id: "economic-1",
    category: "Economic Policy",
    jesus: {
      teaching: "Do not store up for yourselves treasures on earth",
      reference: "Matthew 6:19",
      context: "Jesus taught to focus on spiritual rather than material wealth",
      tags: ["economicPolicy", "sermon"],
    },
    trump: {
      policy:
        "Tax Cuts and Jobs Act of 2017 that provided significant tax benefits to corporations and wealthy individuals",
      context: "Signature economic legislation during presidency",
      contradiction: "Prioritised policies benefiting material wealth accumulation",
      tags: ["economicPolicy"],
    },
    tags: ["economicPolicy", "wealth"],
  },
  {
    id: "welfare-1",
    category: "Social Welfare",
    jesus: {
      teaching: "Whatever you did for one of the least of these brothers and sisters of mine, you did for me",
      reference: "Matthew 25:40",
      context: "Jesus taught that caring for the vulnerable is equivalent to caring for him",
      tags: ["socialWelfare", "parable"],
    },
    trump: {
      policy: "Proposed cuts to social safety net programmes including food stamps, Medicaid, and housing assistance",
      context: "Budget proposals during presidency",
      contradiction: "Reduced rather than expanded assistance to vulnerable populations",
      tags: ["socialWelfare"],
    },
    tags: ["socialWelfare"],
  },
  {
    id: "justice-1",
    category: "Justice System",
    jesus: {
      teaching: "Blessed are the merciful, for they will be shown mercy",
      reference: "Matthew 5:7",
      context: "Jesus taught the importance of showing mercy to others",
      tags: ["justiceSystem", "sermon"],
    },
    trump: {
      policy: "Expanded use of federal executions; advocated for harsher criminal sentencing",
      context: "Criminal justice policies during presidency",
      contradiction: "Emphasised punishment over mercy in justice system",
      tags: ["justiceSystem"],
    },
    tags: ["justiceSystem"],
  },
]

export const getAllComparisons = (type: ComparisonType): Comparison[] => {
  return type === "personal" ? personalConductComparisons : policyComparisons
}

export const getComparisonById = (id: string): Comparison | undefined => {
  return [...personalConductComparisons, ...policyComparisons].find((c) => c.id === id)
}

export const getComparisonsByTag = (tagId: string, type?: ComparisonType): Comparison[] => {
  const comparisons = type ? getAllComparisons(type) : [...personalConductComparisons, ...policyComparisons]

  return comparisons.filter(
    (c) => c.tags.includes(tagId) || c.jesus.tags.includes(tagId) || c.trump.tags.includes(tagId),
  )
}
