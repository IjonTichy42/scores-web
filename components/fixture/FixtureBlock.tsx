import styles from "./FixtureBlock.module.css"
import competitionMapper from "@/utils/competitionMapper";

function FixtureBlock(props) {
    const {fixture} = props

    return (
        <div key={fixture.id} className={styles.root + " bg-gray-200 rounded-md m-4 p-4 flex flex-col justify-center items-center"}>
            <div>
                {competitionMapper(fixture.competitionId)}
            </div>
            <div>
                {fixture.dateString}
            </div>
            <div>
                {fixture.homeTeam} {fixture.ftHomeScore}:{fixture.ftAwayScore} {fixture.awayTeam}
            </div>
        </div>
    )
}

export default FixtureBlock
