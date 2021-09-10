import React, { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import NewName from './components/NewName'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import './index.css'




const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
        .then(initialPhoneBook => {
          setPersons(initialPhoneBook)
        })
          .then(setErrorMessage('All names fetched'))
          .catch(error => {
            setErrorMessage(error.message)
          })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const personsObject = {
      "name": newName,
      "number": newNumber
    }
    const personId = persons.map(person => person.name).indexOf(newName)
    
    //If person is found in phonebook ask if can be replaced
    if (personId > -1){
      if (window.confirm(`${newName} is already added to the phonebook. 
      Do you want to replace the old number with a new one?`)){
        phonebookService
          .update(persons[personId].id, personsObject)
            .then(newPhoneBook =>{
              setPersons(persons.map(person => person.id !== newPhoneBook.id ? 
                person : newPhoneBook))
            })
            .catch(error => {
              setErrorMessage(error.message)
            })
      }
    }
    else { 
      phonebookService
        .create(personsObject)
          .then(newPhoneBook => {
            setPersons(persons.concat(newPhoneBook))
          })
          .catch(error => {
            setErrorMessage(error.message)
          })
    }
    setNewName('')
    setNewNumber('')
    }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletion = (id) => {
    if (window.confirm("Do you really want to delete person")) {
      phonebookService
        .deletion(id)
          .then(setPersons(persons.filter(person => person.id !== id)))
            .catch(error => {
              setErrorMessage(error.message)})
          }     
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter handleFilter={handleFilter} filter={filter}/>

      <h3>Add new</h3>
      <Notification message={errorMessage} />
      <NewName handleNewName={handleNewName} handleNewNumber={handleNewNumber}
        newName={newName} newNumber={newNumber} addNewName={addNewName}/>
      
      <h3>Numbers</h3>
      <PersonList persons={persons} filter={filter} handleDeletion={handleDeletion}/>
    </div>
  )

}

export default App