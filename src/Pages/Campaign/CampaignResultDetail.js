import React from "react";
const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,roadaddress, detailaddress }) => {

    return (        
            <tr className="campaign-progress-table">
                <td className="selected-data-number">                    
                    <span>{id}</span>                    
                </td>
                <td className="selected-data-name">    
                    <div className="selected-data-profile">                
                        <img className="selected-user-profile" src={profile} alt="profile" />
                        <span className="selected-username">{name}</span>
                    </div>                    
                </td>
                <td className="selected-data-phone">
                    
                    <span>{phoneNumber.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")}</span>
                    
                </td>
                <td className="selected-data-address">                    
                    <div className="address-wrapper">
                        <div className="address-flex-box">
                            <div><span>우편번호</span> <span>{zipno}</span></div>
                            <span>{roadaddress}</span>
                            <span>{detailaddress}</span>
                        </div>                        
                        <select name="shipment_name" className="shipment-names">
                            <option value="">택배사 선택</option>
                            <option value="CJ대한통운">CJ대한통운</option>
                        </select>
                    </div>                    
                </td>
                <td className="selected-data-post">                    
                    <input type='text' placeholder="배송장번호" className="table-input"/>                    
                </td>
            </tr>        
    )
}

export default CampaignResultDetail;