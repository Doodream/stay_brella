import React from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';

import { Button } from 'antd';

export default function Banner() {

    return (
        <Container>
            <BannerImage>
                <img src='/home/bannerImage.png' alt="배너이미지"></img>
            </BannerImage>
            <BannerTitle>
                <span className="subTitle">Space to protect when it rains</span>
                <span className="mainTitle">Stay in Your Brella</span>
            </BannerTitle>
            <Link href='/product'>
                <a>
                    <BannerButton><p>Choose your Brella</p></BannerButton>
                </a>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin: 40px 0px;
`
const BannerImage = styled.div`
    width: 80%;
    height: 300px;
    > img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
`

const BannerTitle = styled.div`
    position: absolute;
    top: 13%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    text-align: center;
    flex-direction: column;
    color: white;
    .subTitle {
        font-size : 18px;
    }
    .mainTitle{
        font-size : 35px;
        margin-top: 10px;
        font-weight: 800;
    }
`

const BannerButton = styled(Button)`
    
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    border: none;
    color: white;
    background: #E84D3C;
    >p{
        font-weight: 800;
        font-size: 20px;
    }
`
