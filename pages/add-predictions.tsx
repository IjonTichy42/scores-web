import PredictionsForm from "@/components/predictions/PredictionsForm";
import {Fixture} from "@/types/fixture";

const AddPredictions = (props: {fixtures: Fixture[]}) => {
    const {fixtures} = props
    return (
        <div className="min-h-screen p-24 flex flex-col items-center">
            <PredictionsForm fixtures={fixtures} />
        </div>
    )
}

export async function getServerSideProps() {
    const response = await fetch(process.env.API_HOST + "/fixtures/future")
    const data = await response.json()
    const {fixtures} = data

    return {
        props: {
            fixtures
        }
    }
}

export default AddPredictions
