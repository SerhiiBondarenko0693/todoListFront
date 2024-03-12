import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpenSecondModal:boolean;
    isOpenEdit: boolean;
    isOpenAdd: boolean;

}

const initialState: ModalState = {
    isOpenSecondModal:false,
    isOpenEdit: false,
    isOpenAdd: false,




};

const secondModal = createSlice({
    name: "changeCardModal",
    initialState,
    reducers: {
        openChangeCardModal: (state) => {
            state.isOpenEdit = true;
            state.isOpenSecondModal = true;
        },
        openAddCardModal: (state) => {
            state.isOpenAdd = true;
            state.isOpenSecondModal = true;
        },

        closeChangeCardModal: (state) => {
            state.isOpenEdit = false;
            state.isOpenAdd = false;
            state.isOpenSecondModal = false;
        },

    },
});

export const { openChangeCardModal, closeChangeCardModal, openAddCardModal } = secondModal.actions;

export default secondModal;