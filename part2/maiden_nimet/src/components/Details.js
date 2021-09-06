import React from 'react'
import Languages from './Languages'

const Details = ({country}) => {
    
    const tempCountry = country[0]
    console.log(tempCountry)
    return (
        <div>
        <h1>{tempCountry.name}</h1>
        <p> Capital: {tempCountry.capital} <br></br>
            Population: {tempCountry.population}</p>
        <h2>Languages</h2>
        <p>{tempCountry.languages.map(languages =>(
            <Languages key={languages.id} language={languages.name}/>))} </p>
        <img 
            src={tempCountry.flag}
            height='100'
            widht='100'
            border='1px'/>
        </div>
        
    )
}

export default Details