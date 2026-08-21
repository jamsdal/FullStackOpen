import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter shown with
      <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, nameValue, numberValue, nameChange, numberChange, }) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          Name: <input value={nameValue} onChange={nameChange}/>
        </div>
        <div>
          Number: <input value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons , handleDelete }) => {
  return (
    <div>
      {
        persons.map(person => (
          <DisplayPerson key={person.id} person={person} handleDelete={handleDelete}/>
        ))
      }
    </div>
  )
}

const DisplayPerson = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then((persons) => setPersons(persons))
    }, [])

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
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject)
      .then(newPerson => setPersons(persons.concat(newPerson)))
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