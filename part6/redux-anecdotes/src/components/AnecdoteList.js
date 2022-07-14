
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification} from "../reducers/notificationReducer"




const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      console.log(state.filter)
      if (state.filter === ""){
        console.log("Filter empty")
        
        return state.anecdotes
      }
      else {
        const filteredAnecdotes = state.anecdotes.filter(anecdote => {
          return anecdote.content.toLowerCase().includes(state.filter)
        })
        return filteredAnecdotes  
      }
    })
    
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        const anecdoteNotification = anecdotes.find(anecdote => anecdote.id === id)
        
        dispatch(setNotification(anecdoteNotification))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
      }
      console.log(anecdotes)
    return (
    
    <div>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList