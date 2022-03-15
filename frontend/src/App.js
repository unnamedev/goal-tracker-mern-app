import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Dashboard, Login, Register} from "./pages"
import {Header} from "./components"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

/**
 * @description ✏️ App Component
 * @returns {JSX.Element}
 * @constructor
 */
const App = () =>
    <>
        <Router>
            <Header/>
            <Routes>
                <Route path="/" exact element={<Dashboard/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/login" exact element={<Login/>}/>
            </Routes>
        </Router>
        <ToastContainer/>
    </>

export default App
