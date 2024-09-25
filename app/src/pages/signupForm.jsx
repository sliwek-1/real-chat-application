import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../css/sign.css'

export default function SignupForm() {

    const validationSchema = Yup.object({
        firstname: Yup.string().min(2, 'Firstname must have at least two letters').max(35, 'Maximum length of Firstname is 35 letters').required('Firstname is reqired!'),
        lastname: Yup.string().min(2, 'Lastname must have at least two letters').max(35, 'Maximum length of Lastname is 35 letters').required('Lastname is reqired!'),
        login: Yup.string().min(2, 'Login must have at least two letters').max(35, 'Maximum length of Login is 35 letters').required('Login is reqired!'),
        age: Yup.number().min(16,"Minimum age is 16").required('Age is required!'),
        email: Yup.string().email('Email address is not valid').required('Email address is reqired!'),
        password: Yup.string().min(8,'Password must have at least 8 characters').max(50, 'Maximum length of password is 50 characters').required('Password is required!')
    })

    const initialValues = {
        firstname: "", 
        lastname: "",
        login: "",
        age: 16,
        email: "",
        password: ""
    }

    const onSubmit = async (values) => {
        try {
            const request = await fetch('http://192.168.1.10:4000/api/users/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })

            const response = await request.text();
            console.log(response)
        } catch(error) {
            throw new Error(error)
        }
    }

    return (
        <>
            <main className="signSection">
                <div className="form">
                    <h1>Register</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <table>
                                <tr>
                                    <td>
                                        <label htmlFor="firstname">Firstname: </label>
                                    </td>
                                    <td>
                                        <Field  type="text" name="firstname" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td"> 
                                        <ErrorMessage name="firstname" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="lastname">Lastname: </label>
                                    </td>
                                    <td>
                                        <Field  type="text" name="lastname" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td">
                                        <ErrorMessage name="lastname" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="login">Login: </label>
                                    </td>
                                    <td>
                                        <Field  type="text" name="login" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td">
                                        <ErrorMessage name="login" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="age">Age: </label>
                                    </td>
                                    <td>
                                        <Field  type="number" name="age" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td">
                                        <ErrorMessage name="age" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="email">Email: </label>
                                    </td>
                                    <td>
                                        <Field  type="email" name="email" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td">
                                        <ErrorMessage name="email" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="password">Password: </label>
                                    </td>
                                    <td>
                                        <Field  type="password" name="password" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="error-td">
                                        <ErrorMessage name="password" component="div" className="error"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="btn-td">
                                        <button type="submit">Register</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="info-td">
                                        <p>You have already accout? <a href="/login">login</a>!</p>
                                    </td>
                                </tr>
                            </table>
                        </Form>
                    </Formik>
                </div>
            </main>
        </>
    )
}