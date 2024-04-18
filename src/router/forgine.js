import React, { useState } from 'react';
import MyMap, { WeatherStatus} from "./KakaoMap";
import { Link, useNavigate } from 'react-router-dom';
import Chatbot from "./chatbot";
import { IoLogoWechat } from "react-icons/io5";

import '../css/forgine.css'
// import '../css/ChatBot.css'

function Forgine(props) {
    let navigate = useNavigate();
    let [chatbot, setChatbot] = useState(false)

    const toDay = new Date();
    const formatDate = `${toDay.getFullYear()}년 ${toDay.getMonth() + 1}월 ${toDay.getDate()}일`;

    return (
        <div className="App">

            {/*<div className="sub">*/}
            {/*    <div className="map-widget">*/}
            {/*        <div className="widget-header">*/}
            {/*            <h4>구로구 대기질 정보</h4>*/}
            {/*            <p>{formatDate}</p>*/}
            {/*        </div>*/}
            {/*        <div className="widget-section">*/}
            {/*            <table>*/}
            {/*                <tbody>*/}
            {/*                <tr>*/}
            {/*                    <th>초미세먼지</th>*/}
            {/*                    <td>PM-2.5</td>*/}
            {/*                    <td>5㎍/㎥</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>미세먼지</th>*/}
            {/*                    <td>PM-10</td>*/}
            {/*                    <td>10㎍/㎥</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>오존</th>*/}
            {/*                    <td>O3</td>*/}
            {/*                    <td>0.0292ppm</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>이산화질소</th>*/}
            {/*                    <td>NO2</td>*/}
            {/*                    <td>0.0119ppm</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>일산화탄소</th>*/}
            {/*                    <td>CO</td>*/}
            {/*                    <td>0.28ppm</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>아황산가스</th>*/}
            {/*                    <td>SO2</td>*/}
            {/*                    <td>0.0021ppm</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th>통합대기<br/>*/}
            {/*                        환경지수</th>*/}
            {/*                    <td>PM-2.5</td>*/}
            {/*                    <td>5㎍/㎥</td>*/}
            {/*                    <td className="status">좋음</td>*/}
            {/*                </tr>*/}
            {/*                </tbody>*/}
            {/*            </table>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="Map">
                <MyMap/>
                <WeatherStatus/>
            </div>
            <div className="Chatbot">
                {/*<button*/}
                {/*    style={{ zIndex:99 }}*/}
                {/*    onClick={openChat}*/}
                {/*>Chat</button>*/}
                {/*{openChat && <Chatbot onClose={closeChat} />}*/}
                <button
                    className="chat-open-btn"
                    // onClick={openChat}
                    onClick={() => {
                        setChatbot(!chatbot)
                    }}><IoLogoWechat />
                </button>{''}
                { chatbot && <Chatbot />}
            </div>

        </div>
    );
}

export default Forgine;
