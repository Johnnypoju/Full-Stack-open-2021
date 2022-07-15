import { connect } from "react-redux"


const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  switch(props.type){
    case 'content':
      return <div style={style}>
              {props.content}
              </div>
      
    default: 
      return <div></div>
  }

}

const mapStateToProps = (state) => {
  if(state.notifications.length !== 0){
    return {content: state.notifications, type: 'content'}
  }
  else {
    return {}
  }
}


const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications