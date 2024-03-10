import { createSlice } from "@reduxjs/toolkit";
import {findByAltText} from "@testing-library/react";

interface ModalState {
    isOpenModal: boolean;
    loginContent: boolean;
    registrationContent: boolean;
    forgotPass: boolean;
}

const initialState: ModalState = {
    isOpenModal: false,
    loginContent:false,
    registrationContent:false,
    forgotPass:false


};

const modalSlice = createSlice({
    name: "modalWindow",
    initialState,
    reducers: {
        openModalLogin: (state) => {
            state.isOpenModal = true;
            state.loginContent = true;
            state.registrationContent = false;
            state.forgotPass = false;
        },
        openModalRegistration: (state) => {
            state.isOpenModal = true;
            state.registrationContent = true;
            state.forgotPass = false;
            state.loginContent = false;
        },
        openModalForgot: (state) => {
            state.isOpenModal = true;
            state.forgotPass = true;
            state.loginContent = false;
            state.registrationContent = false;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
            state.loginContent = false;
            state.registrationContent = false;
            state.forgotPass = false;

        },
    },
});

export const { openModalLogin, openModalRegistration,openModalForgot, closeModal } = modalSlice.actions;

export default modalSlice;