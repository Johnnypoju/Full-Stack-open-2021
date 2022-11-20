import { LOGIN } from "./queries"
import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"


const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            props.notify(error.graphQLErrors[0].message)
        }
    })

    

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('site-user-token', token)
        }
    }, [result.data])

    if (!props.show) {
        return null
      }

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password }})
        props.setPage('authors')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <input
                    type='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                    password <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <button type='submit'>login</button>
                </div>
            </form>
        </div>
    )
} 

export default LoginForm