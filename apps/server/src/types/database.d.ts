export interface Database {
  modifier: Modifier
  version: Version
  league: League
  clan: Clan
  season: Season
  participation: Participation
  player: Player
  statistic: Statistic
}

interface Modifier {
  id: number
  name: string
}

interface Version {
  id: number
  effectiveFrom: Date | string
  additionalDefendingBuildingDps: number
  additionalDefendingHeroesDps: number
  additionalDefendingHeroesHealth: number
  additionalDefendingGuardiansDps: number
  additionalDefendingGuardiansHealth: number
  reducedAttackingHeroesDps: number
  reducedAttackingHeroesHealth: number
  commonEquipmentCap: number
  epicEquipmentCap: number
  modifierId: number
}

interface League {
  id: number
  name: string
}

interface Clan {
  tag: string
  name: string
}

interface Season {
  id: number
  date: string
}

interface Participation {
  id: number
  clanTag: string
  leagueId: number
  modifierId: number | null
  seasonId: number
}

interface Player {
  tag: string
  name: string
}

interface Statistic {
  id: number
  townhall: number
  wars: number
  attacks: number
  stars: number
  destruction: number
  playerTag: string
  participationId: string
}
