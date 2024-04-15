import React, { useState } from 'react';
import MyMap from "./KakaoMap";
import {Button, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Chatbot from "./chatbot";
import './forgine.css'

function Forgine(props) {
    let navigate = useNavigate();
    const [showSideNav, setShowSideNav] = useState(false);
    let [chatbot, setChatbot] = useState(false)

    return (
        <div className="App">
            <div className="sub">
            </div>
            <div className="Map">
                <MyMap/>
            </div>
            <div className="Chatbot">
                <Button variant="outline-warning" onClick={() => {
                    setChatbot(!chatbot)
                }}>chat!!</Button>{' '}
                { chatbot && <Chatbot />}
            </div>
        </div>
    );
}

export default Forgine;
