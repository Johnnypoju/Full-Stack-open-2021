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
  const [ messageType, setMessageType] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
        .then(initialPhoneBook => {
          setPersons(initialPhoneBook)
          setMessageType('succeed')
        })
          .then(
            setErrorMessage('All names fetched'))
          .then(console.log(persons))
          .catch(error => {
            setMessageType('error')
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
        const tempPersonsObject = {
          "name" : newName,
          "number" : newNumber,
          "id" : persons[personId].id
        }
        // replacing person from phonebook
        phonebookService
          .update(persons[personId].id, tempPersonsObject)
            .then(newPhoneBook => {
              setPersons(persons.map(person => person.name !== newName ? person : tempPersonsObject))
              setMessageType('succeed')
              setErrorMessage(`${newName} added succesfully`)
              
            })
            .catch(error => {
              // removing person from display if already removed
              setMessageType('error')
              setErrorMessage(`${newName} has already been deleted from the server.`)
              setPersons(persons.filter(person => person.id !== persons[personId].id))
            })
      }
    }
    else { 
      phonebookService
        .create(personsObject)
          .then(newPhoneBook => {
            console.log(newPhoneBook)
            setPersons(persons.concat(newPhoneBook))
            setMessageType('succeed')
            setErrorMessage(`${newName} added succesfully`)
          })
          .catch(error => {
            setMessageType('error')
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
          .then(() => {setPersons(persons.filter(person => person.id !== id))
          setMessageType('succeed')
          setErrorMessage('Person deleted from phonebook')})
            .catch(error => {
              setMessageType('error')
              setErrorMessage(error.message)})
          }
  }

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter handleFilter={handleFilter} filter={filter}/>

      <h3>Add new</h3>
      <Notification message={errorMessage} value={messageType} />
      <NewName handleNewName={handleNewName} handleNewNumber={handleNewNumber}
        newName={newName} newNumber={newNumber} addNewName={addNewName}/>
      
      <h3>Numbers</h3>
      <PersonList persons={persons} filter={filter} handleDeletion={handleDeletion}/>
    </div>
  )

}

export default App