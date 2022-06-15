import { child, get, getDatabase, query, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import CampaignProgressDetail from "./CampaignProgressDetail";

const CampaignProgress = () => {
    const {currentUser} = useAuth();
    let {id} = useParams();
    const userIdRef = useRef();
    const [userIDs, setUserIDs] = useState([]);
    const [userDatas, setUserDatas] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignUserData = () => {
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[0]));
                    console.log(data_ent_arr);
                    setUserIDs(data_ent_arr);
                    data_ent_arr.map((v) => {
                        get(child(dbRef, `users/${v}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                const user_data_ent = Object.entries(userDataObj);
                                console.log(user_data_ent);
                                const user_data_ent_arr = user_data_ent.map((d) => Object.assign({}, d[1], {id : d[0]}))
                                console.log(user_data_ent_arr);
                            } else {
                                console.log("No Data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })                        
                    })                    
                } else {
                    console.log("No data");
                }
            }).catch ((error) => {
                console.log(error);
            });
        }
        return getCampaignUserData;
    }, [])



    const handleToggleChecked = () => {

    }

    return (
        <CampaignProgressCSS>
            <div className="campaign-progress-menus">
                <div className="campaign-select">
                </div>
            </div>
            {userIDs.map((userID) => 
                <CampaignProgressDetail 
                    key={userID}
                    id={userID}
                />
            )}
        </CampaignProgressCSS>
    )
}

const CampaignProgressCSS = styled.div`
    .campaign-progress-menus {
        .campaign-select {

        }
    }

    .campaign-register-users {
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
    }
`

export default CampaignProgress;