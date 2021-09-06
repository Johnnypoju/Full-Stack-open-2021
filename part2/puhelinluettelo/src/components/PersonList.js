import React from 'react'
import Person from './Person'

const PersonList = ({persons, filter}) => {
    return (
        <ul>
            {persons.filter(person => person.name.toLowerCase()
            .includes(filter.toLowerCase())).map(filteredperson => (
            <Person key={filteredperson.name} name={filteredperson.name} number={filteredperson.number} />
            ))}
        </ul>
    )
}

export default PersonList