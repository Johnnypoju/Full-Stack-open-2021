import React from 'react'

const Person = ({name, number, id, handleDeletion}) => {
    return (
        <div>
            {name} {number} <button onClick={()=> handleDeletion(id)}>Delete</button>
        </div>
    )
}

export default Person