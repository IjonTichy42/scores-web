import competitionMapper from "@/utils/competitionMapper";
import {Fixture} from "@/types/fixture";
import {Prediction} from "@/types/prediction";

const PredictionsTable = ({fixtures, predictions}: {fixtures: Fixture[], predictions: Prediction[]}) => (
    <table className="border-2 border-black">
        <thead>
        <tr>
            <th className="border-2 border-black w-60">
                Турнир
            </th>
            <th className="border-2 border-black w-40">
                Дата
            </th>
            <th className="border-2 border-black w-72">
                Участники
            </th>
            <th className="border-2 border-black w-40">
                Ответный матч
            </th>
            <th className="border-2 border-black w-96">
                Прогнозы
            </th>
            <th className="border-2 border-black w-72">
                Результат
            </th>
        </tr>
        </thead>
        <tbody>
        {
            fixtures.map((fixture) => (
                <tr key={fixture.id}>
                    <td className="border-2 border-black p-2">
                        {competitionMapper(fixture.competitionId)}
                    </td>
                    <td className="border-2 border-black p-2">
                        {fixture.dateString}
                    </td>
                    <td className="border-2 border-black p-2">
                        {fixture.homeTeam}-{fixture.awayTeam}
                    </td>
                    <td className="border-2 border-black p-2">
                        {fixture.progressApplicable ? "Да" : "Нет"}
                    </td>
                    <td className="border-2 border-black p-2">
                        {predictions.filter(prediction => prediction.fixtureId === fixture.id).sort((a,b) => {
                            if (a.name > b.name) {
                                return 1
                            }
                            if (b.name > a.name) {
                                return -1
                            }
                            return 0
                        }).map(prediction => (
                            <div key={prediction.id}>
                                {prediction.name} {prediction.ftHomeScore}:{prediction.ftAwayScore} {fixture.progressApplicable && (prediction.homeProgress ? "проход " + fixture.homeTeam : "проход " + fixture.awayTeam)}
                            </div>
                        ))}
                    </td>
                    <td className="border-2 border-black p-2">
                        {fixture.ftHomeScore ?
                            (<>{fixture.ftHomeScore}:{fixture.ftAwayScore} {fixture.progressApplicable && (fixture.homeProgress ? "проход " + fixture.homeTeam : "проход " + fixture.awayTeam)}</>) :
                            "-"
                        }
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
)

export default PredictionsTable