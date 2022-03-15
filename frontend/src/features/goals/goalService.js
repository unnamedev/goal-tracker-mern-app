import axios from "axios"

/* This is a constant that is used to store the API url. */
const API_URL = "/api/goals"

/**
 * It creates a goal for the user.
 * @param goalData - The data that will be sent to the server.
 * @param token - The token that was returned from the login function.
 * @returns The data from the server.
 */
const createGoal = async (goalData, token) => {
    const setup = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const {data} = await axios.post(API_URL, goalData, setup)
    return data
}

/**
 * It gets the goals from the API
 * @param token - The token that we generated earlier.
 * @returns An array of objects
 */
const getGoals = async (token) => {
    const setup = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const {data} = await axios.get(API_URL, setup)
    return data
}

/**
 * It deletes a goal from the database.
 * @param id - The id of the goal you want to delete
 * @param token - The token that was returned from the login function.
 * @returns The data from the server.
 */
const deleteGoal = async (id, token) => {
    const setup = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const {data} = await axios.delete(`${API_URL}/${id}`, setup)
    return data
}

/* Creating a constant that is used to store the functions. */
const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService