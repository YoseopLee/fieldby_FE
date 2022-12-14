import axios from "axios";
import { child, get, getDatabase, push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";
import SelectCompleteModal from "../../Components/Modal/SelectCompleteModal";
import SelectUserModal from "../../Components/Modal/SelectUserModal";
import { useAuth } from "../../Context/authProvider";
import { realtimeDbService } from "../../fBase";
import CampaignProgressDetail from "./CampaignProgressDetail";

const CampaignProgress = () => {
    const {currentUser} = useAuth();
    let {id} = useParams();
    const [datas, setDatas] = useState("");
    const [userDatas, setUserDatas] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [checkedUserFcmToken, setCheckedUserFcmToken] = useState(new Set());
    const [checkedItemsCount, setCheckedItemsCount] = useState(0);
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [campaignTitle, setCampaignTitle] = useState('');
    const navigate = useNavigate();    

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignUserData = async() => {
            const json = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();  
                    console.log(dataObj);          
                    setDatas(dataObj);        
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[0]));
                    console.log(data_ent_arr);
                    const newUsersArrays = [];                     
                        for (let i = 0; i < data_ent_arr.length; i++) {              
                            get(child(dbRef, `users/${data_ent_arr[i]}`))
                            .then((snapshot) => {              
                                if (snapshot.exists()) {
                                    const userDataObj = snapshot.val();                                    
                                    newUsersArrays.push(userDataObj);                                
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
                    console.log("No data");
                }
                
            }).catch ((error) => {
                console.log(error);
            });
            
        }
        getCampaignUserData();
    }, [])

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignData = async() => {
            const json1 = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const campaignDataObj = snapshot.val();
                    console.log(campaignDataObj.selectCompleted);
                    const isSelected = campaignDataObj.selectCompleted;
                    setIsUserSelected(isSelected);
                    const campaignRecruitingNumber = campaignDataObj.recruitingNumber;
                    setRecruitingNumber(campaignRecruitingNumber);
                    setCampaignTitle(campaignDataObj.campaignTitle);                    
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        getCampaignData();
    }, []);

    const checkedItemHandler = (uid, isChecked) => {
        if (isChecked) {            
            if (checkedItems.size >= recruitingNumber) {
                alert(`?????? ${recruitingNumber}????????? ????????? ??? ?????????!`);
                console.log(checkedItems);
            } else if (checkedItems.size < recruitingNumber){
                checkedItems.add(uid);
                setCheckedItems(checkedItems);
                setCheckedItemsCount(checkedItems.size);
                console.log(checkedItems);
            }
        } else if (!isChecked && checkedItems.has(uid)) {
            checkedItems.delete(uid);
            setCheckedItems(checkedItems);            
            setCheckedItemsCount(checkedItemsCount - 1);
            console.log(checkedItems);
        }
    }

    const checkedFcmTokenHandler = (fcmToken, isChecked) => {
        if (isChecked) {
            checkedUserFcmToken.add(fcmToken);
            setCheckedUserFcmToken(checkedUserFcmToken);
            console.log(checkedUserFcmToken);
        } else if (!isChecked && checkedUserFcmToken.has(fcmToken)) {
            checkedUserFcmToken.delete(fcmToken);
            setCheckedUserFcmToken(checkedUserFcmToken);
            console.log(checkedUserFcmToken);
        }
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
        navigate(`/campaign/${id}/result`);
    }

    const selectedUserHandler = () => {
        if(checkedItems.size > 0) {
            const selectedUser = [...checkedItems];            
            selectedUser.map((v) => {            
                console.log(v);
                try {
                    push(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`), v);
                    update(ref(realtimeDbService, `users/${v}/campaigns/${id}/`), {
                        isSelected : true
                    });
                    update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}`), {
                        selectCompleted : true
                    });
                    // brands => user ?????? ?????????
                    remove(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/users/`), {
                        [v] : v
                    });
                    set(ref(realtimeDbService, `campaigns/${id}/users/`), {
                        [v] : v
                    })                                                     
                } catch (error) {
                    console.log(error.message);
                }                
            })
            
            const dbRef = ref(getDatabase());
            
            const getUserArray = async() => {
                get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/users`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userDataObj = snapshot.val();
                        console.log(userDataObj);
                        const user_data_ent = Object.entries(userDataObj);
                        console.log(user_data_ent);
                        const user_data_ent_arr = user_data_ent.map((d) => Object.assign(d[1]));
                        console.log(user_data_ent_arr);
                        const noSelectedUserDataArray = [];
                        for (let i = 0; i < user_data_ent_arr.length; i++) {
                            noSelectedUserDataArray.push(user_data_ent_arr[i]);
                        }
                        console.log(noSelectedUserDataArray);
                        noSelectedUserDataArray.map((v) => {
                            try {
                                remove(ref(realtimeDbService, `users/${v}/campaigns/${id}`));
                            } catch (error) {
                                console.log(error);
                            }                            
                        })
                    } else {
                        console.log("No Data");
                    }
                }).catch((error) => {
                    console.log(error);
                })
                setModalOpen(false);
                setConfirmModalOpen(true);
            }
            getUserArray();

            const selectedUserFcmToken = [...checkedUserFcmToken];
            for (let i = 0; i < selectedUserFcmToken.length; i++) {
                axios.post("https://fcm.googleapis.com/fcm/send", {
                    "to" : selectedUserFcmToken[i],
                    "data" : {"type" : "select"},
                    "notification" : {"title" : `????????'${campaignTitle}' ???????????? ?????? ??????!`, "body" : `????????'${campaignTitle}' ???????????? ?????????????????????! ?????????????????? ?????????????????? :)`}
                }, {
                    headers : {
                        "Content-Type": "application/json",
                        "Authorization": "key=AAAAd3VbcvA:APA91bEE-_bu4E6TERxIVo0_66CjRQbfjIDB7FwiQJakRRv5rWVMK95R58UFCDUAS1l79mXKJQ_SQVwxjDgdST49rB43QJG-zD0Mmv6Zn2r4xJRAlNf5R-ZpJvmel3VWUSVAJK9bxOJO"
                    }
                }).then((res) => {
                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                })
            }
                        
        } else {
            alert('?????????????????? ??????????????????!');
        }
    }

    return (
        <CampaignProgressCSS>
            {!datas ? (
                <div className="campaign-empty">
                    <img src="/images/campaign-empty.png" alt="no-campaign"/> 
                    <span>?????? ???????????? ????????? ?????????????????? ?????????.</span>
                </div> 
            ) : (
                <>
                {isUserSelected ? (
                    <>
                        {loading ? (
                            <div className="spinner-cm">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="campaign-empty">
                                <img src="/images/campaign-empty.png" alt="no-campaign"/> 
                                <span>?????? ??????????????? ????????? ????????? ??????????????????.</span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {loading ? (
                            <div className="spinner-cm">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="campaign-progress-menus">
                                    <div className="campaign-select">
    
                                    </div>
                                </div>
                                {userDatas.map((userData, idx) =>
                                    <CampaignProgressDetail 
                                        key={idx}
                                        uid={userData.uid}
                                        fcmToken={userData.fcmToken}
                                        name={userData.name}
                                        height={userData.height}                    
                                        simpleaddr={userData.simpleAddress}
                                        stroke={userData.stroke}
                                        career={userData.career}
                                        roundingFrequency={userData.roundingFrequency}
                                        style1={userData.styles[0]} 
                                        style2={userData.styles[1]}
                                        style3={userData.styles[2]}                                                     
                                        bestImage1={userData.bestImages ? userData.bestImages[0] : null}
                                        bestImage2={userData.bestImages ? userData.bestImages[1] : null}
                                        bestImage3={userData.bestImages ? userData.bestImages[2] : null}
                                        token={userData.igInfo?.token}
                                        igname={userData.igInfo?.username}
                                        profile={userData.igInfo?.profileUrl}
                                        igfollower={userData.igInfo?.followers}
                                        igfollow={userData.igInfo?.follows}
                                        igmedia={userData.igInfo?.mediaCount}
                                        isSelected={userData.campaigns?.isSelected}
                                        isFollowed={userData.campaigns?.[id]?.isFollowed}
                                        size={userData.campaigns?.[id]?.size}
                                        color={userData.campaigns?.[id]?.color}                  
                                        checkedItemHandler={checkedItemHandler}
                                        checkedFcmTokenHandler={checkedFcmTokenHandler}                            
                                    />                                                
                                )}
                                <button className="selected-btn" type="button" onClick={openModal}><span className="selected-user-count">{checkedItemsCount}/{recruitingNumber}</span><span className="selected-detail">????????? ??????????????? ????????????</span></button>
                                <SelectUserModal open={modalOpen} close={closeModal} confirm={selectedUserHandler}>
                                    <span className="main-info">??????????????? ?????? ????????? ????????? ???????????????.</span>
                                    <span className="main-ask">????????? ?????????????????????????</span>
                                </SelectUserModal>
                                <SelectCompleteModal open={confirmModalOpen} result={closeConfirmModal}>
                                    <span className="complete-main-info">?????? ??????????????? ????????? ?????????????????????.</span>
                                    <span className="complete-main-detail">?????????????????? ????????? ?????????????????? ????????? ??? ????????????.</span>
                                </SelectCompleteModal>
                            </>
                        )}
                    </>
                )}
                </>
            )}
                
                                                
        </CampaignProgressCSS>
    )
}

const CampaignProgressCSS = styled.div`
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
        position: fixed;
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

    .campaign-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 300px;
        img {
            width : 65px;
            height : 65px;
        }

        span {
            margin-top : 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 19px;
            color : #303030;
        }
    }
`

export default CampaignProgress;