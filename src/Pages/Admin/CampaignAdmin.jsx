import { push, ref, set } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { realtimeDbService, storageService } from "../../fBase";

const CampaignAdmin = () => {
    const [uid, setUid] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [brandInstagram, setBrandInstagram] = useState('');
    const [brandName, setBrandName] = useState('');
    const [recruitingDate, setRecruitingDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [percent, setPercent] = useState(0);
    const [guidePercent, setGuidePercent] = useState(0);
    const [guideDescription, setGuideDescription] = useState([]);
    const [guideImageUrls, setGuideImageUrl] = useState([]);
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [ftc, setFtc] = useState('');
    const [option, setOption] = useState('');
    const [required, setRequired] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDate, setItemDate] = useState('');
    const [leastFeed, setLeastFeed] = useState(0);
    const [maintain, setMaintain] = useState(0);
    const [selectionDate, setSelectionDate] = useState('');
    const [uploadDate, setUploadDate] = useState(''); 
    

    function handleChange(event) {
        setMainImageUrl(event.target.files[0]);
    }

    const handleMainImageUpload = () => {
        if (!mainImageUrl) {
            console.log(mainImageUrl);
        }
        // sRef = firebase/storage , ref = firebase/database
        const storageRef = sRef(storageService, `/campaignImages/${campaignTitle}/${mainImageUrl.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mainImageUrl);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    const handleGuideChange = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...guideImageUrls]

        for (let i = 0; i < imageLists.length; i++) {
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0,10);
        }
        setGuideImageUrl(imageUrlLists);
    };

    const handleGuideImageUpload = () => {
        let imageUrlLists = [...guideImageUrls];
        if (!guideImageUrls) {
            console.log(guideImageUrls);
        }
        const storageMultiRef = sRef(storageService, `campaignImages/${campaignTitle}/guideImages/${imageUrlLists}`)
        const uploadTaskMulti = uploadBytesResumable(storageMultiRef, guideImageUrls);

        uploadTaskMulti.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setGuidePercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTaskMulti.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    }
    
    const registerCampaign = () => {
        try {
            push(ref(realtimeDbService, `brands/${uid}/campaigns/`), {   
                    campaignTitle : campaignTitle,            
                    brandInstagram : brandInstagram,
                    brandName : brandName,
                    recruitingDate : recruitingDate,
                    dueDate : dueDate,
                    recruitingNumber : recruitingNumber,
                    brandUuid : uid,
                    guides : [{
                        description : guideDescription,
                        imageUrl : [...guideImageUrls]
                    }],
                    hashTags : {
                        ftc : ftc,
                        option : option,
                        required : required
                    },
                    isNew : true,
                    item : {
                        description : itemDescription,
                        name : itemName,
                        price : itemPrice
                    },
                    itemDate : itemDate,
                    leastFeed : leastFeed,
                    mainImageUrl : mainImageUrl.name,
                    maintain : maintain,
                    selectionDate : selectionDate,
                    uploadDate : uploadDate,             
            });

            set(ref(realtimeDbService, `campaigns/${campaignTitle}`), {
                campaignTitle : campaignTitle,
                brandInstagram : brandInstagram,
                brandName : brandName,
                recruitingDate : recruitingDate,
                dueDate : dueDate,
                recruitingNumber : recruitingNumber,
                brandUuid : uid,
                guides : [{
                    description : guideDescription,
                    imageUrl : [...guideImageUrls.name]
                }],
            
                hashTags : {
                    ftc : ftc,
                    option : option,
                    required : required
                },
                isNew : true,
                item : {
                    description : itemDescription,
                    name : itemName,
                    price : itemPrice
                },
                itemDate : itemDate,
                leastFeed : leastFeed,
                mainImageUrl : mainImageUrl.name,
                maintain : maintain,
                selectionDate : selectionDate,
                uploadDate : uploadDate,
            });
        } catch (error) {
            console.log(error.message);
        }
    }



    return (
        <CampaignAdminContainerCSS>
            <h1>Fieldby Business Suite Admin</h1>
            <input type="text" placeholder="회사 uid" onChange={(e) => {
                setUid(e.target.value);
            }} />
            <input type="text" placeholder="캠페인 제목" onChange={(e) => {
                setCampaignTitle(e.target.value);
            }} />
            <input type="text" placeholder="브랜드 인스타" onChange={(e) => {
                setBrandInstagram(e.target.value);
            }} />
            <input type="text" placeholder="브랜드 이름" onChange={(e) => {
                setBrandName(e.target.value);
            }} />

            <span>캠페인 시작 기한</span>
            <input type="date" placeholder="캠페인 시작 기한" onChange={(e) => {
                setRecruitingDate(e.target.value);
            }} />

            <span>캠페인 만료 기한</span>
            <input type="date" placeholder="캠페인 만료 기한" onChange={(e) => {
                setDueDate(e.target.value);
            }} />

            <input type="text" placeholder="모집인원" onChange={(e) => {
                setRecruitingNumber(e.target.value);
            }}/>

            <input type="text" placeholder="해시태그 ftc" onChange={(e) => {
                setFtc(e.target.value);
            }} />
            <input type="text" placeholder="해시태그 option" onChange={(e) => {
                setOption(e.target.value);
            }} />
            <input type="text" placeholder="해시태그 required" onChange={(e) => {
                setRequired(e.target.value);
            }} />
            <input type="text" placeholder="아이템 설명" onChange={(e) => {
                setItemDescription(e.target.value);
            }} />
            <input type="text" placeholder= "아이템 이름" onChange={(e) => {
                setItemName(e.target.value);
            }} />
            <input type="text" placeholder="아이템 가격" onChange={(e) => {
                setItemPrice(e.target.value);
            }} />

            <span>아이템 날짜</span>
            <input type="date" placeholder="아이템 날짜" onChange={(e) => {
                setItemDate(e.target.value);
            }} />
            <input type="text" placeholder="최소 피드" onChange={(e) => {
                setLeastFeed(e.target.value);
            }} />
            <input type="text" placeholder="유지" onChange={(e) => {
                setMaintain(e.target.value);
            }} />

            <span>선택 날짜</span>
            <input type="date" placeholder="선택 날짜" onChange={(e) => {
                setSelectionDate(e.target.value);
            }} />

            <span>업로드 날짜</span>
            <input type="date" placeholder="업로드 날짜" onChange={(e) => {
                setUploadDate(e.target.value);
            }} />

            <div className="main-image-input">
                <h3>메인 이미지</h3>
                <input type="file" onChange={handleChange} accept="/image/*" />
                <button onClick={handleMainImageUpload}>메인 이미지 업로드</button>
                <p>{percent}%</p>
            </div>

            
            <div className="guide-image-input">
                <label htmlFor="input-file" className="add-btn" onChange={handleGuideChange}>
                    <h3>가이드 이미지</h3>
                    <input type="file" accept="images/*" multiple name="guideimages[]"/>
                    <input type="text" placeholder="사진 설명" onChange={(e) => {
                        setGuideDescription(e.target.value);
                    }}/>
                </label>

                {guideImageUrls.map((image, id) => (
                    <div className="guide-image-preview-container" key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                    </div>
                ))}
                <button onClick={handleGuideImageUpload}>가이드 이미지 업로드</button>
                <p>{guidePercent}%</p>
            </div>
            
        
            <button onClick={registerCampaign}>캠페인 등록하기</button>
        </CampaignAdminContainerCSS>
    )
}

const CampaignAdminContainerCSS = styled.div`
    display : grid;
    align-items : center;
    justify-content : center;
    input {
        width : calc(100%);
        
    }
    button {
        margin-top : 20px;
        width : calc(100%);
    }

    .main-image-input {
        margin-top : 60px;
    }

    .guide-image-preview-container {
        display : flex;
        img {
            height : 250px;
            width : 250px;
        }
        
    }
`

export default CampaignAdmin;