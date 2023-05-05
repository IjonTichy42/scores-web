import {useState} from "react";
import { useRouter } from "next/router";

const PredictionsForm = ({fixtures}) => {
    const router = useRouter()
    const predictionsSetter = (fixtures) => {
        const predictions = {}
        fixtures.forEach(fixture => {
            predictions[fixture.id] = {
                ftHomeScore: null,
                ftAwayScore: null,
                homeProgress: fixture.progressApplicable ? false: null
            }
        })
        return predictions
    }

    const [predictions, setPredictions] = useState(predictionsSetter(fixtures))
    const [phase, setPhase] = useState(0)
    const [code, setCode] = useState<string>()
    const [error, setError] = useState<string>()

    const save = async () => {
        setPhase(1)
        const predictionsArray = []
        Object.entries(predictions).forEach((prediction) => {
            predictionsArray.push({
                fixtureId: prediction[0],
                homeProgress: prediction[1].homeProgress,
                ftHomeScore: Number(prediction[1].ftHomeScore),
                ftAwayScore: Number(prediction[1].ftAwayScore)
            })
        })
        const response = await fetch("http://127.0.0.1:8000/api/v0/predictions", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                predictions: predictionsArray
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
        return "Нет матчей для прогнозов"
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
                                    setPredictions(prevState => {
                                        const state = {...prevState}
                                        state[fixture.id].ftHomeScore = e.target.value
                                        return state
                                    })
                                }}
                                value={predictions[fixture.id].ftHomeScore}
                            />
                        </td>
                        <td>:</td>
                        <td>
                            <input
                                type="number"
                                className="p-2 border-2 m-2 w-12 bg-white rounded-2xl text-center"
                                required
                                onChange={(e) => {
                                    setPredictions(prevState => {
                                        const state = {...prevState}
                                        state[fixture.id].ftAwayScore = e.target.value
                                        return state
                                    })
                                }}
                                value={predictions[fixture.id].ftAwayScore}
                            />
                        </td>
                        <td>
                            {fixture.awayTeam}
                        </td>
                        <td>{fixture.progressApplicable && (<><input
                            type="checkbox"
                            className="p-2 border-2 m-2 bg-white rounded-2xl"
                            onChange={(e) => {
                                setPredictions(prevState => {
                                    const state = {...prevState}
                                    state[fixture.id].homeProgress = e.target.checked
                                    return state
                                })
                            }}
                            value={predictions[fixture.id].homeProgress}
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
                    maxLength="6"
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

export default PredictionsForm
