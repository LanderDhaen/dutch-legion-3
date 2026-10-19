import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

interface ModifierTableProps {
  modifier: {
    additionalDefendingBuildingDps: number
    additionalDefendingHeroesDps: number
    additionalDefendingHeroesHealth: number
    additionalDefendingGuardiansDps: number
    additionalDefendingGuardiansHealth: number
    reducedAttackingHeroesDps: number
    reducedAttackingHeroesHealth: number
    commonEquipmentCap: number
    epicEquipmentCap: number
  }
}

export default function ModifierTable({ modifier }: ModifierTableProps) {
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
    { name: "Common", level: modifier.commonEquipmentCap },
    { name: "Epic", level: modifier.epicEquipmentCap },
  ]

  const formatPercentage = (value: number) => `${value > 0 ? "+" : ""}${value}%`

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="h-8 text-xs">Unit</TableHead>
              <TableHead className="h-8 text-right text-xs">DPS</TableHead>
              <TableHead className="h-8 text-right text-xs">HP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modifiers.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="py-2 text-xs">{item.name}</TableCell>
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
              <TableHead className="h-8 text-xs">Equipment</TableHead>
              <TableHead colSpan={2} className="h-8 text-right text-xs">
                Cap
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentModifiers.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="py-2 text-xs">{item.name}</TableCell>
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
    </>
  )
}
