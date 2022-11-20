import { useState } from 'react'
import { useApolloClient, useQuery }  from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './components/queries'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [page, setPage] = useState('authors')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  console.log(books.data)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (authors.loading) {
    return <div>loading...</div> 
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  console.log(token)

  //Add Toggle function for buttons
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <Togglable token={token} setPage={setPage} logout={logout}/> 
        
      </div>
      <Notify errorMessage={errorMessage}/>
      <Authors show={page === 'authors'} authors={authors.data} notify={notify}/>

      <Books show={page === 'books'} books={books.data}/>

      <NewBook show={page === 'add'} notify={notify}/>

      <Login show={page === 'login'} notify={notify} setToken={setToken} setError={notify} setPage={setPage}/>
    </div>
  )
}

export default App
