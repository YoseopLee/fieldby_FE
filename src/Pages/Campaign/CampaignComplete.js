import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CampaignComplete = () => {

    const [userDatas, setUserDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const userArrays = [];

    useEffect(() => {
        
    }, [])

    return (
        <CampaignCompleteCSS>
            <span className="campaign-complete-title">완료 포스팅</span>
            <div className="campaign-complete-posts-wrapper">
                <h3>오픈 예정입니다.</h3>
            </div>
        </CampaignCompleteCSS>
    )
}

const CampaignCompleteCSS = styled.div`
    margin-top : 40px;
    padding-left : 120px;
    padding-right : 120px;
    .campaign-complete-title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        color : #303030;
        margin-bottom : 60px;
    }
    .campaign-complete-posts-wrapper {

    }
`

export default CampaignComplete;