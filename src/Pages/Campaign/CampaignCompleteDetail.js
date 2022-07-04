import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CampaignCompleteDetail = ({igname, followers, token, postImageUrl}) => {

    const [postImage, setPostImage] = useState('');
    const [postComments, setPostComments] = useState('');
    const [postLikes, setPostLikes] = useState('');

    useEffect(() => {
        const getPostDatas = async() => {
            try {
                const json1 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=media_url&access_token=${token}`
                );

                const json2 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=comments_count&access_token=${token}`
                )

                const json3 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=like_count&access_token=${token}`
                )
                console.log(json1.data);
                setPostImage(json1.data.media_url);
                setPostComments(json2.data.comments_count);
                setPostLikes(json3.data.like_count);
            } catch (error) {
                console.log(error);
            }
        }
        getPostDatas();
    },[])

    return (
        <CampaignCompleteDetailCSS>
            <span>
                {igname}, {followers}
            </span>
            <div>
                <img src={postImage} alt="posted" /><br/>
                <span>{postComments}</span><br/>
                <span>{postLikes}</span>
            </div>
        </CampaignCompleteDetailCSS>
    )
}

const CampaignCompleteDetailCSS = styled.div`

`

export default CampaignCompleteDetail;