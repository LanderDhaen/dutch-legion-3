export const normalizeTag = (tag: string) =>
  `#${tag.replace(/^#/, "").toUpperCase()}`
