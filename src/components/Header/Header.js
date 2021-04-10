import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export default function Header() {

    return (
        <Container>
            <Link href='/'>
                <HeaderLogo>
                    <img src="/layout/staybrella 타이틀로고.png" alt="스테이브렐라 로고"></img>
                    <h3> StayBrella </h3>
                </HeaderLogo>
            </Link>
            <HeaderAccount>
                <Link href='/account/login'>
                    <a><h3>로그인</h3></a>
                </Link>
                <Divider />
                <Link href='/account/signup'>
                    <a><h3>회원가입</h3></a>
                </Link>
            </HeaderAccount>
        </Container>
    )
}

const Container = styled.div`
    opacity: 0.8;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 300;
`;

const HeaderAccount = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    > a {
        text-decoration: none;
        color: black;
    };
`;

const Divider = styled.div`
    height: 20px;
    border-right: 1.5px solid black;
    margin: 0px 5px;
`;


const HeaderLogo = styled.a`
    display: flex;
    text-decoration: none;
    align-items: center;
    padding-left: 20px;
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