function Home(props) {
    const {users} = props

    return (
        <main className="min-h-screen p-24 flex flex-col items-center">
            <h1 className="font-bold font-2xl text-center mb-4">Таблица</h1>
            <table className="w-1/2">
                <thead>
                    <tr>
                        <th className="w-1/6 border-2 border-blue-950">
                            #
                        </th>
                        <th className="w-1/6 border-2 border-blue-950">
                            Имя
                        </th>
                        <th className="w-1/6 border-2 border-blue-950">
                            ЛЧ
                        </th>
                        <th className="w-1/6 border-2 border-blue-950">
                            ЛЕ
                        </th>
                        <th className="w-1/6 border-2 border-blue-950">
                            ЛК
                        </th>
                        <th className="w-1/6 border-2 border-blue-950">
                            Общий зачёт
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={user.id}>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {index + 1}
                            </td>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {user.name}
                            </td>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {user.pointsUcl}
                            </td>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {user.pointsUel}
                            </td>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {user.pointsUecl}
                            </td>
                            <td className="w-1/6 border-2 border-blue-950 text-center">
                                {user.pointsUcl + user.pointsUel + user.pointsUecl}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </main>
    )
}

export async function getStaticProps(context) {
    const response = await fetch(process.env.API_HOST + "/users")
    const data = await response.json()

    return {
        props: {
            users: data.users.sort(user => user.pointsUcl + user.pointsUel + user.pointsUecl)
        }
    }
}

export default Home
