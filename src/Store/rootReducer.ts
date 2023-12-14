import { combineReducers } from "@reduxjs/toolkit";
import modalSlice from "./modalWindowReducer";

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
});

export default rootReducer;