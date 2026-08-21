import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService.getAll()
      .then((persons) => setPersons(persons))
  }, [])

  const handleMessage = (message, messageType) => {
    setMessage(message)
      setMessageType(messageType)

      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personIndex = persons.findIndex(person => person.name === newName)

    if (personIndex !== -1) {
      if (window.confirm(`${persons[personIndex].name} is already in the phonebook, would you like to replace the old number with a new one?`)) {
        const changedPerson = {...persons[personIndex], number: newNumber}
        personService.update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            handleMessage(`Updated ${updatedPerson.name}`, 'confirm')
          }).catch(() => {
            handleMessage(`Information of ${changedPerson.name} has already been removed from server`, 'error')
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        handleMessage(`Added ${newPerson.name}`, 'confirm')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add New</h3>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App