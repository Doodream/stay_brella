import React from 'react';
import Link from 'next/link';
import 'antd/dist/antd.css';
//import AuthContext from '../../../contexts/Auth/AuthContext'
import { Button, Menu, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import styled from 'styled-components';

export default function Header() {
    const isAuthenticated = true;
    // const { authUser, logout, isAuthenticated, homeRedirect } = React.useContext(AuthContext);
    // const [ishoverList, setIshoverList] = React.useState(false);

    // const hoverListStatus = () => {
    //     setVisible((prev) => !prev);
    // }

    const menu = (
        <MyPageMenu>
            <MyPageMenuItem >
                <Link href='/account/myPage/myinfo'>
                    <a>
                        <UserOutlined />
                        <h5>내 정보</h5>
                    </a>
                </Link>
            </MyPageMenuItem>
            <MyPageMenuItem  >
                <a>
                    <LogoutOutlined />
                    <h5>로그아웃</h5>
                </a>
            </MyPageMenuItem>
        </MyPageMenu>
    );

    return (
        <Container>
            <Link href='/'>
                <HeaderLogo>
                    <img src="/layout/staybrella 타이틀로고.png" alt="스테이브렐라 로고"></img>
                    <h3> StayBrella </h3>
                </HeaderLogo>
            </Link>
            {
                isAuthenticated ?
                    <HeaderAccount>
                        <a className="myPage"><h3> 마이페이지 </h3></a>
                        <Divider />
                        <MyPageDropdown overlay={menu}
                            onClick={e => e.preventDefault()}
                            placement="bottomRight"
                            arrow
                        >
                            <img src='/layout/staybrella 타이틀로고.png' alt="계정 이미지"></img>
                        </MyPageDropdown>
                    </HeaderAccount> :
                    <HeaderAccount>
                        <Link href='/account/login'>
                            <a><h3>로그인</h3></a>
                        </Link>
                        <Divider />
                        <Link href='/account/signup'>
                            <a><h3>회원가입</h3></a>
                        </Link>
                    </HeaderAccount>
            }
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
    .myPage {
        cursor: default;
    }
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

const MyPageDropdown = styled(Dropdown)`
    width: 40px;
    display: flex;
    justify-content: center;
    > img {
        width: 30px;
        height: 30px;
        border-radius: 50%
    }
`
const MyPageMenu = styled(Menu)`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        /* position: fixed;
        right: 5px;
        top: 85px; */
        /* width: 15%; */
        width: 200px;
        background: white;
        border-radius: 10px;
        
`

const MyPageMenuItem = styled(Menu.Item)`
    > a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-decoration: none;
            padding: 10px 15px;
            color: black;
            text-align : center;
            > h5 {
                padding-left: 10px;
                font-size: 15px;
                
            };
            > span {
                    > svg {
                        width: 20px;
                        height: 20px;
                    }
             };
        }
`
