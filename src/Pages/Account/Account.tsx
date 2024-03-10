import React, {FC, useEffect, useState} from 'react';
import CardItem from "../../component/CardItem/CardItem";
import style from "./Account.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/Store";
import {listTodo} from "../../Store/ApiBaseReduser";

interface CardItemProps{
    _id:string;
    title: string;
    text: string;
    user: string;
    isDelete: boolean;
    isOpen:boolean;
    date:string;
}

const Account:FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const list = useSelector<RootState, CardItemProps[]>((state) => state.list.list);
    const loading = useSelector<RootState, boolean>((state) => state.list.loading);


    useEffect(() => {
        dispatch(listTodo())
    }, [dispatch]);


    return (
        <div className={style.sectionList}>
            {!loading ?
                (list &&
                list.map(item => (
                    <CardItem
                        key={item._id}
                        _id={item._id}
                        title={item.title}
                        text={item.text}
                        user={item.user}
                        isDelete={item.isDelete}
                        isOpen={item.isOpen}
                        date={item.date}
                    />
                )))
                :(<div>"Loading...."</div>)}
        </div>
    );
};

export default Account;