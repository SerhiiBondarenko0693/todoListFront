import { createSlice } from "@reduxjs/toolkit";

type Todo = {
    _id:string
    title:string
    text:string
    status:string
    isDelete:boolean
    user:string
    date: Date
};

interface TodoListResponse {
    list:Todo[],

};

const initialState ={
    list:[],
    loading:"pending",
    error: null,
}

