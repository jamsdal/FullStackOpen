import DisplayPerson from './DisplayPerson'

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

export default Persons