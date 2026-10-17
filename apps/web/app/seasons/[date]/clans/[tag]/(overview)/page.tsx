import { api } from "@web/api"
import { notFound } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import AverageStarsBadge from "@web/components/average-stars-badge"
import { formatSeasonDate } from "@web/lib/util"

export default async function Page({
  params,
}: {
  params: Promise<{
    date: string
    tag: string
  }>
}) {
  const { date, tag } = await params

  const { data: season, error } = await api
    .seasons({ date: date })
    .clans({ tag: tag })
    .get()

  if (error) {
    notFound()
  }

  const modifier = season.modifier

  const modifiers = [
    {
      name: "Def. Buildings",
      dps: modifier.additionalDefendingBuildingDps,
      hp: null,
    },
    {
      name: "Def. Heroes",
      dps: modifier.additionalDefendingHeroesDps,
      hp: modifier.additionalDefendingHeroesHealth,
    },
    {
      name: "Def. Guardians",
      dps: modifier.additionalDefendingGuardiansDps,
      hp: modifier.additionalDefendingGuardiansHealth,
    },
    {
      name: "Att. Heroes",
      dps: modifier.reducedAttackingHeroesDps,
      hp: modifier.reducedAttackingHeroesHealth,
    },
  ]

  const equipmentModifiers = [
    {
      name: "Common",
      level: modifier.commonEquipmentCap,
    },
    {
      name: "Epic",
      level: modifier.epicEquipmentLevel,
    },
  ]

  const formatPercentage = (value: number) => `${value > 0 ? "+" : ""}${value}%`

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card className="shadow-md md:col-span-3">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <span>Performance</span>
            <span>Season</span>
          </CardDescription>
          <CardTitle className="flex items-center justify-between font-bold">
            <span>{season.clan.name}</span>
            <span>{formatSeasonDate(season.date)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-4 text-right font-bold">#</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Townhall
                  </TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Wars
                  </TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Stars
                  </TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Destruction
                  </TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Average
                  </TableHead>
                  <TableHead className="w-36 text-right font-bold">
                    Missed
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {season.statistics.map((statistic, index) => (
                  <TableRow key={statistic.tag}>
                    <TableCell className="text-right tabular-nums">
                      {index + 1}.
                    </TableCell>
                    <TableCell>{statistic.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="tabular-nums">
                        TH{statistic.townhall}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {statistic.wars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {statistic.stars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {statistic.destruction}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <AverageStarsBadge average={statistic.average} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {statistic.missed > 0 && statistic.missed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>{" "}
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>League</span>
              <span>Modifier</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold">
              <span>{season.league}</span>
              <span>{season.modifier.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead className="h-8 text-xs">Unit</TableHead>
                    <TableHead className="h-8 text-right text-xs">
                      DPS
                    </TableHead>
                    <TableHead className="h-8 text-right text-xs">HP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modifiers.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="py-2 text-xs">
                        {item.name}
                      </TableCell>
                      <TableCell className="py-2 text-right text-xs tabular-nums">
                        {formatPercentage(item.dps)}
                      </TableCell>
                      <TableCell className="py-2 text-right text-xs tabular-nums">
                        {item.hp ? formatPercentage(item.hp) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead className="h-2 text-xs">Equipment</TableHead>
                    <TableHead colSpan={2} className="h-8 text-right text-xs">
                      Cap
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentModifiers.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="py-2 text-xs">
                        {item.name}
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        className="py-2 text-right text-xs tabular-nums"
                      >
                        {item.level}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
