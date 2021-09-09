import React from 'react'
import Person from './Person'

const PersonList = ({persons, filter, handleDeletion}) => {
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase()
            .includes(filter.toLowerCase())).map(filteredperson => (
            <Person key={filteredperson.name} name={filteredperson.name} number={filteredperson.number} id={filteredperson.id} handleDeletion={handleDeletion}/>
            ))}
        </ul>
    )
}

export default PersonList