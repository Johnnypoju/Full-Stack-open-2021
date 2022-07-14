import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification} from "../reducers/notificationReducer"




const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        const anecdoteNotification = anecdotes.find(anecdote => anecdote.id === id)
        
        dispatch(setNotification(anecdoteNotification))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
      }

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