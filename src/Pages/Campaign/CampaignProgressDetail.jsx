import { child, get, getDatabase} from "firebase/database";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CampaignProgressDetail = ({id}) => {
    
    return(
        <CampaignProgressDetailCSS>
            <div className="campaign-register-user">
                    <div className="selected-box">
                        <img src="/images/image 122.png" alt="empty-check" />
                    </div>

                    <div className="campaign-user-container">
                        
                        <div className="campaign-user-instagram-wrapper">
                            <div className="campaign-register-user-infos">
                                <div className="user-name-container">
                                    <img className="unfollowing" src="/images/image 112.png" alt="unfollow" />
                                    <span className="user-name">{id}</span>
                                    <img className="user-profile-img" src="/images/Ellipse 60.png" alt="profile" />
                                </div>
                                <div className="user-profile-container">
                                    <span>여 22</span>
                                    <span>174cm</span>
                                    <span>서울</span>
                                </div>

                                <div className="user-golf-infos">
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">평균 타수 <span>80대</span></div>
                                        <div className="user-golf-info">구력 <span>4년차</span></div>
                                    </div>
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">월 라운딩 <span>3-4회</span></div>    
                                        <div className="user-golf-info">스타일 <span> #귀엽 #청순</span></div>
                                    </div>
                                                                
                                </div>

                                <div className="user-images-container">
                                    
                                </div>
                            </div>

                            <div className="user-instagram-infos-container">
                                <div className="user-instagram-logo-name">
                                    <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                                    <span className="user-instagram-name">strong_jinseo</span>
                                </div>
                                <div className="user-instagram-profile">
                                    <div className="user-instagram-profile-info">팔로워 <span>34,000</span></div>
                                    <div className="user-instagram-profile-info">팔로우 <span>34,000</span></div>
                                    <div className="user-instagram-profile-info">게시물 <span>34,000</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="user-images-container">
                            <div className="user-image">
                                <img src="/images/IMG_2739.png" alt="test2739" />
                                <img src="/images/IMG_2739.png" alt="test2739" />
                                <img src="/images/IMG_2739.png" alt="test2739" />
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
        </CampaignProgressDetailCSS>
    )
}

const CampaignProgressDetailCSS = styled.div`
.campaign-register-user {
    display : flex;
    align-items : center;
    padding : 16px;
    margin-left : 16px;

    .selected-box {

        img {
            height : 20px;
            width : 20px;
        }
    }
    
    .campaign-user-container {
        display : flex;

        .campaign-user-instagram-wrapper {
            display : grid;
            
            .user-instagram-infos-container {
                display : flex;
                align-items : center;
                border-radius : 13px;
                background : #f1f1f1;
                margin-left : 112px;
                padding : 13px;
                justify-content : space-between;
                .user-instagram-logo-name {
                    
                    display : flex;
                    align-items : center;
                    .instagram-logo {
                        height : 15px;
                        width : 15px;
                    }
                    .user-instagram-name {
                        margin-left : 8px;
                        font-size : 12px;
                        color : #303030;
                        font-weight : 400;
                    }
                    
                }
                .user-instagram-profile {
                    display : flex;
                    .user-instagram-profile-info {
                        font-size : 11px;
                        color : #766F6F;
                        margin-left : 10px;
                        span {
                            color : #303030;
                            font-size : 11px;
                            margin-left : 6px;
                        }
                    }
                }
            }

            .campaign-register-user-infos {
                margin-left : 80px;
                margin-bottom : 8px;
                display : flex;
                .user-name-container {
                    display : flex;
                    align-items : center;
                    justify-content : space-evenly;
                    .unfollowing {
                        height : 21px;
                        width : 21px;
                    }
                    .user-name {
                        margin-left : 16px;
                        font-weight : 700;
                        font-size : 14px;
                        min-width : 200px;
                        text-align : center;
                    }
                    .user-profile-img {
                        margin-left : 16px;
                        border-radius : 50%;
                        width : 65px;
                        height : 65px;
                    }
                }

                .user-profile-container {
                    margin-left : 28px;
                    display : flex;
                    flex-direction : column;
                    justify-content : space-evenly;
                    
                    span {
                        color : #766F6F;
                        font-size : 12px;
                        font-weight : 400;
                    }
                }

                .user-golf-infos {
                    margin-left : 28px;
                    display : grid;
                    padding : 12px;
                    border : 1px solid #f1f1f1;
                    border-radius : 13px;
                    .golf-info-wrapper {
                        display : flex;
                        justify-content : flex-start;
                        .user-golf-info {
                            padding : 8px;
                            color : #766F6F;
                            font-size : 11px;
                            font-weight : 400;
                            span {
                                color : #303030;
                                font-size : 12px;
                            }
                        }
                    }
                }
            }
        }

        .user-images-container {
            .user-image {
                img {
                    margin-left : 16px;
                    height : 150px;
                }
            }
        }
    }
    
}
`

export default CampaignProgressDetail;