import React from "react";
import styled from "styled-components";

const CampaignReport = () => {
    return (
        <CampaignReportCSS>
            <div className="report-container">총 도달 수</div>
            <div className="report-container"></div>
            <div className="report-container"></div>
            <div className="report-container"></div>
            <div className="report-container"></div>
            <div className="report-container"></div>
        </CampaignReportCSS>
    )
}

const CampaignReportCSS = styled.div`
    padding : 20px;
    display : grid;
    gap : 20px;
    grid-template-columns: 250px 170px;
	grid-template-rows: 140px 200px;
    .report-container {
        background : #fff;
        box-shadow : 2px 2px 10px rgba(0,0,0, 0.07);
        border-radius : 5px;
        
    }
    .report-container:nth-child(1) {
        width : 200px;
        height : 200px;
    }
    .report-container:nth-child(2) {
        width : 250px;
        height : 150px;
    }
    .report-container:nth-child(3) {
        width : 100px;
        height : 300px;
    }
    .report-container:nth-child(4) {
        width : 50px;
        height : 200px;
    }
    .report-container:nth-child(5) {
        width : 200px;
        height : 120px;
    }
    .report-container:nth-child(6) {
        width : 100px;
        height : 200px;
    }
`

export default CampaignReport;