import React, { useState } from 'react'
import Country from './Country'
import Details from './Details'

const Countries = ({countries, finder}) => {
    const foundCountries = countries.filter(countries => countries.name.toLowerCase()
    .includes(finder.toLowerCase()))
    const countryListLen = (foundCountries.length)

    const [detailsFlag, setDetailsFlag] = useState(false)

    const handleClick = () => {
        setDetailsFlag(true)
        setCountryListLen(1)
    }

    if (countryListLen > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
    else if (countryListLen <= 10) {
        if (countryListLen === 1){
            return (
                <div>
                    <Details country={foundCountries} />
                </div>
            )
        }
        else{
            return (
                <div>
                    {foundCountries.map(countries => (
                    <Country key={countries.name} countries={countries} handleClick={handleClick}/>
                    ))}
                </div>
              
            )
        }
    }
}


export default Countries