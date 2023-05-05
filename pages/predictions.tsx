import getDateString from "@/utils/getDateString";
import PredictionsTable from "@/components/predictions/PredictionsTable";

function Predictions(props) {
    const {prevFixtures, upcomingFixtures, predictions} = props

    return (
        <main className="min-h-screen p-24 flex flex-col items-center">
            <h1 className="font-bold font-2xl text-center mb-4">Будущие Игры</h1>
            <div className="mb-8">
                <PredictionsTable fixtures={upcomingFixtures} predictions={predictions} />
            </div>
            <h1 className="font-bold font-2xl text-center mb-4">Прошедшие Игры</h1>
            <div className="mb-8">
                <PredictionsTable fixtures={prevFixtures} predictions={predictions} />
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const fixturesResponse = await fetch("http://localhost:8000/api/v0/fixtures")
    const fixturesData = await fixturesResponse.json()
    const {fixtures} = fixturesData
    const prevFixtures = []
    const upcomingFixtures = []
    const currentDate = new Date()
    const predictionsResponse = await fetch("http://localhost:8000/api/v0/predictions")
    const predictionsData = await predictionsResponse.json()
    const {predictions} = predictionsData


    fixtures.forEach(fixture => {
        const date =  new Date(fixture.startTime * 1000)
        fixture.dateString = getDateString(date)
        if (date > currentDate) {
            upcomingFixtures.push(fixture)
        } else {
            prevFixtures.push(fixture)
        }
    })

    return {
        props: {
            prevFixtures: prevFixtures.sort(fixture => -fixture.startTime),
            upcomingFixtures: upcomingFixtures.sort(fixture => fixture.startTime),
            predictions
        }
    }
}

export default Predictions
