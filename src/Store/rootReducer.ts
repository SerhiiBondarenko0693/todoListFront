import { combineReducers } from "@reduxjs/toolkit";
import modalSlice from "./modalWindowReducer";
import { reducer as userReducer } from "./apiUserReducer";
import {reducer as listReducer} from "./ApiBaseReduser";
import secondModal from "./changeCardModal";

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    secondModal: secondModal.reducer,
    user: userReducer,
    list:listReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;