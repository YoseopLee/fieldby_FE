import React from "react";
import styled from 'styled-components';

const CampaignResultDetail = ({name, profile, phoneNumber, zipno,detailaddress }) => {
    return (
        <CampaignResultDetailCSS>
            <div className="selected-datas">
                <div className="selected-data">
                    <img className="selected-user-profile" src={profile} alt="profile" />
                    <span>{name}</span>
                </div>
                <div className="selected-data">
                    <span>{phoneNumber}</span>
                </div>
                <div className="selected-data-address">
                    <span>우편번호</span><span>{zipno}</span>
                    <span>{detailaddress}</span>
                </div>
                <div className="selected-data">
                    <span>000000001</span>
                </div>
            </div>
        </CampaignResultDetailCSS>
    )
}

const CampaignResultDetailCSS = styled.div`
.selected-datas {
    display : flex;
    justify-content : space-around;
    align-items : center;
    .selected-data {
        .selected-user-profile {
            margin-left : 16px;
            border-radius : 50%;
            width : 65px;
            height : 65px;
        }
        span {
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            text-align : center;
        }
    }
}
`

export default CampaignResultDetail;