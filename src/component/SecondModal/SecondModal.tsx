import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import style from "./SecondModal.module.css"
import EditForm from "../EditForm/EditForm";
import {closeChangeCardModal} from "../../Store/changeCardModal";
import CreateForm from "../CreateForm/CreateForm";




const SecondModal:FC = () => {

    // const currentCard = useSelector<RootState>(state => state.list.currentCard);
    const isOpenEdit = useSelector<RootState, boolean>(state => state.secondModal.isOpenEdit);
    const isOpenAdd = useSelector<RootState, boolean>(state => state.secondModal.isOpenAdd);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={style.modalWrapper} onClick={()=>{
            dispatch(closeChangeCardModal())
        }}>

            {isOpenEdit && <EditForm />}
            {isOpenAdd && <CreateForm/>}


        </div>
    );
};

export default SecondModal;