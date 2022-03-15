import {useEffect} from "react"
import {FaRegUser} from "react-icons/fa"
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {register, reset} from "../features/auth/authSlice"
import {toast} from "react-toastify"
import {FormField, Spinner} from "../components"
import * as Yup from "yup"
import {Form, Formik} from "formik"

/**
 * @description ✏️ Register Component
 * @returns {JSX.Element}
 * @constructor
 */
const Register = () => {
    // This is a validation schema that is used to validate the form data.
    const validate = Yup.object({
        name: Yup.string()
            .min(3, "Must be at least 3 characters")
            .max(15, "Must be 15 characters or less")
            .matches(/^[A-z\s]+$/, "Only alphabets are allowed for this field")
            .required("Required"),
        email: Yup.string()
            .email("Email is invalid")
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email is invalid")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .max(30, "Password must be 30 characters or less")
            .matches(
                /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,30}$/,
                "Minimum 8 and maximum 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            )
            .required("Password is required"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Confirm password is required"),
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
            <h3 className="font-bold text-3xl">Register</h3>
            <p>Enter your information to register</p>
        </div>

        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            }}
            validationSchema={validate}
            onSubmit={({name, email, password}, {resetForm}) => {
                const userData = {name, email, password}
                dispatch(register(userData))
                resetForm()
            }}
        >
            {({handleChange, values, isValid, dirty, touched, errors}) => (
                <Form className="flex flex-col gap-2 " autoComplete="off">
                    {/* Name */}
                    <div>
                        <FormField label="Name" type="text" name="name" id="name"
                                   value={values.name} onChange={handleChange} placeholder="Enter your name">
                            <FaRegUser/>
                        </FormField>
                    </div>

                    {/* Email */}
                    <div>
                        <FormField label="Email" type="email" name="email" id="email"
                                   value={values.email} onChange={handleChange} placeholder="Enter your email">
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

                    {/* Password Confirmation */}
                    <div>
                        <FormField label="Confirm password" type="password" name="passwordConfirmation" id="passwordConfirmation"
                                   value={values.passwordConfirmation} onChange={handleChange} placeholder="Confirm password">
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

export default Register
