export const formatSeasonDate = (dateString: string) => {
  const date = new Date(dateString)

  if (date.getDate() === 1) {
    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
