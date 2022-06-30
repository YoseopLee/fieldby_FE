import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { authService } from "../../fBase";


const SideBar = () => {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [userData, setUserData] = useState('');
    
    const handleLogout = async() => {
        try {
            await authService.signOut();
            window.location.href = `/login`;
        } catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getUserData = async () => {
            const json = await get(child(dbRef, `brands/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    setUserData(data_obj);
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        getUserData();
    }, []);

    return (
        <SideBarContainerCSS>
            <div className="campaign-logo">
                    <img src="/images/필드바이 로고-47 1.png" alt=""/>
                    <h2 className="campaign-logo-name">Business Suite</h2>
                </div>

                <div className="campaign-sidemenu">
                    <div className="campaign-sidemenu-company-box">
                        <span className="campaign-sidemenu-company-name">{userData.companyName}</span>
                    </div>
                    <div className="campaign-sidemenu-progress-box">
                        <img src="/images/image 108.png" alt="progress"/>
                        <Link to='/campaign' className="campaign-sidemenu-progress">캠페인</Link>
                    </div>                    
                </div>
                
                <div className="campaign-customer-center">
                    <div className="campaign-customer-ask">
                        <img src="/images/customer.png" alt="customer-center" className="customer-img"/>
                        <span className="customer-ask">고객센터</span>
                        <img src="/images/up-arrow.png" alt="up" className="up-arrow" />
                    </div>
                </div>

                <div onClick={handleLogout}>
                    <span>로그아웃</span>
                </div>
        </SideBarContainerCSS>
    )
}

const SideBarContainerCSS = styled.div`

    position : abosolute;
    z-index : 9999;
    background : #ffffff;
    height : 100vh;
    width : 240px;
    display : flex;
    flex-direction : column;
    align-items : center;

    .campaign-logo {
        padding-top : 20px;
        img {
            height : 43px;
            width : 133px;
        }
        .campaign-logo-name {
            margin-left : 14px;
            margin-block-start : -10px;
            margin-block-end : 0;
            font-size : 18px;
            color : #303030;
            
        }
    }

    .campaign-sidemenu {
        margin-top : 45px;
        width : calc(100% - 30px);

        .campaign-sidemenu-company-box {
            border : 1px solid #22Baa8;
            border-radius : 5px;
            height : 43px;
            display : flex;
            justify-content : center;
            align-items : center;
            .campaign-sidemenu-company-name {
                font-weight : 700;
                color : #303030;
            }
        }

        .campaign-sidemenu-progress-box {
            margin-top : 12px;
            width : calc(120%);
            height : 50px;
            display : flex;
            justify-content : center;
            align-items : center;
            background: #303030;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            .campaign-sidemenu-progress {
                font-weight : 700;
                color : #ffffff;
                text-decoration : none;
            }
            img {
                width : 19px;
                height : 20px;
                margin-right : 8px;
            }
        }

        .campaign-sidemenu-report-box {
            margin-top : 12px;
            height : 36px;
            display : flex;
            justify-content : center; 
            align-items : center; 
            .campaign-sidemenu-report {
                font-weight : 700;
                color : #303030;
            }
            img {
                width : 19px;
                height : 20px;
                margin-right : 8px;
            }
        }
    }

    .campaign-customer-center {
        margin-top : auto;
        margin-bottom : 40px;
        
        .campaign-customer-ask {
            display : flex;
            align-items : center;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            
            .customer-img {
                width : 19px;
                height : 20px;
                margin-right : 12px;
            }

            .up-arrow {
                width : 12px;
                height : 12px;
                margin-left : 12px;
            }
        }        
    }

`

export default SideBar;