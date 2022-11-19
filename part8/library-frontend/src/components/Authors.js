import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries"
import Select from 'react-select'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ authorMutation ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }
  console.log(props.authors)
  const authors = props.authors.allAuthors
  const authorOptions = authors.map((a) => (
    ({value: a.name, label: a.name})
  )
      
    )

  const submit = async (event) => {
    event.preventDefault()
    
    authorMutation({ variables: { name, born } })

  }


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
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <Select options={authorOptions}
                onChange={(target) => setName(target.value)}/><br></br>
        born
        <input
          value={born}
          onChange={({target}) => setBorn(target.value)}
        /><br></br>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
