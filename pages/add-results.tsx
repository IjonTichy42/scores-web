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
    const response = await fetch("http://localhost:8000/api/v0/fixtures/without-results")
    const data = await response.json()
    const {fixtures} = data

    return {
        props: {
            fixtures
        }
    }
}

export default AddResults
