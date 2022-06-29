import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { authService } from "../../fBase";
import CampaignResultDetail from "./CampaignResultDetail";

const CampaignResult = () => {
    const {currentUser} = useAuth();    
    let {id} = useParams();
    const [userIDs, setUserIDs] = useState([]);
    const [userDatas, setUserDatas] = useState([]);
    const newUsersArrays = [];

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignSelectedUserData =
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr);
                    for (const id in data_ent_arr) {
                        console.log(id);
                        get(child(dbRef, `users/${id}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                newUsersArrays.push(userDataObj)
                                console.log(newUsersArrays);
                                setUserDatas(newUsersArrays);
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
        return getCampaignSelectedUserData;
    }, [])

    return (        
        <CampaignResultCSS>
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
                    id={idx}
                    name={userData.name}
                    profile={userData.igInfo.profileUrl}
                    phoneNumber={userData.phoneNumber}
                    zipno={userData.address.zipNo}
                    detailaddress={userData.address.roadAddr}
                />
            )}
        </CampaignResultCSS>
    )
}

const CampaignResultCSS = styled.div`
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
`
export default CampaignResult;