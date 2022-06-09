import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CampaignList = ({id, campaignTitle, recruitingDate, dueDate,recruitingNumber}) => {
    return (
        <CampaignListContainer>
            <Link to = {`/campaign/${id}/progress`} className="campaign-list"> 
            <div className="campaign-datas">
                <div className="campaign-data">
                    <span className="progress">진행중</span>
                </div>
                <div className="campaign-data">
                    <span>{id}</span>
                </div>
                <div className="campaign-data">
                    <span>{campaignTitle}</span>
                </div>
                <div className="campaign-data">
                    <span>{recruitingDate} - {dueDate}</span>
                </div>
                
                <div className="campaign-data">
                    <span>{recruitingNumber}</span>
                </div>
            </div>
            <hr />
            </Link>
        </CampaignListContainer>
    )
}

const CampaignListContainer = styled.div`
    
    .campaign-list {   
        text-decoration : none;
        color : #000000;
        .campaign-datas {
            display : flex;
            justify-content : space-evenly;
            align-items : center;
            height : 60px;
            .campaign-data {
                .progress {
                    color : #22BAA8;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                }
                span {
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    text-align : center;
                }
            }
        }
        
    }
`

export default CampaignList;