import React, { useState } from 'react'

//Button rakennus
const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

//anekdootti rivin rakennus
const Anecdote = ({anecdotes, vote, selected}) => {
  return (
    <p>
    {anecdotes[selected]} <br></br>
    has {vote[selected]} votes <br></br>
    </p>
  )
}

const votes = Array(7).fill(0)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [vote, setVote] = useState(votes)
  const [selected, setSelected] = useState(0)
  const [maxKey, setMaxKey] = useState(0)

  //random int generointi
  const getRandomInt = () => {
    const listLen = anecdotes.length
    const randInt = Math.floor(Math.random() * listLen)
    setSelected(randInt)
  }

  //äänestyksen kerrytys ja äänilaskurin käynnistys
  const voteInc = () => {
    
    const copy = { ...vote }
    copy[selected] += 1
    setVote(copy)
    VoteCounter()
  }

  const VoteCounter = () => {
    console.log(vote)
    let temp = 0
    for (var i = 0; i < 7; i++ ){
      if (vote[i] > temp) {
        temp = i
      }
    }
    setMaxKey(temp)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdotes={anecdotes} vote={vote} selected={selected} />
      <Button handleClick={voteInc} text='vote' />
      <Button handleClick={getRandomInt} text='next anecdote'/>
    
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} vote={vote} selected={maxKey} />
    </div>
  )
}


export default App
