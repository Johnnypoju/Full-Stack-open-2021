import React from 'react'
import Languages from './Languages'

const Details = ({country, setDetailsForCountry}) => {
    setDetailsForCountry=('')
    return (
        <div>
        <h1>{country.name}</h1>
        <p> Capital: {country.capital} <br></br>
            Population: {country.population}</p>
        <h2>Languages</h2>
        <p>{country.languages.map(languages =>(
            <Languages key={languages.id} language={languages.name}/>))} </p>
        <img 
            src={country.flag}
            height='100'
            widht='100'
            border='1px'/>
        </div>
        
    )
}

export default Details