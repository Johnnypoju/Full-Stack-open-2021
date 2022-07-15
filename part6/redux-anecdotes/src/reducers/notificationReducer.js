import { createSlice } from "@reduxjs/toolkit"


const initialState = ''


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {
            
            return action.payload
        },
        removeNotification(state, action) {

            return action.payload
            
    }
}
})

export const { showNotification, removeNotification } = notificationSlice.actions
let timeOutID
export const setNotification = (content, timer) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        dispatch(showNotification(content))
        timeOutID = setTimeout(() => {
            dispatch(removeNotification(''))
        }, timer)
        
    }
        
        
}

export default notificationSlice.reducer