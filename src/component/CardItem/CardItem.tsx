import React, {FC, useEffect, useState} from 'react';
import DoneSVG from "../../assets/svg/done";
import ClockSVG from "../../assets/svg/clock";
import EditSVG from "../../assets/svg/edit";
import DeleteSVG from "../../assets/svg/delete";
import EditDone from "../../assets/svg/editDone";
import style from "./CardItem.module.css";
// import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import {actions, changeTodoDone, deleteCard} from "../../Store/ApiBaseReduser";
import {openChangeCardModal} from "../../Store/changeCardModal";



interface CardItemProps{
    _id:string;
    title: string;
    text: string;
    user: string;
    isDelete: boolean;
    isOpen:boolean;
    date:string;
}

const CardItem:FC<CardItemProps> = ({_id, title,
                                        text,user, isDelete,
                                        isOpen,date }) => {

    // const [disableEditBtn, setDisableEditBtn] = useState<boolean>(false);
    const [disableDeleteBtn, setDisableDeleteBtn] = useState<boolean>(false);
    const [disableDoneBtn, setDisableDoneBtn] = useState<boolean>(false);




    const dispatch = useDispatch<AppDispatch>();
    // const editApiStatus = useSelector<RootState, string>((state) => state.list.edit);
    const doneApiStatus = useSelector<RootState, string>((state) => state.list.doneApiStatus);
    const deleteApiStatus = useSelector<RootState, string>((state) => state.list.deleteApiStatus);


    useEffect(()=>{
        doneApiStatus === "pending"? setDisableDoneBtn(true) : setDisableDoneBtn(false);
        deleteApiStatus === "pending"? setDisableDeleteBtn(true) : setDisableDeleteBtn(false);


    },[doneApiStatus, deleteApiStatus])


    return (
        <div className={style.cardWrapper}>
            <div className={style.title} >
                <div className={style.cardTitle}>{title}</div>
                <div>{isOpen? <ClockSVG/>:<DoneSVG/>}</div>
            </div>
            <div className={style.text}>
                {text}
            </div>
            <div className={style.btnBlock}>
                <button  className={style.btn}
                         onClick={()=>{
                             dispatch(actions.addCurrentCard({_id: _id}));
                             dispatch(openChangeCardModal())
                         }}
                ><EditSVG/></button>

                <button disabled={disableDeleteBtn} onClick={()=>{
                    dispatch(deleteCard({_id}))
                }} className={style.btn}><DeleteSVG/>
                </button>


                {!isOpen || <button disabled={disableDoneBtn} className={style.btn} onClick={()=>{
                    dispatch(changeTodoDone({_id}))
                }}><EditDone/></button>}
            </div>
        </div>
    );
};


export default CardItem;