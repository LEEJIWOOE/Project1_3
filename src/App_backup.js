import './App.css';
import { useState } from "react";
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';

function Login() {
    let post = '가산 맛집';
    let [userInput, setuserInput] = useState('');
    let [city, setCity] = useState(['서울', '대전', '대구']);
    let [cityTitle,setCityTitle] = useState(0);
    let [e, setE] = useState('바다가자');
    let [modal, setModal] = useState(false);
    let [prevE, setPrevE] = useState('');
    let [prevCity, setPrevCity] = useState([]);
    let [account, setAccount] = useState(['서울설명','대전설명','대구설명']);
    let [prevAccount, setPrevAccount] = useState([]);
    let [cityImg, setCityImg] = useState([
        "/img/seoul.jpg",
        "/img/daejeon.jpg",
        "/img/daegu.jpg"
    ]);
    let [prevCityImg, setPrevCityImg] = useState([]);
    const cityButtonClick = () => {
        if(e === '바다가자'){
            setPrevE(e);
            setE('도시가자');
            setPrevCity(city);
            setCity(['부산','강릉','양양']);
            setPrevAccount(account)
            setAccount(['부산설명','강릉설명','양양설명']);
            setPrevCityImg(cityImg)
            setCityImg([
                "/img/busan.jpg",
                "/img/gang.jpg",
                "/img/yang.jpg"
            ]);
        }else {
            setE(prevE);
            setCity(prevCity);
            setAccount(prevAccount);
            setCityImg(prevCityImg);
        }
    };

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
                            <Nav.Link href="#action1">Home</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
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
            <div className="big_content">
                <h2>
                    <button onClick={cityButtonClick}>{e}</button>
                </h2>
                {
                    city.map(function (e, i) {
                            return (
                                <div className="content" key={i}>
                                    <img src={cityImg[i]} style={{width: '300px', height: '300px'}}/>
                                    <h4 onClick={() => {
                                        setModal(!modal)
                                        setCityTitle(i)
                                    }}>{city[i]}</h4>
                                    <p>{account[i]}</p>
                                </div>
                            )
                        }
                    )
                }
                <div className="input_box">
                <input type="text" onChange={(e) => {
                    setuserInput(e.target.value);
                    console.log(userInput)
                }}/>
                <button onClick={() =>{
                    let copy = [...city];
                    copy.unshift(userInput);
                    setCity(copy)
                }}>지역추가</button>
                </div>
                {
                    // eslint-disable-next-line no-undef
                    modal == true ? <Modal city={city} setCity={setCity} cityTitle={cityTitle}
                                           setCityTitle={setCityTitle}/> : null
                }
            </div>

        </div>
    );
}

function Modal(props) {
    let [a, setA] = useState('밤이야?');
    let [userInput1, setuserInput1] = useState('');
    let [name, setName] = useState(['한식', '중식', '일식']);
    let [title,setTitle] = useState(0);
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
            setLike([0, 0, 0]); // 게시물 변경 시 좋아요 수 초기화
        }else {
            setA(prevA);
            setName(prevName);
            setImg([
                "/img/bibim.jpg",
                "/img/ch.jpg",
                "/img/susi.jpg"
            ]);
            setDate(prevDate)
            setLike([0, 0, 0]); // 게시물 변경 시 좋아요 수 초기화
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
                {
                    name.map(function (a, i) {
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
                    })
                }
            </div>
            <div className = "input_box1">
             <input type="text" onChange={(e) => {
                setuserInput1(e.target.value);
                console.log(userInput1)
            }}/>
            <button onClick={()=>{
                let copy = [...name];
                copy.unshift(userInput1)
                setName(copy)
            }}>맛집추가</button>
            </div>
</div>
)
};


export default App;
