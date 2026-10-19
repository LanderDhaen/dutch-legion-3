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
    tag: string
  }>
}) {
  const { tag } = await params

  const { data: player, error } = await api.players({ tag: tag }).history.get()

  if (error) {
    notFound()
  }

  const hasParticipations = player.seasons.length > 0

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
                {hasParticipations ? (
                  player.seasons.map((season, index) => (
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
                        <Badge variant="secondary" className="tabular-nums">
                          TH{season.townhall}
                        </Badge>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center italic">
                      This player has not participated in any CWL seasons.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>{" "}
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>Participations</span>
              <span>Average</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold">
              {hasParticipations ? (
                <span className="tabular-nums">{player.seasons.length}</span>
              ) : (
                <span className="text-muted-foreground italic">None</span>
              )}
              {player.average ? (
                <AverageStarsBadge average={player.average} />
              ) : (
                <span className="text-muted-foreground italic">No results</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead colSpan={3} className="h-8 text-xs">
                      Statistics
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="py-2 text-xs">Wars</TableCell>
                    <TableCell
                      colSpan={2}
                      className="py-2 text-right text-xs tabular-nums"
                    >
                      {player.wars ?? "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2 text-xs">Stars</TableCell>
                    <TableCell
                      colSpan={2}
                      className="py-2 text-right text-xs tabular-nums"
                    >
                      {player.stars ?? "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-2 text-xs">Destruction</TableCell>
                    <TableCell
                      colSpan={2}
                      className="py-2 text-right text-xs tabular-nums"
                    >
                      {player.destruction ?? "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
