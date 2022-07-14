import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            if(action.payload.id === undefined){
                const notification = { content: action.payload.content,
                                        type: 'creation'}
                return notification
            }
            else {
                const notification = { content: action.payload.content,
                                        type: 'vote'}
                return notification
                }
            
        },
        removeNotification(state, action) {
            return {
                initialState
            }
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer