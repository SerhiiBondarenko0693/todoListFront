import React, {FC, useEffect, useState} from 'react';
import style from "./Header.module.css"
import getWeatherData from "../../utils/getWeather";
import {Link, useNavigate} from "react-router-dom";
import { isAuthUserApi} from "../../Store/apiUserReducer";
import {useDispatch} from "react-redux";
import {AppDispatch, useAppSelector} from "../../Store/Store";
import {openModalLogin} from "../../Store/modalWindowReducer";


interface WeatherObj {
    temp: number;
    icon: string;
}


const Header:FC = () => {
    const [weatherObj , setWeatherObj] =  useState<WeatherObj | null>(null);
    const [token, setToken] = useState<string | null>();
    const [isGetToken, setIsGetToken]= useState<boolean>(false);



    const isAuth = useAppSelector(state => state.user.isAuthStatus);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    useEffect(()=>{

        const tokenLocal = localStorage.getItem("token");
        if (tokenLocal){
            setToken(tokenLocal);
            setIsGetToken(!isGetToken);
        }
        if(isGetToken){
            dispatch(isAuthUserApi());
        }
        // eslint-disable-next-line
    },[dispatch, token])

    useEffect(()=>{
            getWeatherData(50.45, 30.5233)
                .then((data) => {
                    const {weather: [{ icon }], main: { feels_like }} = data;
                    const currentWeather = {
                        temp:feels_like,
                        icon:icon
                    }

                    setWeatherObj(currentWeather);

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

    },[setWeatherObj]);

    const redirect = () =>{
        if(!isAuth){
            dispatch(openModalLogin())

        }else {
            navigate("/account")
        }
    }



    return (
        <div className={style.headerWrapper}>
            <div className={style.weatherBlock}>
                {weatherObj ? (
                    <>
                        <div className={style.weatherItem}>Temp: {Math.round(weatherObj.temp)}</div>
                        <div >
                            <img className={style.weatherIcon} alt="weather" src={`https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`}/>
                        </div>
                    </>
                ) : (
                    <div className={style.weatherItem}>Loading...</div>
                )}
            </div>
            <div className={style.navPanel}>
                <div className={style.navItem}>
                    <Link className={style.navLink} to="/">Home</Link>
                </div>
                <div className={style.navItem} >
                    <p className={style.navLink} onClick={()=>{
                        redirect()
                    }}>Account</p>
                </div>
            </div>

        </div>
    );
};

export default Header;