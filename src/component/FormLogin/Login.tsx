import React, {FC, useState} from 'react';
import {Field, Form, Formik, ErrorMessage } from "formik";

import {closeModal, openModalForgot, openModalRegistration} from "../../Store/modalWindowReducer";
import {useAppDispatch} from "../../Store/Store";
import style from "./Login.module.css";
import validationSchema from "./validationSchema"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { setAuthStatusTrue} from "../../Store/apiUserReducer";
import { Audio } from 'react-loader-spinner';


const Login:FC = () => {
    const [serverError, setServerError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    interface Values {
        password: string;
        email: string;
    }

    const initialValues = {
        password: '',
        email: ''
    }
    const loginApi = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post("https://todo-list-back-eta.vercel.app/api/login", {
                email: email,
                password: password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            dispatch(setAuthStatusTrue());
            dispatch(closeModal());
            setLoading(false);
            navigate("/account");
        } catch (error:any) {
            if (error.response) {
                setServerError(error.response.data.error || "Try later.");
                setLoading(false);
            } else if (error.request) {
                setServerError(" Try again.");
            } else {

                setServerError("Try later.");
            }
        }
    };





    return (
        <div className={style.loginWrapper}>
            <p className={style.title}>Sign in</p>
                <Formik
                    validationSchema={validationSchema}

                    initialValues={initialValues}
                    onSubmit={async (values: Values,) => {
                        console.log(values.email, values.password);
                        try {
                            await loginApi(values.email, values.password);
                        } catch (error) {
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={style.inputBlock}>

                            <div className={style.inputWrapper}>
                                <Field
                                    className={style.input}
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    type="email"
                                    autoComplete="email"
                                />
                                <ErrorMessage name="email" className={style.inputError} component="div" />

                            </div>
                            <div className={style.inputWrapper}>
                                <Field
                                    className={style.input}
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    type="password"
                                    autoComplete="off"

                                />
                                <ErrorMessage name="password" className={style.inputError} component="div" />
                                {serverError && <div className={style.inputError}>{serverError}</div>}
                            </div>

                            <div className={style.otherBtn}>
                                <div onClick={()=>{
                                    dispatch(openModalForgot())
                                }} className={style.otherBtnItem}>Forgot password?</div>
                                <div onClick={()=>{
                                    dispatch(openModalRegistration())
                                }} className={style.otherBtnItem}>Create account</div>
                            </div>

                            <div>
                                {!loading && <button className={style.btnModalOk} type={"submit"}>Ok</button> }
                                {!loading && <button className={style.btnModalCancel} onClick={() => {
                                    dispatch(closeModal())
                                }}>Cansel</button>}
                                {loading && <Audio
                                    height="50"
                                    width="300"
                                    color="green"
                                    ariaLabel="loading"

                                />}

                            </div>
                        </Form>
                        )}

                </Formik>
        </div>
    );
};

export default Login;