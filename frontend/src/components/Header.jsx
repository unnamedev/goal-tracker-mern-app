import {Link, useNavigate} from "react-router-dom"
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import {logout, reset} from "../features/auth/authSlice"
import {useDispatch, useSelector} from "react-redux"

/**
 * @description ✏️ Header Component
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    // A hook that allows us to navigate to a different route.
    const navigate = useNavigate()
    // A hook that allows us to dispatch actions to the store.
    const dispatch = useDispatch()
    // This is a way to get the state from the store.
    const {user} = useSelector(({auth}) => auth)

    // This is a way to dispatch an action to the store.
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    /* ✨ Render */
    return <header className="flex items-center justify-between p-2 shadow xl:pl-4 xl:pr-4">

        <Link className="block logo w-8" to="/">
            <img src="/favicon.svg" alt="GT"/>
        </Link>

        <ul className="flex items-center gap-3 md: gap-5">
            {user ?
                <li>
                    <button className="flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button>
                </li> :
                <>
                    <li>
                        <Link to="/login" className="md:flex items-center gap-2 hover:text-gray-600 transition-all font-semibold">
                            <FaSignInAlt size={20}/>
                            <span className="hidden md:block">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="md:flex items-center gap-2 hover:text-gray-600 transition-all font-semibold">
                            <FaUser size={20}/>
                            <span className="hidden md:block">Register</span>
                        </Link>
                    </li>
                </>
            }
        </ul>
    </header>
}

export default Header
