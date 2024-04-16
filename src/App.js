import './App.css';
import Forgine from "./router/forgine"
import MyMap from "./router/KakaoMap"
import React, {useState, useEffect} from "react";
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, Link, useNavigate, Outlet} from 'react-router-dom'
import {FiAlignJustify} from 'react-icons/fi';
import {TiWeatherWindyCloudy} from "react-icons/ti";

function App() {
    let navigate = useNavigate();

    const toDay = new Date();
    const formatDate = `${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`;

    return (
        <div className="App">

            <Navbar
                style={{zIndex: 99}}
                collapseOnSelect expand="lg"
                className="bg-body-tertiary">
                <Container>
                    <TiWeatherWindyCloudy/>
                    <Navbar.Brand href="/">대기환경정보</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/forgine">대기질현황</Nav.Link>
                            <Nav.Link href="#pricing">대기오염예보</Nav.Link>
                        </Nav>
                        <div className="todayCurrent">
                            <Nav>
                                <Nav>{formatDate}</Nav>
                                <Nav.Link
                                    as="a"
                                    href="https://www.weather.go.kr/w/index.do"
                                    target="_blank"
                                >현재기온
                                </Nav.Link>
                            </Nav>
                        </div>
                        <FiAlignJustify/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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

        </div>
    );
}

export default App;
