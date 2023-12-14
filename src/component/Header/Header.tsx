import React, {FC, useEffect, useState} from 'react';
import style from "./Header.module.css"
import getWeatherData from "../../utils/getWeather";
import {Link} from "react-router-dom";


interface WeatherObj {
    temp: number;
    description: string;
}

const Header:FC = () => {
    const [weatherObj , setWeatherObj] =  useState<WeatherObj | null>(null);

    useEffect(()=>{
            getWeatherData(50.45, 30.5233)
                .then((data) => {
                    const {weather: [{ description }], main: { feels_like }} = data;
                    const currentWeather = {
                        temp:feels_like,
                        description:description
                    }
                    setWeatherObj(currentWeather);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

    },[setWeatherObj])


    return (
        <div className={style.headerWrapper}>
            <div className={style.weatherBlock}>
                {weatherObj ? (
                    <>
                        <div className={style.weatherItem}>Temperature: {Math.round(weatherObj.temp)}</div>
                        <div className={style.weatherItem}>Weather description: {weatherObj.description}</div>
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
                    <Link className={style.navLink} to="/account">Account</Link>
                </div>
            </div>

        </div>
    );
};

export default Header;