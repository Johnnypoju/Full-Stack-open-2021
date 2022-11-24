import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries"
import Togglable from "./Togglable"

const Authors = (props) => {

  const [ authorMutation ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  
  const authors = props.authors.allAuthors
  const authorOptions = authors.map((a) => (
    ({value: a.name, label: a.name})
  )
      
    )

  


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Togglable authorMutation={authorMutation} authorOptions={authorOptions} button={false}/>
    </div>
  )
}

export default Authors
