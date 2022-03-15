import axios from "axios"

/* This is a constant that is used to store the API url. */
const API_URL = "/api/users"

/**
 * It takes in a userData object, and sends a POST request to the API_URL with the userData object as the body. If the
 * request is successful, it stores the user's data in localStorage
 * @param userData - The data that will be sent to the API.
 * @returns The data from the server.
 */
const register = async (userData) => {
    const {data} = await axios.post(API_URL, userData)
    if (data) localStorage.setItem("user", JSON.stringify(data))
    return data
}

/**
 * It sends a POST request to the API to login a user.
 * @param userData - The data that will be sent to the server.
 * @returns The data from the server.
 */
const login = async (userData) => {
    const {data} = await axios.post(`${API_URL}/login`, userData)
    if (data) localStorage.setItem("user", JSON.stringify(data))
    return data
}

/**
 * Logout the user by removing the user from local storage
 */
const logout = () => localStorage.removeItem("user")


/* Creating a new object that contains the register function. */
const authService = {
    register,
    login,
    logout,
}

export default authService