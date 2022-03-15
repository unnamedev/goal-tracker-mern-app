import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {GoalForm, GoalItem, Spinner} from "../components"
import {getGoals, reset} from "../features/goals/goalSlice"

/**
 * @description ✏️ Dashboard Component
 * @returns {JSX.Element}
 * @constructor
 */
const Dashboard = () => {
    // This is a hook that allows us to navigate to a different route.
    const navigate = useNavigate()
    // A hook that allows us to dispatch actions to the store.
    const dispatch = useDispatch()
    // This is a way to get the state from the store.
    const {user} = useSelector(({auth}) => auth)
    // This is a way to get the state from the store.
    const {goals, isError, isLoading, message} = useSelector(({goals}) => goals)

    useEffect(() => {
        if (isError) console.log(message)
        if (!user) navigate("/login")
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    }, [user, isError, message, navigate, dispatch])

    // This is a conditional statement that checks if the `isLoading` state is true. If it is, it will return the `Spinner`component.
    if (isLoading) return <Spinner/>

    /* ✨ Render */
    return <div className="max-w-4xl m-auto pl-2 pr-2 pt-10">

        <div className="flex flex-col gap-8">
            <h1 className="font-semibold text-2xl">👋🏻 Welcome back, {user && user.name}</h1>
            <p className="font-semibold text-lg text-slate-600 text-center">Goals Dashboard</p>
        </div>

        <GoalForm/>

        {goals.length > 0 ?
            <div className="grid gap-3">
                {goals.map(o => <GoalItem key={o._id} {...o}/>)}
            </div> :
            <h3 className="font-semibold text-lg text-slate-600 text-center">You haven't set any goals</h3>
        }
    </div>
}

export default Dashboard
