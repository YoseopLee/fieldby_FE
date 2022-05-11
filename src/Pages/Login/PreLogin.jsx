import React from "react";
import styled from "styled-components";

const PreLogin = () => {
    const loginBtn = () => {
        window.location.href = "/login";
    }

    return (
        <PreLoginCSS>
            <div id="prelogin-cm" className="prelogin-square-hc prelogin-square-vc">
                <div className="prelogin-logo">
                    <img src="images/필드바이 로고-47 1.png" alt=""/>
                    <h2 className="prelogin-logo-name">Business Suite</h2>
                </div>
                <p className="prelogin-info">
                    필드바이 비즈니스 스위트는 필드바이 파트너만 이용하실 수 있습니다.<br/>
                    자세한 사항은 문의하기 버튼을 눌러주세요.
                </p>
                <div className="prelogin-btn-wrapper">
                    <button id="prelogin-btn" onClick={loginBtn}>로그인</button>
                </div>
                <div className="prelogin-ask-wrapper">
                    <a href="http://pf.kakao.com/_xdxeQzb" className="prelogin-ask">문의하기</a>
                </div>
            </div>
        </PreLoginCSS>
    )
}

const PreLoginCSS = styled.div`
    #prelogin-cm {
        position : absolute;
        min-height : 523px;
        min-width : 672px;
    }
    .prelogin-square-hc{
        width : 25%;
        left : 0;
        right : 0;
        margin-left : auto;
        margin-right : auto;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }
    .prelogin-square-vc{
        height : 45%;
        top : 0;
        bottom : 0;
        margin-top : auto;
        margin-bottom : auto;
    }

    .prelogin-logo {
        display : flex;
        justify-content : center;
        margin-top : 60px;
        img{
            width : 200px;
            height : 60px;
        }
        .prelogin-logo-name {
            color : #303030;
        }
    }
    
    .prelogin-info {
        margin-top : 100px;
        font-style: normal;
        font-weight: 400;   
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #000000;
    }
    
    .prelogin-btn-wrapper {
        display : flex;
        justify-content : center;
        margin-top : 100px;
        #prelogin-btn {
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

    .prelogin-ask-wrapper {
        display : flex;
        justify-content : center;
        margin-top : 60px;

        .prelogin-ask {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            text-align: center;
            text-decoration : none;
            color : #303030;
        }
    }
`

export default PreLogin;