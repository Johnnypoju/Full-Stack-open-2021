import { useSelector } from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.notification === undefined) {
    console.log("Empty")
    console.log(notification.notification)
    return <div></div>
  }
  else{
    console.log("content")
    console.log(notification.notification)
    return (
    <div style={style}>
      You voted for "{notification.notification}"
    </div>
  )
  }
}

export default Notification