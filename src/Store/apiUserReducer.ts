import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isAuthStatus:false,
    loading:null as string | null,
    errors: null as string | null,
}

export const isAuthUserApi = createAsyncThunk('userSlice/fetchData', async (_,) => {
    const token = localStorage.getItem("token");
    const response = await axios.post('https://todo-list-back-eta.vercel.app/api/isWalidToken', {
                token
            },
            {
                headers: {
                    Authorization: token,
                },
            });

        if(response.status === 200){
            return {isAuthStatus:true}
        }else {
            return {isAuthStatus:false}
        }

});


const userSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setAuthStatusTrue(state) {
            state.isAuthStatus = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(isAuthUserApi.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(isAuthUserApi.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.isAuthStatus = action.payload?.isAuthStatus || false;
            })
            .addCase(isAuthUserApi.rejected, (state, action) => {
                state.loading = "failed";
                state.errors = action.error?.message || "An error occurred";
            });
    },
});

export const { reducer, actions } = userSlice;
export const { setAuthStatusTrue } = actions;

