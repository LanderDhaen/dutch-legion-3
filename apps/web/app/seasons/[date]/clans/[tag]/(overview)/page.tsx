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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import AverageStarsBadge from "@web/components/average-stars-badge"
import ModifierTable from "@web/components/modifier-table"
import { formatSeasonDate } from "@web/lib/util"
import TownhallBadge from "@web/components/townhall-badge"

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
    .statistics.get()

  if (error) {
    notFound()
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="grid content-start gap-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription>Season</CardDescription>
            <CardTitle className="font-bold">
              {formatSeasonDate(season.date)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>Clan</span>
              <span>Tag</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold">
              <span>{season.clan.name}</span>
              <span>{season.clan.tag}</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>League</span>
              <span>Modifier</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold">
              <span>{season.league.name}</span>
              {season.league.modifier ? (
                <span>{season.league.modifier.name}</span>
              ) : (
                <span className="text-muted-foreground italic">
                  No Modifiers
                </span>
              )}
            </CardTitle>
          </CardHeader>
          {season.league.modifier && (
            <CardContent className="grid grid-cols-1 gap-4">
              <ModifierTable modifier={season.league.modifier} />
            </CardContent>
          )}
        </Card>
      </div>
      <Card className="shadow-md md:col-span-3">
        <CardHeader>
          <CardDescription>Statistics</CardDescription>
          <CardTitle className="font-bold">
            {formatSeasonDate(season.date)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-48 font-bold">Name</TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Townhall
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Wars
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Stars
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Destruction
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Average
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Missed
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {season.performances.map((performance) => (
                  <TableRow key={performance.tag}>
                    <TableCell>{performance.name}</TableCell>
                    <TableCell className="text-right">
                      <TownhallBadge townhall={performance.townhall} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {performance.statistics.wars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {performance.statistics.stars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {performance.statistics.destruction}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <AverageStarsBadge
                        average={performance.statistics.average}
                      />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {performance.statistics.missed > 0 &&
                        performance.statistics.missed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
