import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Rate } from "antd";
import PropTypes from "prop-types";

export default function ReviewComment({
  userName,
  userImage,
  date,
  rating,
  comment,
}) {
  return (
    <Container>
      <Section>
        <UserImage>
          <img src={userImage} alt="계정 이미지"></img>
        </UserImage>
        <Content>
          <div>
            <h5>{userName}</h5>
            <p>{date}</p>
          </div>
          <RatingBox>
            <Rate allowHalf defaultValue={rating} disabled />
          </RatingBox>
          <CommentBox>
            <p>{comment}</p>
          </CommentBox>
        </Content>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 15px 0 rgb(2 59 109 / 20%);
  padding: 1rem;
`;

const Section = styled.div`
  display: flex;
`;

const UserImage = styled.div`
  > img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: none;
  }
`;
const Content = styled.div`
  width: 100%;
  margin: 0 1rem;
  > :nth-child(1) {
    display: flex;
    align-items: center;
    > h5 {
      font-size: 1rem;
      font-weight: 800;
    }
    > p {
      font-size: 0.8rem;
      font-weight: 600;
      color: black;
      padding: 0 15px;
    }
  }
`;
const RatingBox = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
`;

const CommentBox = styled.div`
  margin: 1rem 0;
`;

ReviewComment.propTypes = {
  userName: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
};
