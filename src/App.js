import './App.css';
import Korea from "./router/korea"
import Forgine from "./router/forgine"
import MyMap from "./router/KakaoMap"
import LoginPage from "./router/login";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {
    let navigate = useNavigate();


    return (
        <div className="App">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">dusqo 여행</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
                            <Nav.Link onClick={() => { navigate('/korea') }}>공항</Nav.Link>
                            <Nav.Link onClick={() => { navigate('/forgine') }}>놀이공원</Nav.Link>
                            <Nav.Link onClick={() => { navigate('/login') }}>login</Nav.Link>
                            <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<div className="big_content">
                    <div className="foreign_box" onClick={() => {
                        navigate('/forgine')
                    }}><h1>놀이공원</h1></div>
                    <div className="korea_box" onClick={() => {
                        navigate('/korea')
                    }}><h1>공항</h1></div>
                    <div className="login_box" onClick={() => {
                        navigate('/login')
                    }}><h1>공항</h1></div>
                </div>}></Route>
                <Route path="/korea" element={<Korea/>}/>
                <Route path="/forgine" element={<Forgine />} />
                <Route path="/MyMap" element={<MyMap />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
