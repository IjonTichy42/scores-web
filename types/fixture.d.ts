export type Fixture = {
    id: number
    competitionId: number
    dateString: string
    homeTeam: string
    awayTeam: string
    progressApplicable?: boolean
    ftHomeScore?: number
    ftAwayScore?: number
    homeProgress?: boolean | null
}

export type FixtureSave = {
    host: string
    away: string
    date: Date
    league: string
    progressApplicable: boolean
    code: string
}

export type FixtureFromServer= Fixture & {
    startTime: number
}