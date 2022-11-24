import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription }  from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './components/queries'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Recommend from './components/Recommend'
import { updateCache } from './components/updateCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ token, setToken] = useState(null)
  let genres = []

  
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  
  
  const client = useApolloClient()


  if (books.data) {
    if (books.data.allBooks) {
      const booksFiltered = books.data.allBooks.filter((book) => 
      book.genres.length 
    )
    const genresDuplicate = booksFiltered.map((book, index) => book.genres).flat()
    genres = (genresDuplicate.filter((genre, index) => genresDuplicate.indexOf(genre) === index))
    
    }
  }
  

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addBook = data.data.bookAdded
      notify(`${addBook.title} added`)
      
      updateCache(client.cache, { query: ALL_BOOKS}, addBook)
    }
  })

  if (authors.loading) {
    return <div>loading...</div> 
  }
  console.log(books.data)
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  
  

  //Add Toggle function for buttons
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <Togglable token={token} setPage={setPage} logout={logout} buttons={true}/> 
        
      </div>
      <Notify errorMessage={errorMessage}/>
      <Authors show={page === 'authors'} authors={authors.data} notify={notify} />

      <Books show={page === 'books'} client={client} genres={genres}/>

      <NewBook show={page === 'add'} notify={notify}/>

      <Login show={page === 'login'} notify={notify} setToken={setToken} setError={notify} setPage={setPage}/>

      <Recommend show={page === 'recommend'} notify={notify} />
    
    </div>
  )
}

export default App
