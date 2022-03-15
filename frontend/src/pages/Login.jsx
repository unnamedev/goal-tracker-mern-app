import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {login, reset} from "../features/auth/authSlice"
import {toast} from "react-toastify"
import {FormField, Spinner} from "../components"
import {useNavigate} from "react-router-dom"
import {RiLockPasswordLine} from "react-icons/ri"
import {FiMail} from "react-icons/fi"
import * as Yup from "yup"
import {Form, Formik} from "formik"

/**
 * @description ✏️ Login Component
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
    // This is a validation schema that is used to validate the form data.
    const validate = Yup.object({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    // This is a hook that allows us to navigate to a different route.
    const navigate = useNavigate()
    // A hook that allows us to dispatch actions to the store.
    const dispatch = useDispatch()
    // This is a hook that allows us to get the state from the store.
    const {user, isLoading, isError, isSuccess, message} = useSelector(({auth}) => auth)

    // This is a hook that allows us to navigate to a different route.
    useEffect(() => {
        if (isError) toast.error(message)
        if (isSuccess || user) navigate("/")
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    // This is a conditional statement that checks if the `isLoading` state is true. If it is, it will return the `Spinner`component.
    if (isLoading) return <Spinner/>

    /* ✨ Render */
    return <div className="max-w-4xl m-auto pl-2 pr-2 pt-10">

        <div className="flex flex-col gap-2 mb-3 text-center">
            <h3 className="font-bold text-3xl">Login</h3>
            <p>Login and start setting goals</p>
        </div>

        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={validate}
            onSubmit={({email, password}, {resetForm}) => {
                const userData = {email, password}
                dispatch(login(userData))
                resetForm()
            }}
        >
            {({handleChange, values, isValid, dirty, touched, errors}) => (
                <Form className="flex flex-col gap-2 " autoComplete="off">

                    {/* Email */}
                    <div>
                        <FormField label="Email" type="email" name="email" id="email" value={values.email}
                                   onChange={handleChange} placeholder="Enter your email">
                            <FiMail/>
                        </FormField>
                    </div>

                    {/* Password */}
                    <div>
                        <FormField label="Password" type="password" name="password" id="password"
                                   value={values.password} onChange={handleChange} placeholder="Enter password">
                            <RiLockPasswordLine/>
                        </FormField>
                    </div>

                    {/* Submit */}
                    <button
                        disabled={!isValid && !dirty}
                        type="submit"
                        className={`w-full md:w-auto bg-gray-700 hover:bg-gray-900 text-white text-center py-2 px-6 mt-3 rounded transition-all ${!isValid && !dirty && "opacity-50 cursor-not-allowed"}`}
                    >Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default Login
