import { createSlice } from "@reduxjs/toolkit"


const initialState = {}

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

export const setNotification = (content, type, timer) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        dispatch(showNotification(content, type))
        
        timeOutID = setTimeout(() => {
            console.log('test')
            dispatch(removeNotification(''))
        }, timer)
        
    }
        
        
}

export default notificationSlice.reducer