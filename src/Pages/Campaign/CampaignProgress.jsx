import { child, get, getDatabase, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { realtimeDbService } from "../../fBase";
import CampaignProgressDetail from "./CampaignProgressDetail";

const CampaignProgress = () => {
    const {currentUser} = useAuth();
    let {id} = useParams();
    const [userIDs, setUserIDs] = useState([]);
    const [userDatas, setUserDatas] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [checkedItemsCount, setCheckedItemsCount] = useState(0);
    const newUsersArrays = [];
    
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
                    setUserIDs(dataObj);                    
                        data_ent_arr.map((v) => {              
                            get(child(dbRef, `users/${v}`))
                            .then((snapshot) => {              
                                if (snapshot.exists()) {
                                    const userDataObj = snapshot.val();                                    
                                    newUsersArrays.push(userDataObj);
                                    console.log(newUsersArrays);
                                    setUserDatas(newUsersArrays);
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

    const checkedItemHandler = (id, isChecked) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            setCheckedItemsCount(checkedItems.size);
            console.log(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);            
            setCheckedItemsCount(checkedItemsCount - 1);
            console.log(checkedItems);
        }
    }

    const selectedUserHandler = () => {
        if(checkedItems.size > 0) {
            const selectedUser = Object.entries(...checkedItems);
            const selectedUser_ent = selectedUser.map((d) => Object.assign(d[0])); 
            console.log(selectedUser_ent);
            selectedUser_ent.map((v) => {
                console.log(v);
                try {
                    push(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`), {
                        v
                    });
                } catch (error) {
                    console.log(error.message);
                }
            })                  
        } else {
            alert('크리에이터를 선정해주세요!');
        }
    }

    return (
        <CampaignProgressCSS>
            <div className="campaign-progress-menus">
                <div className="campaign-select">

                </div>
            </div>
            {userDatas.map((userData, idx) =>
                <CampaignProgressDetail 
                    key={idx}
                    id={userIDs}
                    name={userData.name}
                    height={userData.height}                    
                    simpleaddr={userData.simpleAddress}
                    stroke={userData.stroke}
                    career={userData.career}
                    roundingFrequency={userData.roundingFrequency}
                    style1={userData.styles[0]}
                    style2={userData.styles[1]}
                    style3={userData.styles[2]}
                    igname={userData.igInfo.username}
                    igfollower={userData.igInfo.followers}
                    igfollow={userData.igInfo.follows}
                    igmedia={userData.igInfo.mediaCount}                    
                    checkedItemHandler={checkedItemHandler}
                />                                                
            )}
            <button className="selected-btn" type="button" onClick={selectedUserHandler}><span className="selected-user-count">{checkedItemsCount}/10</span><span className="selected-detail">선택한 크리에이터 선정하기</span></button>
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

    .selected-btn {
        background: #22BAA8;
        border: 1px solid #E7E7E7;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        position: absolute;
        width: 361px;
        height: 62px;
        left : 70%;
        right : 0;
        top : 80%;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;

        .selected-user-count {
            background: #C4F3EE;
            border-radius: 9px;
            color : #22BAA8;
            width: 36px;
            height: 15px;
            margin-right : 6px;
        }
        .selected-detail {
            color : #fff;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
        }
    }
`

export default CampaignProgress;