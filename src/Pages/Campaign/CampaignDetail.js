import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
import { useAuth } from "../../Context/authProvider";

const CampaignDetail = () => {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [campaignMainImage, setCampaignMainImage] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [recruitingDate, setRecruitingDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    let {id} = useParams();

    useEffect(() => {
        const dbBrandRef = ref(getDatabase());
        const getBrandCampaignData = async () => {
            const json = await get(child(dbBrandRef, `brands/${userId}/campaigns/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    console.log(data_obj);
                    setCampaignMainImage(data_obj.mainImageUrl);
                    setCampaignTitle(data_obj.campaignTitle);
                    setRecruitingNumber(data_obj.recruitingNumber);
                    setRecruitingDate(data_obj.recruitingDate);
                    setDueDate(data_obj.dueDate);
                } else {
                    console.log("No data");
                }
            }).catch((error) => {
                console.log(error);
            })          
        }
        getBrandCampaignData();
    }, []);
    
    return (
        <>
            <SideBar />
            <CampaignDetailCSS>
                <div className="campaign-detail-top-wrapper">                    
                        <h2 className="campaign-detail-top-main">진행 현황</h2>
                        <div className="campaign-detail-top-box">
                            <div className="campaign-detail-ask-btn">
                                <Link to='/campaign'>문의하기</Link>
                            </div>
                            <div className="campaign-detail-download-btn">
                                <Link to='/campaign'>보고서 다운로드</Link>
                            </div>
                        </div>
                </div>
                
                <div id="campaign-detail-top" className="campaign-detail-top-square-hc campaign-detail-top-square-vc">
                    <div className="campaign-detail-top-contents-wrapper">

                        <div className="campaign-detail-top-image-box">
                            <img src={campaignMainImage} alt="top-image" className="campaign-detail-top-image"/>
                        </div>

                        <div className="campaign-detail-top-title-wrapper">
                            <div className="campaign-detail-top-title">
                                <span className="campaign-detail-top-instagram">Instagram</span>
                                <span className="campaign-detail-top-ship">배송형</span>
                            </div>
                            <div className="campaign-detail-top-name-wrapper">
                                <span className="campaign-detail-top-name">{campaignTitle}</span>
                                <div className="campaign-detail-top-recruit-box">
                                    <span className="campaign-detail-top-recruit-number">선정된 크리에이터 {recruitingNumber}명</span>
                                </div>
                            </div>
                            <div className="campaign-detail-top-timeline">
                                <div className="campaign-timeline-status">
                                    <img src="/images/image 84.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 모집</span>
                                    <span>{recruitingDate} - {dueDate}</span>
                                </div>
                                <div className="campaign-timeline-status">
                                    <img src="/images/image 84.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 선정</span>
                                    <span>{dueDate} - {dueDate}</span>
                                </div>
                                <div className="campaign-timeline-status">
                                    <img src="/images/image 84.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 발표</span>
                                    <span>{dueDate} - {dueDate}</span>
                                </div>
                                <div className="campaign-timeline-status">                                    
                                    <span>콘텐츠 등록 기간</span>
                                    <span></span>
                                </div>
                                <div className="campaign-timeline-status">                                    
                                    <span>보고서 확인</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                    
                    
                </div>    
                <div id="campaign-detail-cm" className="campaign-detail-square-hc campaign-detail-square-vc">
                    <div className="campaign-progress-result-wrapper">
                        <Link className="campaign-register-progress" to='progress'>신청 현황</Link>
                        <Link className="campaign-register-result" to='result'>선정 결과</Link>
                        <Link className="campaign-complete-posts" to='complete'>완료 포스팅</Link>
                        <Link className="campaign-report" to='report'>캠페인 보고서</Link>
                    </div>

                    <Outlet />
                </div>
            </CampaignDetailCSS>            
        </>
    )
}

const CampaignDetailCSS = styled.div`
    .campaign-detail-top-wrapper {
        display : flex;
        position : absolute;
        justify-content : space-between;
        left : 0;
        right : 0;
        top : 15px;
        bottom : 0;
        margin-bottom : auto;
        margin-top : auto;
        margin-right : 2%;
        margin-left : 20%;

        .campaign-detail-top-main {
            margin-block-start : 0.41em;
        }

        .campaign-detail-top-box {
            
           display : flex;

            .campaign-detail-ask-btn {
                border-radius : 5px;
                background : #303030;
                max-height : 40px;
                width : 200px;
                display : flex;
                align-items : center;
                justify-content : center;
                a {
                    font-weight : 700;
                    font-size : 14px;
                    color : #ffffff;
                    text-decoration : none;
                }
            }
            
            .campaign-detail-download-btn {
                margin-left : 20px;
                border-radius : 5px;
                background : #303030;
                max-height : 40px;
                width : 200px;
                display : flex;
                align-items : center;
                justify-content : center;

                a {
                    font-weight : 700;
                    font-size : 14px;
                    color : #ffffff;
                    text-decoration : none;
                }
            }
        }
    }
    
    #campaign-detail-top {
        position : absolute;
        max-width : 80%;
        min-height : auto;
        padding-block : 16px;
        .campaign-detail-top-contents-wrapper {
            display : flex;           
            height : 100%;
            .campaign-detail-top-image-box{
                height : 100%;
                margin-left : 16px;
                margin-right : 18px;
                .campaign-detail-top-image {
                    border-radius : 12px;
                    width : 150px;
                    height : 100%;
                }
            }
            
            .campaign-detail-top-title-wrapper {
                display : flex;
                flex-direction : column;
                width : 75%;
                .campaign-detail-top-title {
                    margin-bottom : -4px;
                    .campaign-detail-top-instagram {
                        font-size : 16px;
                        font-weight : 700;
                        color : #DF56C6;
                        margin-right : 16px;
                    }
                    .campaign-detail-top-ship {
                        font-size : 13px;
                        color : #303030;
                    }
                }
                .campaign-detail-top-name-wrapper {
                    display : flex;
                    align-items : end;
                    .campaign-detail-top-name {
                        font-size : 20px;
                        font-weight : 700;
                        margin-right : 12px;
                    }
                    .campaign-detail-top-recruit-box {
                        background-color : #C4F3EE;          
                        border-radius : 6px;
                        width : 174px;
                        height : 30px;
                        display : flex;
                        align-items : center;
                        justify-content : center;             
                        .campaign-detail-top-recruit-number {
                            color : #22Baa8;
                            font-weight : 700;
                        }
                    }
                }

                .campaign-detail-top-timeline {
                    margin-top : 36px;
                    height : 0;
                    width : 100%;                    
                    border : 1px solid #22Baa8;
                    display : flex;
                    justify-content : space-around;
                    .campaign-timeline-status {
                        display : flex;
                        flex-direction : column;
                        align-items : center;
                        
                        z-index : 999;
                        .campaign-status-sign {
                            margin-top : -10px;
                            margin-bottom : 10px;
                            width : 20px;
                        }
                        span {
                            font-size : 12px;
                            margin-bottom : 1px;
                        }
                    }
                }
            }

            
        }
        
    }

    .campaign-detail-top-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }

    .campaign-detail-top-square-vc {
        height : 12%;
        top : 70px;        
        margin-top : auto;
        margin-bottom : auto;
    }

    #campaign-detail-cm {
        position : absolute;
        max-width : 80%;
        min-height : auto;
        overflow-y : scroll;
    }

    .campaign-detail-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }
    
    .campaign-detail-square-vc {
        height : 70%;
        bottom : 40px;
        margin-top : auto;
        margin-bottom : auto;
    }

    .campaign-progress-result-wrapper {
        display : flex;
        padding : 16px;
        .campaign-register-progress {
            border-radius : 5px;
            background : #303030;
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;
        }

        .campaign-register-result {
            margin-left : 20px;
            border-radius : 5px;
            background : #303030;
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;           
        }
    }
`

export default CampaignDetail;