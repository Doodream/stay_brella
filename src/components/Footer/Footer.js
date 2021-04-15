import React from 'react';
import Link from 'next/link'
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { FacebookOutlined, InstagramOutlined, CaretRightOutlined } from '@ant-design/icons';
import Logo from "components/Logo/Logo";

export default function Footer() {
    return (
        <Container>
            <Section>
                <FooterInfo>
                    <Logo />
                    <FooterInfoText>StayBrella | 대표 : 노두현 TEL : 010-3553-8916 카카오톡 : rhomo17</FooterInfoText>
                    <FooterInfoText>COPYRIGHT (c) 2021 ALL RIGHT RESERVED StayBrella</FooterInfoText>
                    <FooterSnsList>
                        <a href='https://m.facebook.com/rhodoohyun' target='_blank'><FacebookOutlined /></a>
                        <a href='https://www.instagram.com/' target='_blank'><InstagramOutlined /></a>
                        <a href='https://doodreamcode.tistory.com/' target='_blank'><img src="/home/티스토리.png"></img></a>
                        <a href='https://velog.io/@doodream' target='_blank'><img src="/home/velog.jpeg"></img></a>
                    </FooterSnsList>
                </FooterInfo>
                <FooterMenu>
                    <FooterMenuList>
                        <FooterMenuTitle level={5}>Company</FooterMenuTitle>
                        <a href='https://github.com/Doodream' target='_blank'><CaretRightOutlined /> Github</a>
                    </FooterMenuList>
                    <FooterMenuList>
                        <FooterMenuTitle level={5}>Contact</FooterMenuTitle>
                        <a href='https://www.notion.so/doodream17/84c9d2322cc44f4bbf9ecb4ca072399c' target='_blank'><CaretRightOutlined />Introduce</a>
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
    height: 300px;
    width: 100%;
    background: white;
    border-top: 1px solid #f1f2f6;
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
    width: 65%;

`
const FooterMenuList = styled.div`
    width: 20%;
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
        :hover {
            color: #487eb0;
        }
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
            :hover{
                color: #487eb0;
            }
            };
        }
        > img {
        margin: 0px;
        width: 30px;
        height: 30px;
        color: #34495e;
        :hover{
                color: #487eb0;
            }
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
