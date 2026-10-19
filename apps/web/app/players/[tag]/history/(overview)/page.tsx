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
import { formatSeasonDate } from "@web/lib/util"
import StatisticsTable from "@web/components/statistics-table"
import TownhallBadge from "@web/components/townhall-badge"

export default async function Page({
  params,
}: {
  params: Promise<{
    tag: string
  }>
}) {
  const { tag } = await params

  const { data: player, error } = await api.players({ tag: tag }).history.get()

  if (error) {
    notFound()
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card className="shadow-md md:col-span-3">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <span>History</span>
            <span>Tag</span>
          </CardDescription>
          <CardTitle className="flex items-center justify-between font-bold">
            <span>{player.name}</span>
            <span>{player.tag}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-32 font-bold">Season</TableHead>
                  <TableHead className="w-48 font-bold">Clan</TableHead>
                  <TableHead className="w-48 font-bold">League</TableHead>
                  <TableHead className="w-48 font-bold">Modifier</TableHead>
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
                {player.seasons.map((season, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatSeasonDate(season.date)}</TableCell>
                    <TableCell>{season.clan.name}</TableCell>
                    <TableCell>{season.league.name}</TableCell>
                    <TableCell>
                      {season.league.modifier && (
                        <span>{season.league.modifier.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <TownhallBadge townhall={season.townhall} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {season.wars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {season.stars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {season.destruction}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <AverageStarsBadge average={season.average} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {season.missed > 0 && season.missed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>Participations</span>
              <span>Average</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold tabular-nums">
              {player.statistics.participations}
              <AverageStarsBadge average={player.statistics.average} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsTable statistics={player.statistics} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
