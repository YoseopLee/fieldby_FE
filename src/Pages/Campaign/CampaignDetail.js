import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";

const CampaignDetail = () => {
    
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
                    
                </div>    
                <div id="campaign-detail-cm" className="campaign-detail-square-hc campaign-detail-square-vc">
                    <div className="campaign-progress-result-wrapper">
                        <Link className="campaign-register-progress" to='progress'>신청 현황</Link>
                        <Link className="campaign-register-result" to='result'>선정 결과</Link>
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
        top : 20px;
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
        height : 13%;
        top : 80px;        
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