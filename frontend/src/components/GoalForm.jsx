import {useDispatch} from "react-redux"
import {createGoal} from "../features/goals/goalSlice"
import * as Yup from "yup"
import {Formik, Form} from "formik"
import {GiStairsGoal} from "react-icons/gi"
import {FormField} from "./index"

/**
 * @description ✏️ GetForm Component
 * @returns {JSX.Element}
 * @constructor
 */
const GoalForm = () => {
    // This is a validation schema that is used to validate the form data.
    const validate = Yup.object({
        text: Yup.string()
            .min(3, "Must be at least 3 characters")
            .required("Filed is required"),
    })

    // It's a hook that returns a dispatch function.
    const dispatch = useDispatch()

    /* ✨ Render */
    return <Formik
        initialValues={{text: ""}}
        validationSchema={validate}
        onSubmit={({text}, {resetForm}) => {
            dispatch(createGoal({text}))
            resetForm()
        }}
    >
        {({handleChange, values, isValid, dirty, touched, errors}) => (
            <Form className="max-w-4xl m-auto pl-2 pr-2 mb-3" autoComplete="off">
                <div className="mb-3">
                    <FormField label="Your goal" type="text" name="text" id="text" value={values.text} onChange={handleChange} placeholder="By example: Get enough sleep">
                        <GiStairsGoal/>
                    </FormField>
                </div>
                <button
                    disabled={!isValid && !dirty}
                    className={`w-full md:w-auto bg-gray-700 hover:bg-gray-900 text-white text-center py-2 px-6 mt-3 rounded transition-all ${!isValid && !dirty && "opacity-50 cursor-not-allowed"}`}
                    type="submit">Add Goal
                </button>
            </Form>
        )}

    </Formik>
}

export default GoalForm
