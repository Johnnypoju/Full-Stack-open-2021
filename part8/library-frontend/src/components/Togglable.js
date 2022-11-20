import Select from 'react-select'
import { useState } from 'react'

const Togglable = (props) => {
    const [ name, setName ] = useState('')
    const [ born, setBorn ] = useState('')
    const submit = async (event) => {
        event.preventDefault()
        
        props.authorMutation({ variables: { name, born } })
    
      }

    if (props.buttons === true) {
            if(props.token){
                return(
                    <>
                        <button onClick={() => props.setPage('add')}>add book</button>
                        <button onClick={props.logout}>logout</button>
                    </>
                )
            }

        return(
            
                <button onClick={() => props.setPage('login')}>login</button>  )
        
    }
    else {
        if (props.token) {
            return (
                <div>
                    <h2>Set birthyear</h2>
                    <form onSubmit={submit}>
                        name
                        <Select options={props.authorOptions}
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
    }
}

export default Togglable