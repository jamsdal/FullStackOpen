import { useState } from 'react'

const Header = ({ content }) => <h1>{content}</h1>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({ text, amount}) => <p>{text} {amount}</p>

const Statistics = ({ good, neutral, bad}) => {
  const total = good + bad + neutral
  if (total === 0){
    return <p>No feedback given</p>
  } else {
    return(
      <div>
        <Display text="Good" amount={good} />
        <Display text="Neutral" amount={neutral} />
        <Display text="Bad" amount={bad} />
        <Total total={total} />
        <Average good={good} bad={bad} total={total} />
        <Positive good={good} total={total} />
      </div>
    )
  }
}

const Total = ({ total }) => <p>All {total}</p>

const Average = ({ good, bad, total}) => {
  if (total !== 0){
    return <p>Average {(good - bad)/total}</p>
  } else {
    return <p>Average 0</p>
  }
}

const Positive = ({ good, total}) => {
  if (total !== 0){
    return <p>Positive {(good/total)*100}%</p>
  } else {
    return <p>Positive 0</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header content="Give Feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header content="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App