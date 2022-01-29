import React from 'react'

const Notification = ({ message, value }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={value}>
      {message}
    </div>
  )
}

export default Notification