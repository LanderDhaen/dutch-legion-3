import { Badge } from "@workspace/ui/components/badge"
import { Star } from "lucide-react"

const PERFECT_TRESHOLD = 3.0
const GOOD_TRESHOLD = 2.7
const MEDIOCRE_TRESHOLD = 2.5

export default function AverageStarsBadge({ average }: { average: number }) {
  const badgeClass =
    average >= PERFECT_TRESHOLD
      ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 animate-bounce border-yellow-500"
      : average >= GOOD_TRESHOLD
        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
        : average >= MEDIOCRE_TRESHOLD
          ? "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
          : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"

  const starClass =
    average >= PERFECT_TRESHOLD
      ? "fill-yellow-700 dark:fill-yellow-300"
      : average >= GOOD_TRESHOLD
        ? "fill-green-700 dark:fill-green-300"
        : average >= MEDIOCRE_TRESHOLD
          ? "fill-orange-700 dark:fill-orange-300"
          : "fill-red-700 dark:fill-red-300"

  return (
    <Badge className={badgeClass}>
      {average.toFixed(1)}
      <Star className={starClass} data-icon="inline-end" />
    </Badge>
  )
}
