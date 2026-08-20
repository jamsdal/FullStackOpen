import { useState } from 'react'

const Header = ({ content }) => <h1>{content}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const DisplayAnecdote = ({ text }) => <p>{text}</p>
const DisplayVote = ({ number }) => {
  if (number === 1) {
    return <p>Has {number} vote</p>
  } else {
    return <p>Has {number} votes</p>
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomInt = (max) => Math.floor(Math.random() * max)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMaxVoted] = useState(0)

  const findMostVoted = array => array.findIndex(value => Math.max(...array) === value)

  const handleAnecdoteClick = () => {
    setSelected(randomInt(anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]

    copy[selected] += 1

    setMaxVoted(findMostVoted(copy))
    
    setVotes(copy)
  }

  return (
    <div>
      <Header content="Anecdote of the day" />
      <DisplayAnecdote text={anecdotes[selected]} />
      <DisplayVote number={votes[selected]} />
      <Button onClick={handleVoteClick} text="Vote" />
      <Button onClick={handleAnecdoteClick} text="New Anecdote" />
      <Header content="Anecdote with most votes" />
      <DisplayAnecdote text={anecdotes[mostVoted]} />
    </div>
  )
}

export default App