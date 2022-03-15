import {ErrorMessage, useField} from "formik";

const FormField = ({label, children, ...props}) => {
    // This is a helper function from Formik that returns the current value of the field and any validation errors.
    const [field, meta] = useField(props)

    /* ✨ Render */
    return <>
        <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer">
            {label}
        </label>
        <div className="relative">
            <div className={`absolute top-3 left-2 ${meta.touched && meta.error && "text-red-500"}`}>
                {children}
            </div>
            <input
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-orange-500 block w-full p-2.5 pl-8 ${meta.touched && meta.error && "text-red-500 border-red-500"}`}
                {...field}
                {...props}
                id={field.name}
            />
        </div>

        <ErrorMessage component="p" name={field.name} className="text-red-500 text-xs mt-2"/>
    </>
}

export default FormField
