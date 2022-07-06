import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { authService } from "../../fBase";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const onChange = (event) => {
    //     const {target : {name, value}} = event;
    //     if (name === "email") {
    //         setEmail(value);
    //     } else if (name === "password") {
    //         setPassword(value);
    //     }
    // }

    
    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(authService, email,password);
            console.log(user);
            navigate("/campaign");
        } catch (error) {
            console.log(error.message);
        }
    };

    return( 
        <LoginContainerCSS>
            <div className="login-square-hc login-square-vc" id="login-cm">
                <div className="login-logo">
                    <img src="images/필드바이 로고-47 1.png" alt=""/>
                    <h2 className="login-logo-name">Business Suite</h2>
                </div>
                <div className="login-box-container">
                    <div className="login-box">
                        <input name="email" type="email" placeholder="이메일" className="login-email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                        <input name="password" type="password" placeholder="비밀번호" className="login-pw" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    {/* <div className="login-maintain">
                        <img src="images/login-maintain.png" alt=""/>
                        <span className="login-maintain-check">로그인 유지</span>
                    </div> */}
                    <div className="login-btn-wrapper">
                        <button onClick={signIn} id="login-btn">로그인</button>
                        
                    </div>
                </div>
                
                <div className="login-find-container">
                    <div className="login-find-wrapper">
                        <a href="/sign-up" className="login-signup">회원가입</a>
                        <span>|</span>
                        <a href="/find-pw" className="login-find-pw">비밀번호 찾기</a>
                    </div>
                </div>
                <div className="login-info-container">
                    <div className="login-info-wrapper">
                        <a href="/privacy" className="login-privacy">개인정보처리방침</a>
                        <span>|</span>
                        <a href="/policy" className="login-policy">이용약관</a>
                    </div>
                    <span className="login-info-rights">ⓒ 2022 FIELDBY Corporation. All Rights Reserved.</span>
                </div>
            </div>
        </LoginContainerCSS>   
    )
    
}

const LoginContainerCSS = styled.div`
    #login-cm {
        position : absolute;
        min-width : 672px;
        min-height : 703px;
    }
    .login-square-hc {
        width : 30%;
        left : 0;
        right : 0;
        margin-left : auto;
        margin-right : auto;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;  
    }
    .login-square-vc {
        height : 70%;
        top : 0;
        bottom : 0;
        margin-bottom : auto;
        margin-top : auto;
    }
    .login-logo {
        margin-top : 20px;
        margin-left : 16px;
        img {
            height : 43px;
            width : 133px;
        }
        .login-logo-name {
            margin-left : 14px;
            margin-block-start : -10px;
            margin-block-end : 0;
            font-size : 18px;
            color : #303030;
        }
    }

    .login-box-container {
        margin-top : 120px;
        display : grid;

        .login-box {
            display : grid;
            width : 100%;
            .login-email {
                height : 24px;
                width : 45%;
                left : 0;
                rigth : 0;
                margin-left : auto;
                margin-right : auto;
                padding : 8px 10px;
                background: #F1F1F1;
                border: 1px solid #22BAA8;
                border-radius: 13px;
                font-size : 11px;
            }
            .login-pw {
                height : 24px;
                width : 45%;
                left : 0;
                right : 0;
                margin-left : auto;
                margin-right : auto;
                padding : 8px 10px;
                margin-top : 18px;
                background: #F1F1F1;
                border: 1px solid #22BAA8;
                border-radius: 13px;
                font-size : 11px;
            }
        }
    }

    .login-maintain {
        margin-top : 110px;
        display : flex;
        justify-content : center;
        align-items : center;
        img {
            height : 25px;
            width : 25px;
        }
        .login-maintain-check {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            margin-left : 8px;
        }
    }
    
    .login-btn-wrapper {
        display : flex;
        justify-content : center;
        margin-top : 110px;

        #login-btn{
            background: #303030;
            border-radius: 5px; 
            border : none;
            width : 35%;
            height : 46px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            text-align: center;
            color: #FFFFFF;
        }
    }

    .login-find-container {
        display : flex;
        justify-content : center;
        margin-top : 80px;
        .login-find-wrapper{
            display : flex;
            justify-content : space-between;
            .login-signup {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                margin-right : 6px;
                color : #303030;
                text-decoration : none;
            }
            .login-find-pw {
                margin-left : 6px;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                color : #303030;
                text-decoration : none;
            }
        }
        
    }
    
    .login-info-container {
        display : grid;
        justify-content : center;
        text-align : center;
        margin-top : 50px;
        margin-bottom : 10px;
        .login-info-wrapper {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
            .login-privacy {
                margin-right : 3px;
                text-decoration : none;
                color : #8e8e8e;
            }
            .login-policy {
                margin-left : 3px;
                text-decoration : none;
                color : #8e8e8e;
            }
        }
        
        .login-info-rights {
            color : #8e8e8e;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
        }
    }
`

export default Login;