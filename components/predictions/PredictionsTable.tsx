import competitionMapper from "@/utils/competitionMapper";
import {Fixture} from "@/types/fixture";
import {Prediction} from "@/types/prediction";

const PredictionsTable = ({fixtures, predictions}: {fixtures: Fixture[], predictions: Prediction[]}) => (
    <table className="border-2 border-black dark:border-gray-300 w-full md:w-auto">
        <thead>
        <tr>
            <th className="border-2 dark:border-gray-300 border-black w-10 md:w-60 hidden md:table-cell">
                Турнир
            </th>
            <th className="border-2 dark:border-gray-300 border-black w-10 md:w-40">
                Дата
            </th>
            <th className="border-2 dark:border-gray-300 border-black w-20 md:w-72">
                Участники
            </th>
            <th className="border-2 dark:border-gray-300 border-black w-10 md:w-40 hidden md:table-cell">
                Ответный матч
            </th>
            <th className="border-2 dark:border-gray-300 border-black w-20 md:w-96">
                Прогнозы
            </th>
            <th className="border-2 dark:border-gray-300 border-black w-20 md:w-72">
                Результат
            </th>
        </tr>
        </thead>
        <tbody>
        {
            fixtures.map((fixture) => (
                <tr key={fixture.id}>
                    <td className="border-2 border-black dark:border-gray-300 p-2 hidden md:table-cell">
                        {competitionMapper(fixture.competitionId)}
                    </td>
                    <td className="border-2 border-black dark:border-gray-300 p-2">
                        {fixture.dateString}
                    </td>
                    <td className="border-2 border-black dark:border-gray-300 p-2">
                        {fixture.homeTeam}-{fixture.awayTeam}
                    </td>
                    <td className="border-2 border-black dark:border-gray-300 p-2 hidden md:table-cell">
                        {fixture.progressApplicable ? "Да" : "Нет"}
                    </td>
                    <td className="border-2 border-black dark:border-gray-300 p-2">
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
                    <td className="border-2 border-black dark:border-gray-300 p-2">
                        {typeof fixture.ftHomeScore === "number" ?
                            (<>{fixture.ftHomeScore}:{fixture.ftAwayScore} {fixture.progressApplicable && (fixture.homeProgress ? "проход " + fixture.homeTeam : "проход " + fixture.awayTeam)}</>)
                            : '-'
                        }
                        {}
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
)

export default PredictionsTable