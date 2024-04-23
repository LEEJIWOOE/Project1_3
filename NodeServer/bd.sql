CREATE TABLE users (
                       id NUMBER PRIMARY KEY,  -- PK
                       userid VARCHAR2(100),  -- UserID 또는 User 닉네임
                       password VARCHAR2(100),  -- 패스워드
                       nickname VARCHAR2(100),   -- 닉네임
                       realname VARCHAR2(100)      -- 실제 사용자 이름
);

 -- 원하시는대로 밑에 내용은 변경하세요.
INSERT INTO users (id, userid, password, nickname, realname) VALUES (1, 'dusqo', '123456', '연배', '강연배');
INSERT INTO users (id, userid, password, nickname, realname) VALUES (2, 'wldn', '1234', '지우지우', '이지우');
