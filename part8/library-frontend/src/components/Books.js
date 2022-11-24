import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {

  
  const { data, refetch } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }



  const filterSet = async ({ genre } ) => {
    //localStorage.setItem('book-genre-filter', genre)
    
    await refetch({ genre: genre})
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.genres.map((genre) => (
          <button key={genre} onClick={() => filterSet({ genre })}>{genre}</button>
        
      )
      )}
      <button onClick={() => filterSet('')}>All genres</button>
    </div>
  )
}

export default Books
