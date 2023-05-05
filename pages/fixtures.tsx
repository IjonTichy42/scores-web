import FixtureBlock from "@/components/fixture/FixtureBlock";
import {useState} from "react";
import FixtureForm from "@/components/fixture/FixtureForm";
import getDateString from "@/utils/getDateString";

function Fixtures(props) {
    const {prevFixtures, upcomingFixtures} = props
    const [addedPrevFixtures, setAddedPrevFixtures] = useState([])
    const [addedUpcomingFixtures, setAddedUpcomingFixtures] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    const save = async (props) => {
        const {host, away, date, league, progressApplicable, code} = props
        const response = await fetch("http://127.0.0.1:8000/api/v0/fixtures", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                homeTeam: host,
                awayTeam: away,
                startTime: date.getTime() / 1000,
                competitionId: Number(league),
                progressApplicable,
                code: Number(code)
            })
        })
        const data = await response.json()
        const {fixture} = data
        const matchDate = new Date(data.fixture.startTime * 1000)
        const currentDate = new Date()
        fixture.dateString = getDateString(matchDate)
        if (matchDate > currentDate) {
            setAddedUpcomingFixtures(prevState =>  {
                const state = [...prevState]
                state.unshift(data.fixture)
                return state
            })
        } else {
            setAddedPrevFixtures(prevState =>  {
                const state = [...prevState]
                state.unshift(data.fixture)
                return state
            })
        }
    }

    const showForm = () => setIsAdding(true)
    const hideForm = () => setIsAdding(false)

    return (
        <main className="min-h-screen p-24 flex flex-col items-center">
            <h1 className="font-bold font-2xl text-center mb-4">Будущие Игры</h1>
            <div className="grid grid-cols-3">
            {
                addedUpcomingFixtures.map((fixture) => <FixtureBlock key={fixture.id} fixture={fixture} />)
            }
            {
                upcomingFixtures.map((fixture) => <FixtureBlock key={fixture.id} fixture={fixture} />)
            }
            {!isAdding &&
                <button
                    onClick={showForm}
                    className="p-2 bg-white rounded-2xl m-2"
                >
                    Добавить
                </button>
            }
            </div>
            {isAdding &&
                <FixtureForm hide={hideForm} save={save} />
            }
            {!!prevFixtures && (
                <>
                    <h1 className="font-bold font-2xl text-center mb-4">Прошедшие Игры</h1>
                    <div className="grid grid-cols-3">
                        {
                            addedPrevFixtures.map((fixture) => <FixtureBlock key={fixture.id} fixture={fixture} />)
                        }
                        {
                            prevFixtures.map((fixture) => <FixtureBlock key={fixture.id} fixture={fixture} />)
                        }
                    </div>
                </>
            )}
        </main>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:8000/api/v0/fixtures")
    const data = await response.json()
    const {fixtures} = data
    const prevFixtures = []
    const upcomingFixtures = []
    const currentDate = new Date()

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
            upcomingFixtures: upcomingFixtures.sort(fixture => fixture.startTime)
        }
    }
}

export default Fixtures
