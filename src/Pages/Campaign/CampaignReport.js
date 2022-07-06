import axios from "axios";
import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";

const CampaignReport = () => {

    const {currentUser} = useAuth();
    const {id} = useParams();
    const [userDatas, setUserDatas] = useState([]);
    const [campaignReachs, setCampaignReach] = useState(0);
    const userArray = [];

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCompleteData = async() => {
            const json = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr);
                    
                    for (let i = 0; i < data_ent_arr.length; i++) {
                        get(child(dbRef, `users/${data_ent_arr[i]}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                console.log(userDataObj);                                                            
                                const userSelectedData = userDataObj.campaigns?.[id].images?.[0];
                                console.log(userSelectedData);
                                const userSelectedToken = userDataObj.igInfo?.token;
                                console.log(userSelectedToken);                                                              
                                const getPostData= async() => {
                                    try {
                                        const json1 = await axios.get(
                                            // token에 권한이 없어서 불러오지 못함.
                                            `https://graph.facebook.com/v14.0/${userSelectedData}/insights?metric=reach&access_token=${userSelectedToken}`
                                        );
                                        console.log(json1.data);
                                    } catch (error) {
                                        console.log(error);
                                    }                                    
                                }
                                getPostData();                                
                            } else {
                                console.log("No data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }
                } else {
                    console.log("No data");
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        
        getCompleteData();
    }, []);

    return (
        <CampaignReportCSS>
            <div className="report-container">
                <span className="report-container-title">총 도달 수</span>
                <span className="report-container-text">*도달은 ‘계정을 본 사람 수’를 말합니다.</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">총 인터렉션 수</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">총 팔로워</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">프로필 활동</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">BEST 크리에이터 TOP 3</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">인사이트 데이터</span>
            </div>
        </CampaignReportCSS>
    )
}

const CampaignReportCSS = styled.div`
    padding : 20px;
    display : grid;
    gap : 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    .report-container {
        background : #fff;
        box-shadow : 2px 2px 10px rgba(0,0,0, 0.07);
        border-radius : 5px;
        padding : 16px;

        .report-container-title {
            font-weight : 700;            
            color : #303030;
        }

        .report-container-text {
            color : #939393;
            font-size : 10px;
        }
    }

    .report-container:nth-child(1) {
        display : grid;
    }
    .report-container:nth-child(2) {
        
    }
    .report-container:nth-child(3) {
       
    }
    .report-container:nth-child(4) {
        
    }
    .report-container:nth-child(5) {
        grid-column : 2 / 4;
        
    }
    .report-container:nth-child(6) {
        grid-column : 1 / 4;
    }
`

export default CampaignReport;