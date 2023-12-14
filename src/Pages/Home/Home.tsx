import React, { FC }  from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import style from "./Home.module.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const Home:FC = () => {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className={style.homeWrapper} >
            <Calendar  onChange={onChange} value={value}  />
        </div>
    );
};

export default Home;