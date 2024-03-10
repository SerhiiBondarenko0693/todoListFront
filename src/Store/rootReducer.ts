import { combineReducers } from "@reduxjs/toolkit";
import modalSlice from "./modalWindowReducer";
import { reducer as userReducer } from "./apiUserReducer";
import {reducer as listReducer} from "./ApiBaseReduser";
import changeCardModal from "./changeCardModal";

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    changeModal: changeCardModal.reducer,
    user: userReducer,
    list:listReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;