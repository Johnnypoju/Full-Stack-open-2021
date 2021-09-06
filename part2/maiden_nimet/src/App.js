import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Finder from './components/Finder'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [finder, setFinder] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFinder = (event) => {
    console.log(event.target.value)
    setFinder(event.target.value)
  }


  return (
    <div>
      <Finder finder={finder} handleFinder={handleFinder}/>
      <Countries countries={countries} finder={finder}/>
    </div>
  )
}

export default App;
