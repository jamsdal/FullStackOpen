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

export default PersonForm