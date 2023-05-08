import {useState} from "react";
import { useRouter } from "next/router";
import {Fixture} from "@/types/fixture";
import {ResultSave} from "@/types/result";

const ResultsForm = ({fixtures}: {fixtures: Fixture[]}) => {
    const router = useRouter()
    const resultsSetter = (fixtures: Fixture[]) => {
        const results = new Map()
        fixtures.forEach(fixture => {
            results.set(fixture.id, {
                ftHomeScore: null,
                ftAwayScore: null,
                homeProgress: fixture.progressApplicable ? false: null
            })
        })
        return results
    }

    const [results, setResults] = useState(resultsSetter(fixtures))
    const [phase, setPhase] = useState(0)
    const [code, setCode] = useState<string>()
    const [error, setError] = useState<string>()

    const save = async () => {
        setPhase(1)
        const resultsArray: ResultSave[] = []
        results.forEach((result, fixtureId) => {
            resultsArray.push({
                id: fixtureId,
                homeProgress: result.homeProgress,
                ftHomeScore: Number(result.ftHomeScore),
                ftAwayScore: Number(result.ftAwayScore)
            })
        })
        const response = await fetch(process.env.API_HOST + "/fixtures/set-results", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                results: resultsArray
            })
        })
        const data = await response.json()
        if (response.ok) {
            router.push("/")
        } else {
            setError(data.detail)
        }
        setPhase(0)
    }

    if (!fixtures.length) {
        return (<>Все результаты указаны</>)
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                save()
            }}
        >
            <table>
                <tbody>
                    {fixtures.map(fixture => (
                        <tr key={fixture.id}>
                            <td className="text-right">
                                {fixture.homeTeam}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="p-2 border-2 m-2 w-12 bg-white rounded-2xl text-center"
                                    required
                                    onChange={(e) => {
                                        setResults(prevState => {
                                            const state = new Map(prevState)
                                            state.get(fixture.id).ftHomeScore = e.target.value
                                            return state
                                        })
                                    }}
                                    value={results.get(fixture.id).ftHomeScore}
                                />
                            </td>
                            <td>:</td>
                            <td>
                                <input
                                    type="number"
                                    className="p-2 border-2 m-2 w-12 bg-white rounded-2xl text-center"
                                    required
                                    onChange={(e) => {
                                        setResults(prevState => {
                                            const state = new Map(prevState)
                                            state.get(fixture.id).ftAwayScore = e.target.value
                                            return state
                                        })
                                    }}
                                    value={results.get(fixture.id).ftAwayScore}
                                />
                            </td>
                            <td>
                                {fixture.awayTeam}
                            </td>
                            <td>{fixture.progressApplicable && (<><input
                                type="checkbox"
                                className="p-2 border-2 m-2 bg-white rounded-2xl"
                                onChange={(e) => {
                                    setResults(prevState => {
                                        const state = new Map(prevState)
                                        state.get(fixture.id).homeProgress = e.target.checked
                                        return state
                                    })
                                }}
                                value={results.get(fixture.id).homeProgress}
                            /> Проход домашней команды</>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label>Код:</label>
                <input
                    className="p-2 border-2 m-2 w-40 bg-white rounded-2xl text-center"
                    onChange={(e) => {
                        setCode(e.target.value)
                    }}
                    required
                    maxLength={6}
                    value={code}
                />
            </div>
            {!!error &&
                <div className="text-red-500">
                    {error}
                </div>
            }
            <div className="text-right">
                <button className="p-4 bg-white rounded-2xl m-4 mr-0" type="submit" disabled={phase === 1}>
                    Сохранить
                </button>
            </div>
        </form>
    )
}

export default ResultsForm
