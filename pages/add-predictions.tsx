import PredictionsForm from "@/components/predictions/PredictionsForm";

const AddPredictions = (props) => {
    const {fixtures} = props
    return (
        <div className="min-h-screen p-24 flex flex-col items-center">
            <PredictionsForm fixtures={fixtures} />
        </div>
    )
}

export async function getServerSideProps(context) {
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
