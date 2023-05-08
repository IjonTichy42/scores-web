import ResultsForm from "@/components/results/ResultsForm";

const AddResults = (props) => {
    const {fixtures} = props
    return (
        <div className="min-h-screen p-24 flex flex-col items-center">
            <ResultsForm fixtures={fixtures} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(process.env.API_HOST + "/fixtures/without-results")
    const data = await response.json()
    const {fixtures} = data

    return {
        props: {
            fixtures
        }
    }
}

export default AddResults
