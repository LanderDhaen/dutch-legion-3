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
import TownhallBadge from "@web/components/townhall-badge"
import StatisticsTable from "@web/components/statistics-table"

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string
  }>
}) {
  const { id } = await params

  const { data: member, error } = await api.members({ id: id }).statistics.get()

  if (error) {
    notFound()
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="grid content-start gap-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>Member</span>
              <span>Accounts</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold tabular-nums">
              <span>{member.players[0]?.name}</span>
              <span>{member.players.length}</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardDescription className="flex items-center justify-between">
              <span>Participations</span>
              <span>Average</span>
            </CardDescription>
            <CardTitle className="flex items-center justify-between font-bold tabular-nums">
              {member.statistics.participations}
              <AverageStarsBadge average={member.statistics.average} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsTable statistics={member.statistics} />
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-md md:col-span-3">
        <CardHeader>
          <CardDescription>Statistics</CardDescription>
          <CardTitle className="font-bold">{member.players[0]?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-32 font-bold">Name</TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Townhall
                  </TableHead>
                  <TableHead className="w-32 text-right font-bold">
                    Participations
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
                {member.players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell className="text-right">
                      <TownhallBadge townhall={player.townhall} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.statistics.participations}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.statistics.wars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.statistics.stars}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.statistics.destruction}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <AverageStarsBadge average={player.statistics.average} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {player.statistics.missed > 0 && player.statistics.missed}
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
