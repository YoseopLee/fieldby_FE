import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../fBase";

const FindPassword = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const sendEmail = () => {
        sendPasswordResetEmail(authService, email)
        .then(() => {                
            console.log(email);
            alert('받으신 이메일에서 비밀번호를 재설정 해주세요 : )');
            navigate('/login');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    } 
    

    return (
        <FindPasswordCSS>
            <div id="findpw-cm" className="findpw-square-hc findpw-square-vc">
                <div className="login-logo">
                    <img src="/images/fieldbylogo.png" alt=""/>
                    <h2 className="login-logo-name">Business Suite</h2>
                </div>
                <div className="findpw-main">
                    <span className="findpw-ask">비밀번호를 잊어버리셨나요?</span>
                    <span className="findpw-info">비즈니스 계정으로 등록된 이메일 주소를 입력하시면<br/>비밀번호 재설정 안내 메일을 보내드립니다.</span>
                    <input name="email" type="email" placeholder="이메일" className="find-email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <button className="find-btn" onClick={sendEmail}>비밀번호 찾기</button>
                    <div className="login-info-container">
                        <div className="login-info-wrapper">
                            <a href="/privacy" className="login-privacy">개인정보처리방침</a>
                            <span>|</span>
                            <a href="/policy" className="login-policy">이용약관</a>
                        </div>
                        <span className="login-info-rights">ⓒ 2022 FIELDBY Corporation. All Rights Reserved.</span>
                    </div>
                </div>
            </div>            
        </FindPasswordCSS>        
    );
}

const FindPasswordCSS = styled.div`
    #findpw-cm {
        position : absolute;
        min-width : 672px;
        min-height : 703px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }
    .findpw-square-hc {
        height : 50%;
        top : 0;
        bottom : 0;
        margin-top : auto;
        margin-bottom : auto;
    }
    .findpw-square-vc {
        width : 30%;
        left : 0; 
        right : 0;
        margin-left : auto;
        margin-right : auto;
    }
    .login-logo {
        margin-top : 20px;
        margin-left : 16px;
        img {
            height : 43px;
            width : 133px;
        }
        .login-logo-name {
            margin-left : 8px;
            margin-block-start : -10px;
            margin-block-end : 0;
            font-size : 18px;
            color : #303030;
        }
    }
    .findpw-main {
        margin-top : 80px;
        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : center;
        .findpw-ask {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 29px;            
            text-align: center;
            color: #000000;
        }
        .findpw-info {
            margin-top : 60px;
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #000000;
        }
        .find-email {
            height : 24px;
            width : 45%;
            left : 0;
            rigth : 0;
            margin-top : 40px;
            margin-left : auto;
            margin-right : auto;
            padding : 8px 10px;
            background: #F1F1F1;
            border: 1px solid #22BAA8;
            border-radius: 13px;
            font-size : 11px;
        }
        .find-btn {
            margin-top : 100px;
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
        .login-info-container {
            display : grid;
            justify-content : center;
            text-align : center;
            margin-top : 70px;
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
    }
`

export default FindPassword;