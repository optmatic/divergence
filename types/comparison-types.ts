export interface Tag {
  id: string
  name: string
  color: string
}

export interface JesusTeaching {
  teaching: string
  reference: string
  context: string
  tags: string[] // Tag IDs
}

export interface TrumpAction {
  statement?: string
  policy?: string
  context: string
  contradiction: string
  tags: string[] // Tag IDs
}

export interface Comparison {
  id: string
  category: string
  jesus: JesusTeaching
  trump: TrumpAction
  tags: string[] // Tag IDs that apply to the whole comparison
}

export type ComparisonType = "personal" | "policy"
