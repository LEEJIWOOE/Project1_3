import './App.css';
import Forgine from "./router/forgine"
import MyMap from "./router/KakaoMap"
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {
    let navigate = useNavigate();


    return (
        <div className="App">
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/forgine">forgine</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
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
                <Route path="/forgine" element={<Forgine />} />
                <Route path="/MyMap" element={<MyMap />} />
            </Routes>
        </div>
    );
}

export default App;
