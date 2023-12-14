import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpenModal: boolean;
}

const initialState: ModalState = {
    isOpenModal: true,
};

const modalSlice = createSlice({
    name: "modalWindow",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpenModal = true;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice;