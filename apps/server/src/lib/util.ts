export const TAG_REGEX = /^(?:#|%23)?[PYLQGRJCUV0289]{3,9}$/
export const DISCORD_ID_REGEX = /^(?<id>\d{17,20})$/

export const normalizeTag = (tag: string) =>
  `#${tag.replace(/^#/, "").toUpperCase()}`
