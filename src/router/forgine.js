import React, { useEffect, useRef, useState } from 'react';
import GoogleMap from "./googleMap";
import MyMap from "./KakaoMap";
import Chatbot from "./chatbot";
import axios from "axios";
import { Route, useParams } from "react-router-dom";
import './forgine.css';
import getBotResponse from './Reply';
import { Card, Button } from "react-bootstrap";
// import responses from "./responses.json";

function Forgine(props) {
    let [userInput, setuserInput] = useState('');
    let [city, setCity] = useState(['일본', '뉴옥', '상해', '태국','필리핀','유럽']);
    let [cityTitle,setCityTitle] = useState(0);
    let [e, setE] = useState('바다가자');
    let [activeIndex, setActiveIndex] = useState(0);
    let [modal, setModal] = useState(false);
    let [chatbot, setChatbot] = useState(false);
    let [prevE, setPrevE] = useState('');
    let [prevCity, setPrevCity] = useState([]);
    let [account, setAccount] = useState(['서울설명','대전설명','대구설명', '부산설명','강릉설명','양양설명']);
    let [prevAccount, setPrevAccount] = useState([]);
    let [cityImg, setCityImg] = useState([
        "/img/seoul.jpg",
        "/img/daejeon.jpg",
        "/img/daegu.jpg",
        "/img/busan.jpg",
        "/img/gang.jpg",
        "/img/yang.jpg"
    ]);


    const getBackgroundColor = (index) => {
        const colors = ['lightblue',
            'lightgreen',
            'lightpink',
            'lightyellow',
            'lightcoral',
            'lightcyan'];
        return colors[index % colors.length];
    };

    const handlePrevClick = () => {
        const prevIndex = (activeIndex - 1 < 0 ? city.length - 1 : activeIndex - 1);
        setActiveIndex(prevIndex);
        const cityLists = document.querySelectorAll('.F_city-list');
        if (cityLists) {
            cityLists.forEach((cityList, index) => {
                cityList.style.transform = `translateX(-${prevIndex * 100}vw)`;
            });
        }
    };

    const handleNextClick = () => {
        const nextIndex = (activeIndex + 1) % city.length;
        setActiveIndex(nextIndex);
        const cityLists = document.querySelectorAll('.F_city-list');
        if (cityLists) {
            cityLists.forEach((cityList, index) => {
                cityList.style.transform = `translateX(-${nextIndex * 100}vw)`;
            });
        }
    };

    return (
        <div className="App">
            <div className="K_header">
                <div className="F_big_content">
                        {city.map((cityName, i) => (
                            <div className="F_city-list">
                                <h2>
                                    <button className="이전" onClick={handlePrevClick}>이전</button>
                                    <button className="다음" onClick={handleNextClick}>다음</button>
                                </h2>
                                <img className="img_box"
                                     src={cityImg[i]}
                                     style={{width: '300px', height: '300px'}}
                                />
                                <h4 onClick={() => {
                                    setModal(!modal)
                                    setCityTitle(i)
                                }}>{cityName}</h4>
                                <p>{account[i]}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className="input_box">
                <input type="text" onChange={(e) => {
                    setuserInput(e.target.value);
                }}/>
                <button onClick={() => {
                    let copy = [...city];
                    copy.unshift(userInput);
                    setCity(copy)
                }}>지역추가
                </button>
            </div>
            <div>
                <Button variant="outline-warning" onClick={() => {
                    setChatbot(!chatbot)
                }}>chat!!</Button>{' '}
                {chatbot && <Chatbot city={city} setCity={setCity} cityTitle={cityTitle} setCityTitle={setCityTitle}/>}
            </div>
            <div>
                <div className="Map">
                    <h1>Korea Component</h1>
                    <div className="googleMap">
                        <GoogleMap/>
                    </div>
                    <div className = "KakaoMap">
                         <MyMap/>
                    </div>
                </div>
            </div>
            {modal && <Modal city={city} setCity={setCity} cityTitle={cityTitle} setCityTitle={setCityTitle}/>}
        </div>
    );
}

function Modal(props) {
    let [a, setA] = useState('밤이야?');
    let [userInput1, setuserInput1] = useState('');
    let [name, setName] = useState(['한식', '중식', '일식']);
    let [title, setTitle] = useState(0);
    let [date, setDate] = useState(['2월27일','3월2일','3월17일']);
    let [like, setLike] = useState([0, 0, 0]);
    let [prevA, setPrevA] = useState('');
    let [prevName, setPrevName] = useState([]);
    let [prevDate, setPrevDate] = useState([]);
    let [img, setImg] = useState([
        "/img/bibim.jpg",
        "/img/ch.jpg",
        "/img/susi.jpg"
    ]);

    const handleButtonClick = () => {
        if (a === '밤이야?'){
            setPrevA(a);
            setA('밥먹을까?');
            setPrevName(name);
            setName(['소주', '맥주', '막걸리']);
            setPrevDate(date)
            setImg([
                "/img/soju.jpg",
                "/img/beer.jpg",
                "/img/makgeolli.jpg"
            ]);
            setDate(['2월 11일','2월18일','3월 15일']);
            setLike([0, 0, 0]);
        } else {
            setA(prevA);
            setName(prevName);
            setImg([
                "/img/bibim.jpg",
                "/img/ch.jpg",
                "/img/susi.jpg"
            ]);
            setDate(prevDate);
            setLike([0, 0, 0]);
        }
    };

    return (
        <div className="Modal" style={{background: props.color}}>
            <div className="text_box">
                <h4>제목 : {props.city[props.cityTitle]}</h4>
                <p>상세내용 : </p>
                <h2>
                    <button onClick={handleButtonClick}>{a}</button>
                </h2>
            </div>
            <div className="big_content1">
                {name.map(function (a, i) {
                    return (
                        <div className="content" key={i}>
                            <img src={img[i]} style={{width: '300px', height: '300px'}}/>
                            <h4 onClick={() => {
                                setTitle(i)
                            }}>{name[i]}</h4>
                            <p>{date[i]}</p>
                            <p><span onClick={() => {
                                let copy = [...like];
                                copy[i] = copy[i] + 1;
                                setLike(copy)
                            }}>❤</span>{like[i]}</p>
                            <button onClick={()=>{
                                let copy = [...name]
                                copy.splice(i,1);
                                setName(copy)
                            }}>삭제</button>
                        </div>
                    )
                })}
            </div>
            <div className = "input_box1">
                <input type="text" onChange={(e) => {
                    setuserInput1(e.target.value);
                }}/>
                <button onClick={()=>{
                    let copy = [...name];
                    copy.unshift(userInput1)
                    setName(copy)
                }}>맛집추가</button>
            </div>
        </div>
    )
}


export default Forgine;
