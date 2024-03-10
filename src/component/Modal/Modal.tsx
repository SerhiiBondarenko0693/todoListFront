import React, {FC} from 'react';
import style from "./Modal.module.css";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {closeModal} from "../../Store/modalWindowReducer";
// import {useGoogleOneTapLogin} from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import Login from "../FormLogin/Login";
import Registration from "../FormRegistration/Redistration";
import ForgotForm from "../ForgotForm/ForgotForm";
//
// type DecodedValue = {
//     email: string;
//     password: string;
// };
//
// type GoogleUserInfo = {
//     aud: string;
//     azp: string;
//     email: string;
//     email_verified: boolean;
//     exp: number;
//     family_name: string;
//     given_name: string;
//     iat: number;
//     iss: string;
//     jti: string;
//     locale: string;
//     name: string;
//     nbf: number;
//     picture: string;
//     sub: string;
// };



const Modal:FC = () => {
    const isLoginContent = useAppSelector(state =>state.modal.loginContent);
    const isRegistrationContent = useAppSelector(state =>state.modal.registrationContent);
    const isForgotContent = useAppSelector(state =>state.modal.forgotPass);
    const dispatch = useAppDispatch()
    //
    // useGoogleOneTapLogin({
    //     cancel_on_tap_outside: false,
    //     onSuccess: (credentialResponse) => {
    //         // @ts-ignore
    //         const decoded:GoogleUserInfo = jwtDecode(credentialResponse.credential);
    //         const value:DecodedValue = {
    //             email: decoded.email,
    //             password: decoded.azp,
    //         };
    //         console.log(value);
    //     },
    //     onError: () => {
    //         console.error("Login failed");
    //     },
    //     // @ts-ignore
    //     scope: "email profile",
    //     uxMode: "redirect",
    // });
    return (
        <div onClick={(e)=>{
            dispatch(closeModal())
        }} className={style.modalWrapper}>
            <div className={style.formWrapper} onClick={(e)=>{
                 e.stopPropagation()
            }}>
                <div className={style.btnFormWrapper}>
                    <button className={style.btnClose} onClick={()=>{
                        dispatch(closeModal())
                    }}>X</button>
                </div>



                <div className={style.btnBlockWrapper}>
                    {isLoginContent && <Login/>}
                    {isRegistrationContent && <Registration/>}
                    {isForgotContent && <ForgotForm/>}

                </div>

            </div>

        </div>
    );
};

export default Modal;