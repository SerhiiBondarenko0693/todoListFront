import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';


///////////////////////////////////////////////////////////////

interface Todo {
    _id: string;
    title: string;
    text: string;
    user: string;
    isDelete: boolean;
    isOpen: boolean;
    date: string;
}

interface InitialState {
    list: Todo[];
    currentCard:Todo | null;
    loading: boolean;
    updateApiStatus: boolean;
    doneApiStatus: string;
    deleteApiStatus: string;
    createCardApiStatus: boolean;
    error: any;
}

const initialState: InitialState = {
    list: [],
    currentCard:null,
    loading: false,
    updateApiStatus:false,
    createCardApiStatus:false,
    doneApiStatus:"start",
    deleteApiStatus: "start",
    error: {},
};

export const listTodo = createAsyncThunk('listSlice/fetchData', async (_,) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        'https://todo-list-back-eta.vercel.app/api/getTodo',
        { token },
        {
            headers: {
                Authorization: token,
            },
        }
    );

    if(response.status === 200){
        return response.data
    }else {
        return []
    }

});


/////////////////////////////////////////////////////////////////////////////

interface ChangeTodoDoneParams {
    _id: string;
}

export const changeTodoDone = createAsyncThunk(
    'listSlice/changeTodoDone',
    async ({ _id }: ChangeTodoDoneParams) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                'https://todo-list-back-eta.vercel.app/api/doneTodo',
                {id: _id},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                return (_id)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
);


///////////////////////////////////////////////////////////////////

export const deleteCard = createAsyncThunk (
    'listSlice/deleteCard',
    async ({ _id }: ChangeTodoDoneParams) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `https://todo-list-back-eta.vercel.app/api/deleteTodo/${ _id }`,

                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.status === 200) {
                return (_id)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
);


interface updateOBJ {
    _id?: string;
    title: string;
    text: string;
    isDelete?: boolean;
    isOpen: boolean;
    date?:string
}

export const updateCard = createAsyncThunk<updateOBJ, updateOBJ>(
    'listSlice/updateCard',
    async (todo: updateOBJ) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                "https://todo-list-back-eta.vercel.app/api/updateTodo",
                todo,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                return response.data ;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
);

/////////////////////////////////////////////////////////////

interface NewCard {
    title: string;
    text: string;
}

export const createCard = createAsyncThunk(
    'listSlice/createCard',
    async (todo: NewCard) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "https://todo-list-back-eta.vercel.app/api/addTodo",
                todo,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
);




//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



const listSlice = createSlice({
    name:"list",
    initialState,
    reducers:{
        addCurrentCard: (state, action) => {
            const { _id } = action.payload;
            const card = state.list.find(item => item._id === _id);
            if (card) {
                state.currentCard = card;
            }
        },

    },

    extraReducers:(builder)=>{
        builder
            .addCase(listTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(listTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.list || [];
            })
            .addCase(listTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            })

            ///////////////////////////////////////////////////

            .addCase(changeTodoDone.pending, (state) => {
                state.doneApiStatus = "pending";
            })
            .addCase(changeTodoDone.fulfilled, (state, action) => {
                const _id = action.payload;
                state.list = state.list.map((todo) =>
                    todo._id === _id ? {...todo, isOpen: !todo.isOpen} : todo
                );
                state.doneApiStatus = "succeeded";
            })
            .addCase(changeTodoDone.rejected, (state, action) => {
                state.doneApiStatus = "failed";
                state.error = action.payload || "An error occurred";
            })


            ///////////////////////////////////////////////////////////

            .addCase(updateCard.pending, (state) => {
            state.updateApiStatus = true;
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                const TodoOBJ= action.payload;

                const {title, text, isOpen, _id: id} = TodoOBJ;
                const index = state.list.findIndex(item => item._id === id);

                if(index !==-1){
                    state.list[index]={...state.list[index],text,title,isOpen }
                }

                state.updateApiStatus = false;
            })
            .addCase(updateCard.rejected, (state, action) => {
                state.updateApiStatus = false;
                state.error = action.payload || "An error occurred";
            })

            ////////////////////////////////////////////////////////////////////

            .addCase(deleteCard.pending, (state) => {
                    state.deleteApiStatus = "pending";
                })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const _id = action.payload;
                state.list = state.list.filter(item=> item._id !==_id)
                state.deleteApiStatus = "succeeded";
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.deleteApiStatus = "failed";
                state.error = action.payload || "An error occurred";
            })
            ///////////////////////////////////////////////////////

            .addCase(createCard.pending, (state) => {
                state.createCardApiStatus = true;
            })
            .addCase(createCard.fulfilled, (state, action) => {
                const newTodo = action.payload;
                console.log(newTodo);
                state.list.push(newTodo)
                //
                // const {title, text, isOpen, _id: id} = TodoOBJ;
                // const index = state.list.findIndex(item => item._id === id);
                //
                // if(index !==-1){
                //     state.list[index]={...state.list[index],text,title,isOpen }
                // }

                state.createCardApiStatus = false;
            })
            .addCase(createCard.rejected, (state, action) => {
                state.createCardApiStatus = false;
                state.error = action.payload || "An error occurred";
            })






    }
})



export const { reducer, actions } = listSlice;