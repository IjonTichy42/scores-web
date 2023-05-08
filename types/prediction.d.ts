export type PredictionSave = {
    fixtureId: number
    homeProgress: boolean | null
    ftHomeScore: number
    ftAwayScore: number
}

export type Prediction = PredictionSave & {
    id: number
    name: string
}
