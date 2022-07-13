import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../reducers/notificationReducer";
import anecdoteReducer from "../reducers/anecdoteReducer"

const Store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer
    }
})

export default Store