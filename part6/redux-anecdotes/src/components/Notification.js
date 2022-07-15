import { useSelector } from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notifications)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification.length === 0) {
    console.log("Empty")
    console.log(notification)
    return <div></div>
  }
  else {
    console.log("content")
    console.log(notification)
    return (
    <div style={style}>
      {notification}
    </div>
  )
  }
}

export default Notification