import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;

}

const initialState: ModalState = {
    isOpen: false,



};

const changeCardModal = createSlice({
    name: "changeCardModal",
    initialState,
    reducers: {
        openChangeCardModal: (state) => {
            state.isOpen = true;
        },
        closeChangeCardModal: (state) => {
            state.isOpen = false;
        },

    },
});

export const { openChangeCardModal, closeChangeCardModal } = changeCardModal.actions;

export default changeCardModal;