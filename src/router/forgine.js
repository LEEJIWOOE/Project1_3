import React, { useState } from 'react';
import MyMap from "./KakaoMap";
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoWechat } from "react-icons/io5";

function Forgine({selectedSido, sidos, zeroWastes, selectZeroWaste }) {
    let navigate = useNavigate();
    let [chatbot, setChatbot] = useState(false)

    const toDay = new Date();
    const formatDate = `${toDay.getFullYear()}년 ${toDay.getMonth() + 1}월 ${toDay.getDate()}일`;

    return (
            <div className="Map">
                <MyMap selectedSido={selectedSido} sidos={sidos} selectZeroWaste={selectZeroWaste} zeroWastes={zeroWastes}/> {/* selectedSido prop 전달 */}
            </div>
    );
}

export default Forgine;
