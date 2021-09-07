import React from 'react'

const Country = ({countries, setDetailsForCountry}) => {
    //console.log(countries.name)
    return (
        <div>
            {countries.name} <button onClick={() => setDetailsForCountry(countries.name)}>Show</button>
        </div>
    )
}

export default Country