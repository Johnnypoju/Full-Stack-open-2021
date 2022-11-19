import { useState } from 'react'
import { useQuery }  from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './components/queries'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
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

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage}/>
      <Authors show={page === 'authors'} authors={authors.data}/>

      <Books show={page === 'books'} books={books.data}/>

      <NewBook show={page === 'add'} notify={notify}/>
    </div>
  )
}

export default App
