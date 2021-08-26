import React, { useState } from 'react'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import NewName from './components/NewName'




const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) > -1){
      window.alert(`${newName} has already been added to the phonebook`)
    }
    else {
      const personsObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personsObject))
    }
    setNewName('')
    setNewNumber('')
    }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter handleFilter={handleFilter} filter={filter}/>

      <h3>Add new</h3>
      <NewName handleNewName={handleNewName} handleNewNumber={handleNewNumber}
        newName={newName} newNumber={newNumber} addNewName={addNewName}/>

      <h3>Numbers</h3>
      <PersonList persons={persons} filter={filter} />
    </div>
  )

}

export default App