import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import style from "./EditForm.module.css";
import {closeChangeCardModal} from "../../Store/changeCardModal"
import {updateCard} from "../../Store/ApiBaseReduser";

interface Todo {
    _id: string;
    title: string;
    text: string;
    isDelete: boolean;
    isOpen: boolean;
}

const EditForm: FC = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const currentCard = useSelector<RootState, Todo | null>(state => state.list.currentCard);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setIsChecked(currentCard ? currentCard.isOpen : false);
        setTitle(currentCard?.title || "");
        setText(currentCard?.text || "")
    }, [currentCard]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const sendUpdateOBJ = ()=> {
       const newCard = {
           id:currentCard?._id ,
           title:title,
           text:text,
           isOpen:isChecked,
           isDelete:currentCard?.isDelete
       }
       dispatch(updateCard(newCard))
        dispatch(closeChangeCardModal())
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
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div className={style.text}>
                <textarea
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
            <div className={style.toggleButtonWrapper}>
                <input
                    type="checkbox"
                    checked={!isChecked}
                    className={style.toggleButton}
                    onChange={() => {
                        setIsChecked(!isChecked)
                    }}
                />
                <p>Done?</p>
            </div>

            <div className={style.btnBlock}>
                <button
                    onClick={()=>{
                        sendUpdateOBJ()
                    }}
                >Edit</button>

                <button
                    onClick={() => {
                        dispatch(closeChangeCardModal())
                    }}>Cancel
                </button>
            </div>
        </div>
    );
};

export default EditForm;
