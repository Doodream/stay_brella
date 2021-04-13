import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, Divider, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter, withRouter } from 'next/router';
import AddToCart from '../Cart/AddToCart';
import { Fetch } from '../../../../utils/Fetch';
import AuthContext from '../../../../contexts/Auth/AuthContext';
import { useForm } from 'react-hook-form';

export default function Review(id) {
    const productId = id;
    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [isHiddenQA, setIsHiddenQA] = useState(false);
    const [isHiddenReview, setIsHiddenReview] = useState(false);
    const [reviews, setReviews] = useState([]);

    const { isAuthenticated, authUser, uploadReview } = React.useContext(AuthContext);

    const getReviews = () => {
        return Fetch.post('/api/download/reviews', {
            productId: productId
        }).then(res => {
            //console.log(res);
            setReviews(res);
        }).catch(err => {
            message.error(err);
        })
    }

    const addReview = data => {
        //userName, userImage를 context에서 
        if (!isAuthenticated) {
            message.erroralert("Please Log in 🙏");
            return
        }
        // user 정보를 상위 컴포넌트에서 가져오자 에러 나면
        var newReview = {
            userName: authUser.name,
            userImage: authUser.image,
            date: date(),
            rating: rating,
            comment: data.comment,
            id: productId
        }

        uploadReview(newReview);
        reset();
        setRating(0)
    }

    useEffect(() => {
        getReviews();
    }, [reviews])

    return (
        <div>
            <ReviewCount>Review {reviews.length}</ReviewCount>
            {
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
            }
            <Box className={classes.productViewMoreButton}>
                <Button onClick={() => {
                    isHiddenReview ? setIsHiddenReview(false) : setIsHiddenReview(true);
                }}><KeyboardArrowDownIcon /> 더보기</Button>
            </Box>
            <form
                onSubmit={handleSubmit(addReview)}
                className={classes.productReview}>
                <span>이미 사용해 보셨나요? 리뷰를 남겨주세요!</span>
                <Box className={classes.productRatingReview}>
                    <Box
                        component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            className={classes.productRatingStar}
                            name='rating'
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Box>
                </Box>
                <TextField
                    {...register("comment")}
                    name='comment'
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    variant="outlined"
                />
                <Button
                    htmlType='submit'
                >리뷰 제출 하기</Button>
            </form>
        </div>

    )
}

const ReviewCount = styled.span`
    font-size: 1.3rem;
`