import {useDispatch} from "react-redux"
import {deleteGoal} from "../features/goals/goalSlice"
import PropTypes from "prop-types"
import {GrFormClose} from "react-icons/gr"

/**
 * @description ✏️ GoalItem Component
 * @param createdAt
 * @param text
 * @param _id
 * @returns {JSX.Element}
 * @constructor
 */
const GoalItem = ({createdAt, text, _id}) => {
    // Creating a dispatch function that we can use to dispatch actions.
    const dispatch = useDispatch()

    /* ✨ Render */
    return <div className="relative rounded-lg overflow-hidden p-3 border-2">
        <p className="font-medium text-sm text-slate-500 mb-5">{new Date(createdAt).toLocaleString("en-US")}</p>
        <h2 className="font-semibold text-lg">{text}</h2>
        <button className="absolute top-1 right-1" onClick={() => dispatch(deleteGoal(_id))}>
            <GrFormClose size={25}/>
        </button>
    </div>
}

// It's a way to tell React what the expected props are.
GoalItem.propTypes = {
    createdAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
}

// It's a way to tell React what the default props are.
GoalItem.defaultProps = {
    createdAt: "",
    text: "",
    _id: "",
}

export default GoalItem
