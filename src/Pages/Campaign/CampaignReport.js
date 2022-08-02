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
    const [campaignImpressions, setCampaignImpressions] = useState(0);
    const [campaignEngagement, setCampaignEngagement] = useState(0);
    const [campaignSaved, setCampaignSaved] = useState(0);
    const [campaignLikes, setCampaignLikes] = useState(0);
    const [campaignComments, setCampaignComments] = useState(0);
    const [sumFollowers, setSumFollowers] = useState(0);    
    const followerArray = [];
    const userArray = [];
    const userTokenArray = [];
    const postIdArray = [];

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
                                userArray.push(userDataObj);
                                console.log(userArray);
                                followerArray.push(userDataObj.igInfo?.followers);
                                const sum_followers = followerArray.reduce((a,b) => a + b, 0);
                                console.log(sum_followers);
                                setUserDatas([...userArray]);
                                setSumFollowers(sum_followers);                                                           
                                const userSelectedData = userDataObj.campaigns?.[id].images?.[0];
                                console.log(userSelectedData);
                                postIdArray.push(userSelectedData);                                
                                console.log(postIdArray);
                                
                                const userSelectedToken = userDataObj.igInfo?.token;                                
                                console.log(userSelectedToken);
                                userTokenArray.push(userSelectedToken);    
                                console.log(userTokenArray);                                                                                            
                                                              
                            } else {
                                console.log("No data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }

                    const getPostData= async() => {
                        try {
                            for (let i = 0; i < userTokenArray.length; i++) {
                                const json1 = await axios.get(
                                    // token에 권한이 없어서 불러오지 못함.
                                    `https://graph.facebook.com/v14.0/${postIdArray[i]}/insights?metric=reach,saved&access_token=${userTokenArray[i]}`
                                );
                                
                                const json2 = await axios.get(
                                    `https://graph.facebook.com/v14.0/${postIdArray[i]}?fields=media_type,comments_count,like_count&access_token=${userTokenArray[i]}`
                                );
                                                                                            
                                console.log(json1.data);
                                console.log(json2.data);                            
                                                                    
                                const reach = json1.data.data[0].values[0].value;
                                console.log(reach);
                                setCampaignReach(reach);
                                const impressions = json1.data.data[1].values[0].value;
                                console.log(impressions);
                                setCampaignImpressions(impressions);
                                // const engagement = json1.data.data[2].values[0].value;
                                // console.log(engagement);
                                // setCampaignEngagement(engagement);
                                // const saved = json1.data.data[3].values[0].value;
                                // console.log(saved);
                                // setCampaignSaved(saved);    
                                const likes = json2.data.like_count;
                                console.log(json2.data.like_count);
                                setCampaignLikes(likes);
                                const comments = json2.data.comments_count;
                                console.log(json2.data.comments_count);
                                setCampaignComments(comments);
                            }
                            
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
        
        getCompleteData();
    }, []);

    return (
        <CampaignReportCSS>
            <div className="report-container">
                <span className="report-container-title">총 도달 수</span>
                <span className="report-container-text">*도달은 ‘계정을 본 사람 수’를 말합니다.</span>
                <span className="report-reach-count">{campaignReachs.toLocaleString('ko-KR')}</span>
                <div className="report-text-wrapper">
                    <span className="report-impressions-text">노출</span>
                    <span className="report-impressions-text">{campaignImpressions.toLocaleString('ko-KR')}</span>
                </div>
                <span className="report-impressions-text">홈</span>
                <span className="report-impressions-text">프로필</span>
                <span className="report-impressions-text">기타</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">총 인터렉션 수</span>
                <span className="report-container-text">*인터렉션은 댓글과 좋아요, 저장됨을 모두 합친 수 입니다.</span>
                <span className="report-interaction-count">{campaignEngagement.toLocaleString('ko-KR')}</span>
                <div className="report-text-wrapper">
                    <span className="report-interaction-text">좋아요</span>
                    <span className="report-interaction-text">{campaignLikes.toLocaleString('ko-KR')}</span>
                </div>
                <div className="report-text-wrapper">
                    <span className="report-interaction-text">저장됨</span>
                    <span className="report-interaction-text">{campaignSaved.toLocaleString('ko-KR')}</span>
                </div>
                <div className="report-text-wrapper">
                    <span className="report-interaction-text">공유됨</span>
                     
                </div>
                <div className="report-text-wrapper">
                    <span className="report-interaction-text">댓글</span>
                    <span className="report-interaction-text">{campaignComments}</span>
                </div>                
            </div>
            <div className="report-container">
                <span className="report-container-title">총 팔로워</span>
                <span className="report-followers">{sumFollowers.toLocaleString('ko-KR')}</span>
                <span className="report-container-text">*캠페인 진행 인플루언서의 도합 팔로워 수 입니다.</span>                
                <div className="report-line"/>
                <span className="report-container-title">도달 당 비용</span>
                <span className="report-followers">{Math.floor(1000000/campaignReachs).toLocaleString('ko-KR')}원</span>
                <span className="report-container-text2">*도달은 콘텐츠를 본사람의 숫자로 여러번 노출되어도 1번의 도달로 계산합니다.</span>
            </div>

            <div className="report-container">
                <span className="report-container-title">프로필 활동</span>
                <div className="report-text-wrapper">
                    <span className="report-profile-text">프로필 방문</span>
                    <span className="report-profile-text">5,528</span>
                </div>
                <div className="report-text-wrapper">
                    <span className="report-profile-text">팔로우</span>
                    <span className="report-profile-text">245</span>

                </div>
            </div>
            <div className="report-container">
                <span className="report-container-title">BEST 크리에이터 TOP 3</span>
                <div className="report-best-wrapper">                    
                    {userDatas.map((userData, idx) =>
                        <div className="report-best-box">        
                            <img src={userData.igInfo?.profileUrl} alt="best-img" className="report-best-image"/>
                            <div className="user-instagram-logo-name">
                                <a href={`https://www.instagram.com/${userData.igInfo?.username}`} className="instagram-link" target="_blank">
                                    <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                                    <span className="user-instagram-name">{userData.igInfo?.username}</span>
                                </a>                                
                            </div>
                            <div className="report-user-info-box">                                
                                <span className="report-user-info">좋아요 {campaignLikes}</span>
                                <span className="report-user-info">댓글 {campaignComments}</span>
                                <span className="report-user-info">팔로워 {userData.igInfo?.followers}</span>                                                            
                            </div>
                        </div>                                 
                    )}                                                                                                      
                </div>
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
            margin-top : 5px;
        }

        .report-text-wrapper {
            display : flex;
            justify-content : space-between;
            width : calc(100% - 12px);
        }
    }

    .report-container:nth-child(1) {
        display : flex;
        flex-direction : column;
        .report-reach-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
            margin-top : 20px;
        }
        .report-impressions-text {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            color : #303030;
            margin-top : 24px;
        }
    }
    .report-container:nth-child(2) {
        display : flex;
        flex-direction : column;
        .report-interaction-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
            margin-top : 20px;
        }
        .report-interaction-text {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            color : #303030;
            margin-top : 24px;
            justify-content : space-between;
        }
    }
    .report-container:nth-child(3) {
        display : flex;
        flex-direction : column;
        .report-followers {
            margin-top : 24px;
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
        }
        .report-container-text {
            margin-bottom : 36px;
        }
        .report-container-text2 {
            color : #939393;
            font-size : 10px;
            margin-top : 5px;
        }
        .report-line {
            border : 1px solid #303030;
            margin-bottom : 36px;
        }

    }
    .report-container:nth-child(4) {

        .report-profile-text {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            color : #303030;
            margin-top : 30px;
        }
    }
    .report-container:nth-child(5) {
        grid-column : 2 / 4;
        .report-best-wrapper {
            display : flex;
            justify-content : space-evenly;
            padding : 15px;
            margin-top : 15px;
            .report-best-box {
                display : flex;
                flex-direction : column;
                .report-best-image {
                    width : 180px;
                    height : 180px;
                    border-radius : 50%;
                }
                .user-instagram-logo-name {                                        
                    display : flex;
                    justify-content : space-around;
                    align-items : center;
                    margin-top : 12px;
                    margin-bottom : 24px;
                    .instagram-link{
                        text-decoration : none;
                        display : flex;
                        align-items : center;
                        .instagram-logo {
                            height : 20px;
                            width : 20px;
                        }
                        .user-instagram-name {
                            margin-left : 8px;
                            font-size : 12px;
                            color : #303030;
                            font-weight : 400;
                        }
                    }
                                        
                }
                .report-user-info-box {
                    display : grid;
                    gap : 20px;
                    justify-content : center;
                    background-color : #f1f1f1;
                    padding : 12px;
                    border-radius : 12px;
                    .report-user-info {
                        color: #303030;
                        font-size: 13px;
                    }
                }
            }
        }        
    }
    .report-container:nth-child(6) {
        grid-column : 1 / 4;
    }
`

export default CampaignReport;