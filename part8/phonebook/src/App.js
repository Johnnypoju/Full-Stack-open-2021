import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import PersonForm from './components/createPerson'
import Persons from './components/Persons'
import { ALL_PERSONS } from './components/queries'

const App = () => {
  const [ errorMessage, setErrorMessage ] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color:'red'}}>
      {errorMessage}
    </div>
  )
}

export default App