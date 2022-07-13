import { createSlice } from "@reduxjs/toolkit"

const initialState = []


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload.content
            return {
                notification
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