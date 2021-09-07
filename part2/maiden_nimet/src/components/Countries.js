import React, { useState } from 'react'
import Country from './Country'
import Details from './Details'

const Countries = ({countries, finder, setDetailsForCountry, detailsForCountry}) => {
    const foundCountries = countries.filter(countries => countries.name.toLowerCase()
    .includes(finder.toLowerCase()))
    const countryListLen = (foundCountries.length)

    

    if (countryListLen > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
    else if (countryListLen <= 10){
        console.log(countryListLen)
        if (countryListLen === 1) {
            return (
                <div>
                     <Details country={foundCountries} />
                 </div>
             )
        }
        else if (detailsForCountry === '') {
            return (
                <div>
                    {foundCountries.map(countries => (
                    <Country key={countries.name} countries={countries} 
                    setDetailsForCountry={setDetailsForCountry} />
                    ))}
                </div>
                
            )
        }
        else{
            return(
                <div>
                    {foundCountries.filter(countries => countries.name.includes(detailsForCountry)).map(country =>
                        <Details country={country} />)}
                </div>
            )
        }
    
    }
}


export default Countries