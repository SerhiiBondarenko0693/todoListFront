import React, {FC} from 'react';
import {Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import {closeModal, openModalForgot, openModalLogin} from "../../Store/modalWindowReducer";
import {useAppDispatch} from "../../Store/Store";
import style from "./Redistration.module.css";
import validationSchema from "./validationSchema"


const Registration:FC = () => {
    const dispatch = useAppDispatch()
    interface Values {
        password: string;
        email: string;
        firstName:string
    }

    const initialValues = {
        password: '',
        email: '',
        firstName:'',
    }




    return (
        <div className={style.loginWrapper}>
            <p className={style.title}>Create account</p>
            <Formik
                validationSchema={validationSchema}

                initialValues={initialValues}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {({ errors, touched }) => (
                    <Form className={style.inputBlock}>
                        <div className={style.inputWrapper}>
                            <Field
                                className={style.input}
                                id="name"
                                name="name"
                                placeholder="name"
                                type="input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="name" className={style.inputError} component="div" />
                        </div>

                        <div className={style.inputWrapper}>
                            <Field
                                className={style.input}
                                id="email"
                                name="email"
                                placeholder="email"
                                type="email"
                                autoComplete="off"
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
                        </div>
                        <div className={style.otherBtn}>
                            <div onClick={()=>{
                                dispatch(openModalForgot())
                            }} className={style.otherBtnItem}>Forgot password?</div>
                            <div onClick={()=>{
                                dispatch(openModalLogin())
                            }}  className={style.otherBtnItem}>Login</div>
                        </div>

                        <div>
                            <button className={style.btnModalOk} >Ok</button>
                            <button className={style.btnModalCancel} onClick={()=>{
                                dispatch(closeModal())
                            }} >Cansel</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    );
};

export default Registration;