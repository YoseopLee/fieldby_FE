import React from "react";
import styled from 'styled-components';

const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,detailaddress }) => {
    return (
        <CampaignResultDetailCSS>
            <div className="selected-datas">
                <div className="selected-data">
                    <span>{id}</span>
                </div>
                <div className="selected-data-profile">
                    <img className="selected-user-profile" src={profile} alt="profile" />
                    <span className="selected-username">{name}</span>
                </div>
                <div className="selected-data">
                    <span>{phoneNumber}</span>
                </div>
                <div className="selected-data-address">
                    <div>우편번호 <span>{zipno}</span></div>
                    <span>{detailaddress}</span>
                    <div>
                    <select name="shipment_name" className="shipment-names">
                        <option value="">택배사 선택</option>
                        <option value="CJ대한통운">CJ대한통운</option>
                    </select>
                    </div>
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
    justify-content : space-evenly;
    align-items : center;
    .selected-data {
        span {
            color : #766F6F;
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            text-align : center;
        }
    }
    .selected-data-profile {
        display : flex;
        align-items : center;
        .selected-user-profile {
            margin-left : 16px;
            margin-right : 16px;
            border-radius : 50%;
            width : 65px;
            height : 65px;
        }
        .selected-username {
            font-size : 15px;
            font-weight : 700;
        }
    }
    .selected-data-address {
        color : #766F6F;
        font-size : 15px;
        line-height :18px;
    }
}
`

export default CampaignResultDetail;