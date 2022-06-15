import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "../../Components/SideBar/SideBar";
import { useAuth } from "../../Context/authProvider";
import CampaignList from "./CampaignList";

const Campaign = () => {
    const {currentUser} = useAuth();
    const [userData, setUserData] = useState('');
    const [brandCampaignDatas, setBrandCampaignDatas] = useState([]);

    useEffect (() => {
        const dbRef = ref(getDatabase());
        const getUserData = () => {
            get(child(dbRef, `brands/${currentUser.uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    console.log(data_obj);
                    setUserData(data_obj);
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        return getUserData;   
    }, [currentUser.uid]);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getBrandCampaignData = () => {
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    console.log(data_obj);
                    const data_ent = Object.entries(data_obj);
                    const data_ent_arr = data_ent.map((d) => Object.assign({}, d[1], {id : d[0]}));
                    console.log(data_ent_arr);
                    setBrandCampaignDatas(data_ent_arr);
                } else {
                    console.log("No data");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        return getBrandCampaignData;
    }, [currentUser.uid]);

    

    return (
        <CampaignContainerCSS>
            <SideBar />
            <div id="campaign-cm" className="campaign-square-hc campaign-square-vc">
                
                    {userData.campaigns 
                        ?
                            <div className="campaign-main">
                                <span className="campaign-all">전체</span>
                                <div className="campaign-progress-table">
                                    <div className="campaign-progress-titles">
                                        <span>완료여부</span>
                                    </div>
                                    <div className="campaign-progress-titles">
                                        <span>캠페인</span>
                                    </div>
                                    <div className="campaign-progress-titles">
                                        <span>캠페인 기간</span>
                                    </div>
                                    <div className="campaign-progress-titles">
                                        <span>모집인원</span>
                                    </div>
                                </div>
                                
                             
                                    <div className="campaign-data-container">
                                        {brandCampaignDatas.map((brandCampaignData) =>
                                            <CampaignList 
                                                key={brandCampaignData.id}                                        
                                                id={brandCampaignData.id}
                                                campaignTitle = {brandCampaignData.campaignTitle}
                                                recruitingDate = {brandCampaignData.recruitingDate}
                                                dueDate = {brandCampaignData.dueDate}
                                                recruitingNumber = {brandCampaignData.recruitingNumber}                                                                                                                                                                                                                                                                               
                                            />
                                        )}                                        
                                    </div>
                                                                                                                                                                                 
                            </div>    
                        :   
                            <div className="campaign-empty">
                                <img src="images/campaign-empty.png" alt="no-campaign"/> 
                                <span>캠페인 내역이 없습니다.</span>
                            </div>
                    }
                
            </div>
        </CampaignContainerCSS>
    )
}

const CampaignContainerCSS = styled.div`
    #campaign-cm {
        position : absolute;
        min-width : 900px;
        min-height : 700px;
    }
    
    .campaign-square-hc {
        width : 50%;
        left : 0;
        right : 0;
        margin-left : 30%;
        margin-right : auto;
        background : #ffffff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;  
    }

    .campaign-square-vc {
        height : 70%;
        top : 0;
        bottom : 0;
        margin-top : auto;
        margin-bottom : auto;
    }

    .campaign-main {
        padding : 20px;
        .campaign-all {
            text-align : left;
            font-weight : 700;
        }

        .campaign-progress-table {
            display : flex;
            width : 100%;
            height : 50px;
            background : #f1f1f1;
            margin-top : 80px;
            justify-content : space-around;
            align-items : center;
            .campaign-progress-titles {
                width : auto;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 15px;
                }
            }
        }
    }

    .campaign-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 300px;
        img {
            width : 47px;
            height : 47px;
        }

        span {
            margin-top : 8px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            
        }
    }

    .campaign-data-container {
        list-style-type : none;
        padding-inline-start : 0;
    }
`

export default Campaign;