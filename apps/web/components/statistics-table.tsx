import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

interface StatisticsTableProps {
  statistics: {
    wars: number
    stars: number
    destruction: number
    average: number
    missed: number
  }
}

export default function StatisticsTable({ statistics }: StatisticsTableProps) {
  return (
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
              {statistics.wars}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 text-xs">Stars</TableCell>
            <TableCell
              colSpan={2}
              className="py-2 text-right text-xs tabular-nums"
            >
              {statistics.stars}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 text-xs">Destruction</TableCell>
            <TableCell
              colSpan={2}
              className="py-2 text-right text-xs tabular-nums"
            >
              {statistics.destruction}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 text-xs">Missed</TableCell>
            <TableCell
              colSpan={2}
              className="py-2 text-right text-xs tabular-nums"
            >
              {statistics.missed}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
