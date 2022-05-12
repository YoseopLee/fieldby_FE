import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../fBase";

const SignUp = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const register = async() => {
        try {
            const user = await createUserWithEmailAndPassword(
                authService,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <SignUpContainerCSS>
            <input placeholder="이메일" onChange={(e) => {
                setRegisterEmail(e.target.value);
            }}
            />
            <input placeholder="비밀번호" onChange={(e) => {
                setRegisterPassword(e.target.value);
            }}/>
            <button onClick={register}>회원가입</button>
        </SignUpContainerCSS>
    );
};

const SignUpContainerCSS = styled.div`

`

export default SignUp;