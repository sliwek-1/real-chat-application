import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../css/sign.css'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUserData } from "../services/http/sessionServices"
import { useAuthContext } from "../context/authContext"

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const [message, setMessage] = useState("");
    const { token, setToken } = useAuthContext();

    const validationSchema = Yup.object({
        email: Yup.string().email('Email address is not valid').required('Email address is reqired!'),
        password: Yup.string().min(8,'Password must have at least 8 characters').max(50, 'Maximum length of password is 50 characters').required('Password is required!')
    })
  
    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = async (values) => {
        try {
            let request = await fetch('http://192.168.1.10:4000/api/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })

            let token = await request.json();

            console.log(token)
            
            if(token) {
                dispatch(loginUserData(token))
                setToken(token.accessToken)
                navigate('/');
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <main className="signSection">
                <div className="form">
                    <h1>Login</h1>
                    <p>{message}</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <table>
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
                                        <button type="submit">Login</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="info-td">
                                        <p>You dont have account? <a href="/signup">Sign up</a>!</p>
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