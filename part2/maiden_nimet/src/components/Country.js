import React from 'react'
import Details from './Details'


const Country = ({countries, handleClick}) => {

    console.log(countries.name)
    return (
        <div>
            {countries.name} <button onClick={handleClick}>Show</button>
        </div>
    )
}

export default Country