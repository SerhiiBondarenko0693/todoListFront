import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/Store";
import style from "./CreateForm.module.css";
import {closeChangeCardModal} from "../../Store/changeCardModal"
import {createCard} from "../../Store/ApiBaseReduser";

// interface Todo {
//     _id: string;
//     title: string;
//     text: string;
//     isDelete: boolean;
//     isOpen: boolean;
// }

const CreateForm: FC = () => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [emptyFieldErr, setEmptyFieldErr ] = useState(false)

    // const currentCard = useSelector<RootState, Todo | null>(state => state.list.currentCard);
    const dispatch = useDispatch<AppDispatch>();



    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const sendAddOBJ = ()=> {

        const newCard = {
            title:title,
            text:text,
        }
        if(title.trim().length> 5 && text.trim().length> 5){

            dispatch(createCard(newCard))
            setEmptyFieldErr(false)
            dispatch(closeChangeCardModal())
        }else{
            setEmptyFieldErr(true)

        }


    }

    return (
        <div className={style.editWrapper} onClick={(e) => {
            e.stopPropagation();
        }}>
            <div className={style.exitBtn}>
                <button onClick={() => {
                    dispatch(closeChangeCardModal())
                }}>X</button>
            </div>
            <div className={style.titleEdit}>
                <input
                    placeholder={"Enter theme"}
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className={style.text}>
                <textarea
                    placeholder={"Enter text"}
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
            {emptyFieldErr && <p>Empty field</p>}


            <div className={style.btnBlock}>
                <button
                    onClick={()=>{
                        sendAddOBJ()
                    }}
                >Add</button>

                <button
                    onClick={() => {
                        dispatch(closeChangeCardModal())
                    }}>Cancel
                </button>
            </div>
        </div>
    );
};

export default CreateForm;
