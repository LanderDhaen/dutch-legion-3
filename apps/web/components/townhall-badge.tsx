import { Badge } from "@workspace/ui/components/badge"

interface TownhallBadgeProps {
  townhall: number
}

export default function TownhallBadge({ townhall }: TownhallBadgeProps) {
  return (
    <Badge variant="secondary" className="tabular-nums">
      TH{townhall}
    </Badge>
  )
}
