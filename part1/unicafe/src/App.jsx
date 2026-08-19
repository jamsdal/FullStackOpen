import { useState } from 'react'

const Header = ({ content }) => <h1>{content}</h1>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({ text, amount}) => <p>{text} {amount}</p>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header content="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header content="statistics" />
      <Display text="good" amount={good} />
      <Display text="neutral" amount={neutral} />
      <Display text="bad" amount={bad} />
    </div>
  )
}

export default App