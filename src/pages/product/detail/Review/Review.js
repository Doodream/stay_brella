import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, Divider, message, Input, Rate } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useRouter, withRouter } from 'next/router';
import AddToCart from '../Cart/AddToCart';
import { Fetch } from '../../../../utils/Fetch';
import AuthContext from '../../../../contexts/Auth/AuthContext';
import ReviewComment from '../Review/ReviewComment';
import { useForm } from 'react-hook-form';

const { TextArea } = Input;
export default function Review({ id }) {
    const productId = id;
    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [isHiddenQA, setIsHiddenQA] = useState(false);
    const [isHiddenReview, setIsHiddenReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : null);
    const [comment, setComment] = useState("");
    const { isAuthenticated, authUser, uploadReview } = React.useContext(AuthContext);

    const getReviews = () => {
        return Fetch.post('/api/download/reviews', {
            productId: productId
        }).then(res => {
            console.log(res, "GetReviews");
            setReviews(res);
        }).catch(err => {
            message.error(err);
        })
    }

    const date = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        return (year + '-' + month + '-' + date);
    }

    const addReview = data => {
        //userName, userImage를 context에서 
        if (!isAuthenticated) {
            message.error("Please Log in 🙏");
            return
        }
        // user 정보를 상위 컴포넌트에서 가져오자 에러 나면
        var newReview = {
            userName: user.name,
            userImage: user.image,
            date: date(),
            rating: rating,
            comment: comment,
            productId: productId
        }

        console.log(newReview, "in addReview");
        uploadReview(newReview);
        //getReviews();
        setComment("");
        setRating(0);
    }

    useEffect(() => {
        getReviews();
    }, [])

    useEffect(() => {
        console.log(rating, "Chnage rating");
    }, [rating])

    return (
        <div>
            <ReviewCount> {reviews.length} Review</ReviewCount>
            <div style={{ margin: '1rem 0' }}>
                {
                    reviews.length !== 0 ??
                        isHiddenReview ? reviews.reverse().map((review, index) => {
                            return (
                                <ReviewComment
                                    key={index}
                                    userName={review.name}
                                    userImage={review.image}
                                    date={review.date}
                                    rating={review.rating}
                                    comment={review.comment}
                                />
                            )
                        }) : reviews.slice(reviews.length - 3, reviews.length).reverse().map((review, index) => {
                            return (
                                <ReviewComment
                                    key={index}
                                    userName={review.name}
                                    userImage={review.image}
                                    date={review.date}
                                    rating={review.rating}
                                    comment={review.comment}
                                />
                            )
                        })
                }{
                    isHiddenReview ?
                        <ViewMoreBox>
                            <button onClick={() => setIsHiddenReview(false)}><CaretDownOutlined />View more</button>
                        </ViewMoreBox> :
                        <ViewMoreBox>
                            <button onClick={() => setIsHiddenReview(true)}><CaretUpOutlined />View Reduce</button>
                        </ViewMoreBox>
                }
            </div>
            <ReviewForm
                onSubmit={handleSubmit(addReview)}>
                <span>Did you buy it? Please leave a valuable review </span>
                <RatingBox>
                    <Rate allowHalf value={rating} onChange={setRating} />
                </RatingBox>
                <Comment
                    name='comment'
                    onChange={e => setComment(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    value={comment}
                    placeholder="Thank you for your purchase. Please leave a good review. We will repay you with good quality. 👍"
                />
                <SubmitButton
                    htmlType='submit'

                >Submit</SubmitButton>
            </ReviewForm>
        </div>

    )
}

const ReviewCount = styled.span`
    font-size: 1.3rem;
`
const ViewMoreBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    border: none;
    margin: 2rem auto 2rem 0;
    > button { 
        border: none;
        border-radius: 2px;
        background: #344A5E;
        color: white;
        > svg {
            color: white;
        }
        :hover{
            background: black;
        }
    }
`

const RatingBox = styled.div`
    padding: 1rem 0;
    display: flex;
    align-items: center;
`
const Comment = styled(TextArea)`
    width: 100%;
    background: white;
`
const SubmitButton = styled(Button)`
    border: none;
    background: #344A5E;
    color: white;
    margin: 2rem auto 2rem 0;
`
const ReviewForm = styled.form`
`