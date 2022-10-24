import { createSlice } from '@reduxjs/toolkit'


const initialState = ''


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      //console.log(action.payload)
      return action.payload
    },
    removeNotification(state, action) {

      return action.payload

    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions
let timeOutID

export const setNotification = (content, messagetype, timer) => {
  clearTimeout(timeOutID)
  //console.log(content,messagetype,timer)
  const tempCont = {
    content: content,
    timer: timer,
    messagetype: messagetype
  }
  return async dispatch => {
    dispatch(showNotification(tempCont))
    timeOutID = setTimeout(() => {
      dispatch(removeNotification(''))
    }, timer)

  }


}

export default notificationSlice.reducer