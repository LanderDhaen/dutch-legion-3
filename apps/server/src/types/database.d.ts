export interface Database {
  modifier: Modifier
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
  date: Date | string
}

interface Participation {
  id: number
  clanTag: string
  leagueId: number
  modifierId: number
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
