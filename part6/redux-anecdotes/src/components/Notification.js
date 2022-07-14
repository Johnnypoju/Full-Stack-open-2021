import { useSelector } from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(notification)
  if (notification.notification === []) {
    console.log("Empty")
    console.log(notification)
    return <div></div>
  }
  else if(notification.type === 'vote') {
    console.log("content")
    console.log(notification.content)
    return (
    <div style={style}>
      You voted for "{notification.content}".
    </div>
  )
  }
  else if(notification.type === 'creation') {
    console.log('created ', notification.content)
    return(
      <div style={style}>
        Anecdote "{notification.content}" created succesfully.
      </div>
    )
  }
}

export default Notification