import React, { useState } from 'react';
import '../css/login.css'

const LoginPage = () => {
    // 로그인 상태를 관리하기 위한 state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 버튼을 클릭할 때 호출되는 함수
    const handleLogin = () => {
        // 여기서는 간단하게 입력된 사용자명과 비밀번호를 확인하여 "testuser"와 "password"인 경우에만 로그인 성공 처리
        if (username === 'testuser' && password === 'password') {
            setIsLoggedIn(true);
        } else {
            alert('올바른 사용자명과 비밀번호를 입력하세요.');
        }
    };

    // 로그아웃 버튼을 클릭할 때 호출되는 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="login_Page">
            <div className='title'><h2>아이디와 비밀번호를<br/> 입력해주세요.</h2></div>
            <div>아이디</div>
            <div>
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>비밀번호</div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="ErrorMessage">
                올바른 비밀번호를 입력해주세요.
            </div>
            <div>
            <button onClick={handleLogin}>로그인</button>
            </div>
    </div>
    );
};

export default LoginPage;
