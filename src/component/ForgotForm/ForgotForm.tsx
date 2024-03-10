import React, {FC} from 'react';
import {Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import {closeModal, openModalLogin, openModalRegistration} from "../../Store/modalWindowReducer";
import {useAppDispatch} from "../../Store/Store";
import style from "./ForgotFofm.module.css";
import validationSchema from "./validationSchema"


const ForgotForm:FC = () => {
    const dispatch = useAppDispatch()
    interface Values {
        email: string;
    }

    const initialValues = {
        email:''
    }


    return (
        <div className={style.loginWrapper}>
            <p className={style.title}>Forgot password</p>
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
                                id="email"
                                name="email"
                                placeholder="email"
                                type="email"
                                autoComplete="off"
                            />
                            <ErrorMessage name="email" className={style.inputError} component="div" />
                        </div>

                        <div className={style.otherBtn}>
                            <div onClick={()=>{
                                dispatch(openModalLogin())
                            }} className={style.otherBtnItem}>Login</div>
                            <div onClick={()=>{
                                dispatch(openModalRegistration())
                            }}   className={style.otherBtnItem}>Create account</div>
                        </div>

                        <div>
                            <button className={style.btnModalOk} type="submit" >Ok</button>
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

export default ForgotForm;