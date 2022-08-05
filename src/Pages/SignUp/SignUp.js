import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService, realtimeDbService } from "../../fBase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('');
    const [companyKind, setCompanyKind] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    // 맞았는지 틀렸는지 메세지 전달
    const [phoneMessage, setPhoneMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사
    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword]= useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const onChangePhone = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        const phoneCurrent = e.target.value;
        setPhoneNumber(phoneCurrent);

        if (!phoneRegex.test(phoneCurrent)) {
            setPhoneMessage('핸드폰 번호 형식이 틀렸어요! 다시 확인해주세요 : (');
            setIsPhone(false);
        } else {
            setPhoneMessage('올바른 핸드폰 번호 형식이에요 : )')
            setIsPhone(true);
        }
    }, []);

    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0,9]{1,3}\.[0-9]{1,3}\.])|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value;
        setRegisterEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 : (');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 이메일 형식이에요 : )');
            setIsEmail(true);
        }
    }, [])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(.*[a-zA-Z]).{8,25}$/
        const passwordCurrent = e.target.value;
        setRegisterPassword(passwordCurrent);

        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('비밀번호를 8자리 이상 입력해주세요!');
            setIsPassword(false);
        } else {
            setPasswordMessage('안전한 비밀번호에요 : )');
            setIsPassword(true);
        }
    }, [])

    const onChangePasswordConfirm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordConfirmCurrent = e.target.value;
        setConfirmRegisterPassword(passwordConfirmCurrent);

        if (registerPassword === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
            setIsConfirmPassword(true);
        } else {
            setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 : (')
            setIsConfirmPassword(false);
        }
    }, [registerPassword])

    const phoneAuth = () => {

    }

    const writeUserData = () => {
        try {
            const userId = authService.currentUser.uid;
            set(ref(realtimeDbService, `brands/${userId}`), {
                phoneNum : phoneNumber,
                email : registerEmail,
                companyKind : companyKind,
                name : name,
                companyName : companyName,
            });
        } catch (error) {
            console.log(error.message);
        }       
    }
    
    const register = async() => {        
        try {
            const user = await createUserWithEmailAndPassword(
                authService,
                registerEmail,
                registerPassword
            );
            console.log(user);
            writeUserData();
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <SignUpContainerCSS>
            <div className="sign-up-square-hc sign-up-square-vc" id="sign-up-cm">
                <div className="sign-up-logo">
                    <img src="/images/fieldbylogo.png" alt="signup"/>
                    <h2 className="sign-up-logo-name">Business Suite</h2>
                </div>
                <div className="sign-up-title">회원가입</div>
                {/*<div className="sign-up-box">
                    <span className="sign-up-name">휴대폰 번호</span>
                    <div className="sign-up-phone-wrapper">
                        <input className="sign-up-phone" placeholder="핸드폰('-' 없이 입력해주세요.)" value={phoneNumber} onChange={onChangePhone}/>
                        <button className="sign-up-phone-btn" disabled={!isPhone}>인증번호 발송</button>
                    </div>
                    {phoneNumber.length > 0 && <span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMessage}</span>}
                </div>*/}
                <div className="sign-up-box">
                    <span className="sign-up-name">이메일</span>
                    <input className="sign-up-input" type="email" placeholder="이메일" onChange={onChangeEmail} />
                    {registerEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                </div>
                <div className="sign-up-box">
                    <span className="sign-up-name">비밀번호</span>
                    <input className="sign-up-input" type="password" placeholder="새 비밀번호" onChange={onChangePassword}/>
                    {registerPassword.length > 0 && (<span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>)}                                    
                </div>
                <div className="sign-up-box">
                    <span className="sign-up-name">비밀번호 확인</span>
                    <input className="sign-up-input" type="password" placeholder="비밀번호 확인" onChange={onChangePasswordConfirm}/>
                    {confirmRegisterPassword.length > 0 && (<span className={`message ${isConfirmPassword ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>)}
                </div>            
                <div className="sign-up-box">
                    <span className="sign-up-name">기업구분</span>
                    <select className="sign-up-kind" name="company_kind" onChange={(e) => {
                        setCompanyKind(e.target.value);
                    }}> 
                        <option value="">선택해주세요.</option>
                        <option value="일반">일반</option>
                        <option value="에이전시">에이전시</option>
                        <option value="소상공인">소상공인</option>
                    </select>
                </div>
                
                <div className="sign-up-box">
                    <span className="sign-up-name">담당자 성함 / 직함</span>
                    <input className="sign-up-input" type="text" placeholder="담당자명" onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>
                <div className="sign-up-box">
                    <span className="sign-up-name">회사명 정보</span>
                    <input className="sign-up-input" type="text" placeholder="회사 or 브랜드명" onChange={(e) => {
                        setCompanyName(e.target.value);
                    }}/>
                </div>
                <div className="register-box">
                    <span className="register-confirm">필드바이의 이용약관 및 개인정보취급방침에 동의합니다.</span>
                    <button id="register-btn" onClick={register} disabled={!(isEmail && isPassword && isConfirmPassword)}>가입 완료하기</button>
                </div>
                <div className="register-info-container">
                    <div className="register-info-wrapper">
                        <a href="/privacy" className="register-privacy">개인정보처리방침</a>
                        <span>|</span>
                        <a href="/policy" className="register-policy">이용약관</a>
                    </div>
                    <span className="register-info-rights">ⓒ 2022 FIELDBY Corporation. All Rights Reserved.</span>
                </div>
            </div>
            
        </SignUpContainerCSS>
    );
};

const SignUpContainerCSS = styled.div`
    #sign-up-cm {
        position : absolute;
        min-width : 672px;
        min-height : 850px;
        display : flex;
        flex-direction : column;
        input {
            border : none;
            height : 48px;
            background: #F1F1F1;
            border-radius: 13px;
        }
    }
    .sign-up-square-hc {
        width : 30%;
        left : 0;
        right : 0;
        margin-left : auto;
        margin-right : auto;
        background : #ffffff;
        box-shadow : 2px 2px 10px rgba(0,0,0, 0.07);
        border-radius : 5px;   
    }
    .sign-up-square-vc {
        top : 20px;        
        bottom : 20px;
        margin-top : auto;
        margin-bottom : auto;
        overflow-y : scroll;
    }
    .sign-up-logo {
        margin-top : 20px;
        margin-left : 16px;
        img {
            height : 42px;
            width : 133px;
        }
        .sign-up-logo-name {
            margin-left : 14px;
            margin-block-start : -10px;
            margin-block-end : 0;
            font-size : 18px;
            color : #303030;
        }
    }
    .sign-up-title {
        font-size : 20px;
        font-weight : bold;
        text-align : center;
        margin-bottom : 20px;
    }
    .sign-up-box {
        display : flex;
        flex-direction : column;
        margin-left : 120px;
        margin-right : 120px;
        justify-content : center;
        margin-bottom : 12px;
        .sign-up-name {
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            margin-bottom : 8px;
        }
        .sign-up-input {
            padding-left : 12px;
        }
        .sign-up-phone {
            padding-left : 12px;
            width : 65%;
            margin-right : 8px;
        }
        .sign-up-phone-btn {
            background: #303030;
            border-radius: 13px;
            height : 48px;
            color : #ffffff;
            font-weight : 700;
            line-height : 19px;
            width : 120px;
            text-align : center;
            border : none;
            &:disabled {
                background-color : #f1f1f1;
            }
        }
        .sign-up-input-pw {
            margin-bottom : 8px;
        }
        .message {
            font-weight : 500;
            font-size : 12px;
            line-height : 24px;
            letter-spacing : -1px;
            position : absoulte;
            bottom : -10px;
            left : 0;
            &.success {
                color : #22BAA8;
            }
            &.error {
                color : #ff2727;
            }
        }
    }
    .sign-up-kind {
        border: 1px solid #303030;
        border-radius: 13px;
        height : 48px;
        padding-left : 12px;
    }
    .register-box {
        left: 0;
        right : 0;
        margin-left : auto;
        margin-right : auto;
        display : flex;
        flex-direction : column;
        text-align : center;
        margin-top : 8px;
    }
    .register-confirm {
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #22BAA8;
    }
    #register-btn {
        background: #22BAA8;
        border-radius: 5px;
        height : 46px;
        margin-top : 6px;
        width : 230px;
        border : none;
        color : #ffffff;
        font-weight : 700;
        line-height : 19px;
        &:disabled {
            background-color : #f1f1f1;
        }
    }
    .register-info-container {
        margin-top : 16px;
        display : grid;
        justify-content : center;
        text-align : center;
        .register-info-wrapper {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
            .register-privacy {
                margin-right : 3px;
                text-decoration : none;
                color : #8e8e8e;
            }
            .register-policy {
                margin-left : 3px;
                text-decoration : none;
                color : #8e8e8e;
            }
        }
        
        .register-info-rights {
            color : #8e8e8e;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 17px;
        }
    }
`

export default SignUp;