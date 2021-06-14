import React from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import styled from "styled-components";

export default function Logo() {
  return (
    <Link href="/">
      <HeaderLogo>
        <img
          src="/layout/staybrella 타이틀로고.png"
          alt="스테이브렐라 로고"
        ></img>
        <h3> StayBrella </h3>
      </HeaderLogo>
    </Link>
  );
}

const HeaderLogo = styled.a`
  padding: 0px;
  display: flex;
  text-decoration: none;
  align-items: center;
  padding-left: 10px;
  > img {
    width: 32.25px;
    height: 32.25px;
  }
  > h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 15px;
    font-size: 30px;
    color: #34495e;
  }
`;
