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

    return (        
        <CampaignResultCSS>
            {loading ? (
                <div className="spinner-cm">
                    <Spinner />
                </div>
            ) : (
                <>
                    {datas 
                      ?
                        <>
                            <div className="campaign-progress-table">
                                <div className="campaign-progress-titles">
                                    <span>번호</span>
                                </div>
                                <div className="campaign-progress-titles">
                                    <span>이름</span>
                                </div>
                                <div className="campaign-progress-titles">
                                    <span>전화번호</span>
                                </div>
                                <div className="campaign-progress-titles">
                                    <span>주소</span>
                                </div>
                                <div className="campaign-progress-titles">
                                    <span>송장번호</span>
                                </div>
                            </div>
                            <hr/>
                    
                            {userDatas.map((userData, idx) => 
                                <CampaignResultDetail 
                                    key={idx}
                                    id={idx + 1}
                                    name={userData.name}
                                    profile={userData.igInfo.profileUrl}
                                    phoneNumber={userData.phoneNumber}
                                    zipno={userData.address.zipNo}
                                    detailaddress={userData.address.roadAddr}
                                />
                            )}
                        </>
                      :
                        <div className="campaign-result-empty">
                            <img src="images/campaign-empty.png" alt="no-campaign"/> 
                            <span>아직 선정된 크리에이터들이 없습니다.</span>
                        </div>
                    }
                </>
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
    .campaign-progress-table {
        display : flex;
        width : 100%;
        justify-content : space-around;
        align-items : center;
        .campaign-progress-titles {
            width : auto;
            span {
                text-align : center;
                font-weight : 400;
                font-size : 13px;
            }
        }
    }
    hr {
        border : 1px solid #303030;
        width : 90%;
        margin-top : 20px;
        margin-bottom : 20px;
    }
    .campaign-result-empty {
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
`
export default CampaignResult;