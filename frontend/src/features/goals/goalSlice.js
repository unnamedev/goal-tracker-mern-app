import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import goalService from "./goalService"

/* This is the initial state of our reducer. */
const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

/* This is creating an `createGoal()` async thunk. */
export const createGoal = createAsyncThunk("goals/create", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

/* This is creating an `getGoals()` async thunk. */
export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

/* This is creating an `deleteGoal()` async thunk. */
export const deleteGoal = createAsyncThunk("goals/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

/* This is creating a slice of our redux store. */
export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.goals = state.goals.filter(g => g._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer