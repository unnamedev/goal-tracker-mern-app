import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import goalReducer from "../features/goals/goalSlice"

/* Creating a store with the reducer we defined in the previous step. */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer
    },
})
