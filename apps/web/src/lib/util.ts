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

export const formatAverage = (average: number) => {
  return average.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

export const formatModifier = (modifier: number | null) => {
  if (modifier === 0 || modifier === null) {
    return "-"
  }

  return `${modifier.toLocaleString("en-US", {
    signDisplay: "exceptZero",
  })}%`
}
