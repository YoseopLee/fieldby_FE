import React, { useState } from "react";
const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,roadaddress, detailaddress, shipment_name, shipment_number, getShipInfo }) => {
    const [shipName, setShipName] = useState('');
    const [shipNumber, setShipNumber] = useState('');

    
    getShipInfo(shipName, shipNumber)
    
        
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
                        {shipment_name ? (
                            <select name="shipment_name" value={shipment_name} className="shipment-names" onChange={(e) => {
                                setShipName(e.target.value);
                            }}> 
                                <option value="">택배사 선택</option>
                                <option value="CJ대한통운">CJ대한통운</option>
                                <option value="우체국">우체국</option>
                                <option value="한진택배">한진택배</option>
                                <option value="로젠택배">로젠택배</option>
                                <option value="롯데택배">롯데택배</option>
                                <option value="경동택배">경동택배</option>
                                <option value="일양택배">일양택배</option>
                            </select>
                        ) : (
                            <select name="shipment_name" className="shipment-names" onChange={(e) => {
                                setShipName(e.target.value);
                            }}>
                                <option value="">택배사 선택</option>
                                <option value="CJ대한통운">CJ대한통운</option>
                                <option value="우체국">우체국</option>
                                <option value="한진택배">한진택배</option>
                                <option value="로젠택배">로젠택배</option>
                                <option value="롯데택배">롯데택배</option>
                                <option value="경동택배">경동택배</option>
                                <option value="일양택배">일양택배</option>
                            </select>
                        )}                        
                    </div>                    
                </td>
                <td className="selected-data-post">
                    {shipment_number ? (
                        <input type='text' className="table-input" onChange={(e) => {
                            <span>{shipment_number}</span>
                        }}/>
                    ) : (
                        <input type='text' placeholder="배송장번호" className="table-input" onChange={(e) => {
                            setShipNumber(e.target.value);
                        }}/> 
                    )}                   
                </td>
            </tr>        
    )
}

export default CampaignResultDetail;