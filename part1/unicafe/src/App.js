import React, {useState} from 'react'

// Handles printing statistic lines
const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// Handles counting of review statistics
const Statistics = (props) => {
  const reviewAmount = props.good + props.bad + props.neutral
  const reviewSum = props.good - props.bad
  const reviewAvg = reviewSum / reviewAmount 
  const reviewPosiPer = (props.good / reviewAmount) * 100

  if (reviewAmount < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={reviewAmount} />
        <StatisticLine text='average' value={reviewAvg} />
        <StatisticLine text='positive' value={reviewPosiPer} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  // Handle feedback counting (good, bad and neutral)
  const handleGoodReview = () => {
    
    setGood(good + 1)
}
  const handleBadReview = () => {
    
    setBad(bad + 1)
  }
  const handleNeutralReview = () => {
    
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGoodReview} text='good' />
        <Button handleClick={handleNeutralReview} text='neural' />
        <Button handleClick={handleBadReview} text='bad' />
      </div>
      <h2>statistics</h2>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )

}


export default App;
