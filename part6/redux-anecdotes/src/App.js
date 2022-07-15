import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import { useEffect } from 'react'
import { initialAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'




const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App