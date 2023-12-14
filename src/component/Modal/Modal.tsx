import React, {FC} from 'react';
import style from "./Modal.module.css";
import {useAppDispatch} from "../../Store/Store";
import {closeModal} from "../../Store/modalWindowReducer";
import {useGoogleOneTapLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type DecodedValue = {
    email: string;
    password: string;
};

type GoogleUserInfo = {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    iss: string;
    jti: string;
    locale: string;
    name: string;
    nbf: number;
    picture: string;
    sub: string;
};

const Modal:FC = () => {
    const dispatch = useAppDispatch()

    useGoogleOneTapLogin({
        cancel_on_tap_outside: false,
        onSuccess: (credentialResponse) => {
            // @ts-ignore
            const decoded:GoogleUserInfo = jwtDecode(credentialResponse.credential);
            const value:DecodedValue = {
                email: decoded.email,
                password: decoded.azp,
            };
            console.log(value);
        },
        onError: () => {
            console.error("Login failed");
        },
        // @ts-ignore
        scope: "email profile",
        uxMode: "redirect",
    });
    return (
        <div onClick={()=>{
            dispatch(closeModal())
        }} className={style.modalWrapper}>
            <div className={style.formWrapper}>
                <div className={style.btnFormWrapper}>
                    <button className={style.btnClose} onClick={()=>{
                        dispatch(closeModal())
                    }}>X</button>
                </div>

                <div className={style.btnBlockWrapper}>
                    <button className={style.btnModalOk} >Ok</button>
                    <button className={style.btnModalCancel} onClick={()=>{
                        dispatch(closeModal())
                    }} >Cansel</button>
                </div>

            </div>

        </div>
    );
};

export default Modal;