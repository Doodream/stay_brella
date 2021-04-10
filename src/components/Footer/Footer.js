import React from 'react';
import Link from 'next/link'

import 'antd/dist/antd.css';
import styled from 'styled-components';

import { Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, CaretRightOutlined } from '@ant-design/icons';

export default function Footer() {
    return (
        <Container>
            <Section>
                <FooterInfo>
                    <Link href='/'>
                        <HeaderLogo>
                            <img src="/layout/staybrella 타이틀로고.png" alt="스테이브렐라 로고"></img>
                            <h3> StayBrella </h3>
                        </HeaderLogo>
                    </Link>

                    <FooterInfoText>StayBrella | 대표 : 노두현 TEL : 010-3553-8916 카카오톡 : rhomo17</FooterInfoText>
                    <FooterInfoText>COPYRIGHT (c) 2021 ALL RIGHT RESERVED StayBrella</FooterInfoText>
                    <FooterSnsList>
                        <a href='https://www.facebook.com/tooravel/' target='_blank'><FacebookOutlined /></a>
                        <a href='https://www.instagram.com/tooravel/' target='_blank'><InstagramOutlined /></a>
                        <a href='https://blog.naver.com/tooravel' target='_blank'><h3>N</h3></a>
                    </FooterSnsList>
                </FooterInfo>
                <FooterMenu>
                    <FooterMenuList>
                        <FooterMenuTitle level={5}>Company</FooterMenuTitle>
                        <Link href='/about/intro'><a><CaretRightOutlined /> About</a></Link>
                    </FooterMenuList>
                    <FooterMenuList>
                        <FooterMenuTitle level={5}>Contact</FooterMenuTitle>
                        <Link href='/about/contact'><a><CaretRightOutlined /> Location</a></Link>
                        <a href='mailto:doodream17@naver.com'><CaretRightOutlined /> Email</a>
                    </FooterMenuList>
                </FooterMenu>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    bottom: 0px;
    height: 500px;
    width: 100%;
    background: white;
`

const Section = styled.div`
    margin-left: auto;
    margin-right: auto;
    bottom: 0px;
    width: 90%;
    height: 100%;
    display: flex;
`
const FooterMenu = styled.ul`
    justify-content: flex-end;
    display: flex;
    width: 100%;

`
const FooterMenuList = styled.div`
    width: 30%;
    margin-top : 40px;
    margin-left: 40px;
    justify-content: start;
    flex-direction: column;
    > a {
        padding: 10px 10px 10px 0px;
        display: flex;
        align-items : center;
        text-decoration: none;
        color: #34495e;
        text-align: center;
       
    }
`

const FooterMenuTitle = styled.span`
    align-items: center;
    text-align: center;
    color: black;
    font-size : 25px;
    font-weight : 600;
`

const FooterSnsList = styled.ul`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 0px;
    > a {
        margin: 15px;
        text-decoration: none;
        display: flex;
        align-items : center;
        > span{
            
            > svg {
            height: 30px;
            width: 30px;
            color: #34495e;
            };
        }
        > h3 {
        margin: 0px;
        font-size: 30px;
        color: #34495e;
        }
    };
    
`

const FooterInfo = styled.div`
    margin-top:40px;
    display: flex;
    flex-direction: column;

`

const FooterInfoText = styled.span`
    color: black;
    margin-top: 5px;
`
const HeaderLogo = styled.a`
    padding: 0px;
    display: flex;
    text-decoration: none;
    align-items: center;
    padding-left: 10px;
    > img {
        width: 32.25px;
        height: 32.25px;
    };
    > h3 {
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 15px;
        font-size: 30px;
        color: #34495e;
    };
`;