import React from 'react'
import Person from './Person'

const PersonList = ({persons, filter}) => {
    console.log(persons.map(person => person.name))
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase()
            .includes(filter.toLowerCase())).map(filteredperson => (
            <Person name={filteredperson.name} number={filteredperson.number} />
            ))}
        </ul>
    )
}

export default PersonList