import './App.css';
import Forgine from "./router/forgine";
import MyMap from "./router/KakaoMap";
import Weather from "./router/weather";
import AirStatus from "./router/Nefron";
import React, { useState, useEffect } from "react";
import {Route, Router, Routes, Link, useNavigate, Outlet} from 'react-router-dom'
import {FiAlignJustify} from 'react-icons/fi';
import {TiWeatherWindyCloudy} from "react-icons/ti";

function App() {
    let navigate = useNavigate();

    // 현재 날짜 받아오기
    const toDay = new Date();
    const formatDate = `${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`;

    // 날씨 상태 변수 정의


    return (
        <div className="App">

            <section className="sidebar">
                <header>
                    <nav>
                        <button className="hamburger-btn">
                            <FiAlignJustify/>
                        </button>
                        <h1><a href={"/forgine"}>ECO Recycle Hub</a></h1>
                        <button className="login-btn">로그인</button>
                    </nav>
                    <div className="head-weather">
                        <div className="myLocation">
                            <Weather/>
                        </div>
                        <nav className="contents-btn">
                            <AirStatus/>
                        </nav>
                    </div>
                </header>
                <div className="main-contents"></div>

            </section>

            <section className="main-con">
                <Routes>
                    <Route path="/" element={<div className="big_content">
                        <div className="foreign_box" onClick={() => {
                            navigate('/forgine')
                        }}><h1>놀이공원</h1></div>
                        <div className="login_box" onClick={() => {
                            navigate('/login')
                        }}><h1>공항</h1></div>
                    </div>}></Route>
                    <Route path="/forgine" element={<Forgine/>}/>
                    <Route path="/MyMap" element={<MyMap/>}/>

                </Routes>
            </section>

        </div>
    );
}



export default App;
