import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";
import { useAuth } from "../../Context/authProvider";
import CampaignResultDetail from "./CampaignResultDetail";

const CampaignResult = () => {
    const {currentUser} = useAuth();    
    let {id} = useParams();
    const [userDatas, setUserDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState('');

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignSelectedUserData = async() => {
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);                    
                    setDatas(dataObj);                    
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr);
                    const newUsersArrays = [];
                    for (let i = 0; i < data_ent_arr.length; i++) {
                        get(child(dbRef, `users/${data_ent_arr[i]}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                newUsersArrays.push(userDataObj)
                                console.log(newUsersArrays);                                
                                setUserDatas([...newUsersArrays]);
                                setLoading(false);
                            } else {
                                console.log("No Data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }                    
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        getCampaignSelectedUserData();
    }, [])

    const sendShipMessage = () => {
        
    }

    return (        
        <CampaignResultCSS>
            {datas ? (
                <>
                    {loading ? (
                        <div className="spinner-cm">
                            <Spinner />
                        </div>
                    ) : (
                        <table className="campaign-result-table"> 
                            <tbody>
                                <tr className="campaign-progress-table">
                                    <td className="campaign-progress-titles-number">                                        
                                        <span>번호</span>                                              
                                    </td>
                                    <td className="campaign-progress-titles-name">                                        
                                        <span>이름</span>                                        
                                    </td>
                                    <td className="campaign-progress-titles-phone">                                        
                                        <span>전화번호</span>                                           
                                    </td>
                                    <td className="campaign-progress-titles-address">                                
                                        <span>주소</span>                                            
                                    </td>
                                    <td className="campaign-progress-titles-post">                                        
                                        <span>송장번호</span>                                        
                                    </td>
                                </tr>
                                <hr />        
                                {userDatas.map((userData, idx) => 
                                    <CampaignResultDetail 
                                        key={idx}
                                        id={idx + 1}
                                        name={userData.name}
                                        profile={userData.igInfo?.profileUrl}
                                        phoneNumber={userData.phoneNumber}
                                        zipno={userData.address.zipNo}
                                        roadaddress={userData.address.roadAddr}
                                        detailaddress={userData.address.detail}
                                    />
                                )}                                
                            </tbody>                           
                            <button className="ship-upload-btn">송장 일괄 업로드</button>                                
                            <button className="ship-download-btn">명단 다운로드</button>
                            <button className="ship-btn">송장 적용하기</button>                                                                                            
                        </table>                        
                    )}
                </>
            ) : (
                <div className="campaign-result-empty">
                    <img src="/images/campaign-empty.png" alt="no-campaign"/> 
                    <span>아직 선정된 크리에이터들이 없습니다.</span>
                </div>
            )}
            
            
        </CampaignResultCSS>
    )
}

const CampaignResultCSS = styled.div`
    .spinner-cm {
        position : absolute;
        left : 50%;
        top : 50%;
        right : 50%;
        bottom : 50%;
        margin-top : auto;
        margin-bottom : auto;
        margin-right : auto;
        margin-left : auto;
    }
    .campaign-result-table {        
        margin-left : 40px;
        border-collapse: collapse;
        border-spacing: 0;
        width : calc(100% - 80px);
        .campaign-progress-table {
            display : flex;                        
            align-items : center;
            .campaign-progress-titles-number {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 10%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-name {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;
                span {
                    text-align : right;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-phone {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-address {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 40%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-post {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                margin-left : 36px;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }

            .selected-data-name {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                    span {
                        color : #303030;
                        font-weight: 700;
                        font-size: 15px;
                        line-height: 18px;
                        text-align : center;
                    }

                    .selected-data-profile {
                        display : flex;
                        align-items : center;
                        
                        .selected-user-profile {
                            margin-left : 16px;
                            margin-right : 16px;
                            border-radius : 50%;
                            width : 65px;
                            height : 65px;
                        }
                        .selected-username {
                            font-size : 15px;
                            font-weight : 700;
                        }
                    }
            }
            .selected-data-number {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 10%;                
                display : flex;
                align-items : center;
                justify-content : center;             
                span {            
                    color : #303030;        
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 18px;
                    text-align : center;
                }
            }
            .selected-data-phone {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    text-align : center;
                }
            }
            .selected-data-address {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 40%;
                display : flex;                
                
                
                .address-wrapper {
                    align-items : center;
                    display : flex;
                    justify-content : flex-start;
                    .address-flex-box {
                        display : flex;
                        flex-direction : column;
                        width : 100%;
                    }                                        
                    .shipment-names {
                        margin-left : 20px;
                        border: 1px solid #303030;
                        border-radius: 13px;
                        height : 48px;
                        width : calc(55%);
                        padding : 8px;
                    }
                }
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 18px;                    
                }
            }
            .selected-data-post {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                margin-left : 36px;
                .table-input {
                    border : none;
                    height : 48px;
                    background: #F1F1F1;
                    border-radius: 13px;
                    padding-left : 12px;
                    color : #766F6F;                    
                }
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    text-align : center;
                }
            }
        }
    }
    
    hr {
        border : 1px solid #303030;
        width : 100%;
        margin-top : 10px;
        margin-bottom : 20px;        
    }
    .campaign-result-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 300px;
        img {
            width : 65px;
            height : 65px;
        }

        span {
            margin-top : 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 19px;
            color : #303030;
        }
    }
        
    .ship-upload-btn {
        background : transparent;
        border : 1px solid #766F6F;
        border-radius : 5px;
        position : fixed;
        width : 160px;
        height: 48px;
        left : -40%;
        top : 85%;
        right : 0;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        &:active {
            top : 85.1%;
            left : -39.9%;
        }
        &:hover {
            background : #22Baa8;
            color : #ffffff;
        }
    }
            
    .ship-download-btn {
        background : transparent;
        border : 1px solid #766F6F;
        border-radius : 5px;
        position : fixed;
        width : 160px;
        height: 48px;
        left : 60%;
        top : 85%;
        right : 0;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        &:active {
            top : 85.1%;
            left : 60.1%;
        }
        &:hover {
            background : #22Baa8;
            color : #ffffff;
        }
    }

    .ship-btn {
        background : #303030;
        border-radius : 5px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
        border : 1px solid #e7e7e7;
        position : fixed;
        width : 160px;
        height: 48px;
        left : 80%;
        top : 85%;
        right : 0;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        color : #ffffff;
        &:active {        
            top : 85.2%;
            left : 80.2%;
        }        
        &:hover {
            background : #22Baa8;                              
        }   
    }    
`
export default CampaignResult;