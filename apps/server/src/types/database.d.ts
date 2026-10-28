export interface Database {
  member: Member
  player: Player
  link: Link
  modifier: Modifier
  version: Version
  league: League
  clan: Clan
  season: Season
  participation: Participation
  statistic: Statistic
}

interface Member {
  id: string
  username: string
  globalName: string | null
}

interface Player {
  tag: string
  name: string
  townhall: number
}

interface Link {
  isPrimary: boolean
  memberId: string
  playerTag: string
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
