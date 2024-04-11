import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Chatbot(props) {
    const [chatHistory, setChatHistory] = useState([]);
    const [responses, setResponses] = useState([]);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5000/chatdata')
            .then((result) => {
                console.log(result.data[0]);
                setResponses([result.data[0]]);
            })
            .catch(() => {
                console.log('실패');
            });
    }, []);

    function welcomeMessage() {
        let message = '코드랩 쇼핑몰에 오신 것을 환영합니다. ' +
            '저희 쇼핑몰은 신발, 의류 전문몰입니다. ' +
            '아래 주제에 대해서 문의해주세요.';

        let level1Message = responses.map(item => (
            item.level1.map(subItem => (
                `${subItem.number}: ${subItem.name}`
            ))
        )).join(', ');

        return message + '\n' + level1Message;
    }

    function sendMessage() {
        const userInput = document.getElementById('textInput').value;
        if (userInput.trim() !== '') {
            appendMessage('User', userInput);
            const selectedCategory = findSelectedCategory(userInput, responses);
            if (selectedCategory) {
                showSubCategories(selectedCategory);
            } else {
                appendMessage('ChatBot', '준비중인 메뉴입니다^^');
            }
            document.getElementById('textInput').value = '';
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function findSelectedCategory(userInput, responses) {
        for (let i = 0; i < responses.length; i++) {
            const categories = responses[i].level1;
            for (let j = 0; j < categories.length; j++) {
                const category = categories[j];
                if (userInput === category.name || userInput === category.number.toString()) {
                    return category;
                }
                const subCategories = category.level2;
                for (let k = 0; k < subCategories.length; k++) {
                    const subCategory = subCategories[k];
                    if (userInput === subCategory.name || userInput === subCategory.number.toString()) {
                        return subCategory;
                    }
                }
            }
        }
        return null;
    }

    function showSubCategories(category) {
        let message = '';
        if (!category.level2) {
            message = category.message;
        } else {
            const subCategories = category.level2;
            if (subCategories) {
                for (let i = 0; i < subCategories.length; i++) {
                    message += `${subCategories[i].number}. ${subCategories[i].name}<br>`;
                }
            } else {
                message = '하위 카테고리가 없습니다.';
            }
        }
        appendMessage('Chatbot', message);
    }

    function appendMessage(sender, message) {
        const newMessage = { sender, message };
        setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    return (
        <div className="Chatbot">
            {welcomeMessage()}
            <div ref={chatContainerRef}>
                {chatHistory.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}:</strong> {message.message}
                    </div>
                ))}
            </div>
            <input id="textInput" type="text" placeholder="메세지를 입력하세요." onKeyDown={handleKeyDown} />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
}

export default Chatbot;
