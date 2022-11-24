import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "./queries"

const Recommend = (props) => {

    const user = useQuery(ME)
    if (user.data) {
        if (user.data.me) {
            localStorage.setItem('user-favourite-genre', user.data.me.favouriteGenre)
            console.log(localStorage.getItem('user-favourite-genre'))
        }
    }
    const genre = localStorage.getItem('user-favourite-genre')
    const { data, refetch } = useQuery(ALL_BOOKS, { variables: { genre }})
    console.log(data)
    if (!props.show) {
        return null
      }
    
    return (
        <div>
            <h2>Recommended books</h2>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {data.allBooks.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
    </div>
    )
    
}

export default Recommend