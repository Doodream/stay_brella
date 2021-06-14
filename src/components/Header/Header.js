import React from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import AuthContext from "contexts/Auth/AuthContext";
import { Menu, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Logo from "components/Logo/Logo";

export default function Header() {
  const { authUser, logout, isAuthenticated } = React.useContext(AuthContext);
  const [userImage, setUserImage] = React.useState(authUser.image);

  React.useEffect(() => {
    setUserImage(authUser.image);
  }, [authUser]);

  const menu = (
    <MyPageMenu>
      <MyPageMenuItem>
        <Link href="/account/myPage/myinfo">
          <a>
            <UserOutlined />
            <h5>내 정보</h5>
          </a>
        </Link>
      </MyPageMenuItem>
      <MyPageMenuItem onClick={logout}>
        <a>
          <LogoutOutlined />
          <h5>로그아웃</h5>
        </a>
      </MyPageMenuItem>
    </MyPageMenu>
  );

  return (
    <div>
      <Container>
        <Logo />
        {isAuthenticated ? (
          <HeaderAccount>
            <a className="myPage">
              <h3> Mypage </h3>
            </a>
            <MyPageDropdown
              overlay={menu}
              onClick={(e) => e.preventDefault()}
              placement="bottomRight"
              arrow
            >
              <img src={userImage} alt="계정 이미지" />
            </MyPageDropdown>
          </HeaderAccount>
        ) : (
          <HeaderAccount>
            <Link href="/account/login">
              <a>
                <h3>Login</h3>
              </a>
            </Link>
            <Link href="/account/signup">
              <a>
                <h3>Signup</h3>
              </a>
            </Link>
          </HeaderAccount>
        )}
      </Container>
      <div style={{ marginTop: "80px" }}></div>
    </div>
  );
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
  top: 0px;
`;

const HeaderAccount = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  > a {
    text-decoration: none;
    color: black;
    margin-right: 20px;
  }
  .myPage {
    cursor: default;
  }
  > img {
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 50%;
  }
`;

const MyPageDropdown = styled(Dropdown)`
  width: 40px;
  display: flex;
  justify-content: center;
`;
const MyPageMenu = styled(Menu)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 200px;
  background: white;
  border-radius: 10px;
`;
const MyPageMenuItem = styled(Menu.Item)`
  > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 10px 15px;
    color: black;
    text-align: center;
    > h5 {
      padding-left: 10px;
      font-size: 15px;
    }
    > span {
      > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
