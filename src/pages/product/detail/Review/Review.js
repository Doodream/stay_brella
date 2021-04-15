import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, message, Input, Rate } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Fetch } from 'utils/Fetch';
import AuthContext from 'contexts/Auth/AuthContext';
import ReviewComment from 'pages/product/detail/Review/ReviewComment';
import { useForm } from 'react-hook-form';

const { TextArea } = Input;

export default function Review({ id }) {
    const product = id;
    const { handleSubmit } = useForm();
    const [rating, setRating] = useState(0);
    const [isHiddenReview, setIsHiddenReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('user')) : null);
    const [comment, setComment] = useState("");
    const { isAuthenticated } = React.useContext(AuthContext);

    const getReviews = () => {
        return Fetch.post('/api/download/reviews', {
            product: product
        }).then(res => {
            setReviews(res.sort((a, b) => b.keyId - a.keyId));
        }).catch(err => {
            message.error(res.message);
            console.log(err);
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
        if (!isAuthenticated) {
            message.error("Please Log in 🙏");
            return
        }

        Fetch.post('/api/upload/review', {
            'name': user.name,
            'image': user.image,
            'date': date(),
            'rating': rating,
            'comment': comment,
            'product': product,
            'keyId': Date.now()          //key값은 시간으로 주고 유니크로 받자
        }).then(res => {
            res.reviewSave ? message.success(res.message) : consolo.log(res.message);
            return res;
        }).then((res) => {
            getReviews()
        }).catch(err => alert(err));
        setComment("");
        setRating(0);
    }

    useEffect(() => {
        getReviews();
    }, [])

    return (
        <div>
            <ReviewCount> {reviews.length} Review</ReviewCount>
            <div style={{ margin: '1rem 0' }}>
                {
                    isHiddenReview ? reviews.map((review, index) => {
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
                    }) : reviews.slice(0, 3).map((review, index) => {
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
                <ViewMoreBox>
                    {
                        isHiddenReview ?
                            <button onClick={() => setIsHiddenReview(false)}>
                                <CaretUpOutlined />View Reduce
                            </button> :
                            <button onClick={() => setIsHiddenReview(true)}>
                                <CaretDownOutlined />View More
                            </button>
                    }
                </ViewMoreBox>
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
                <SubmitButton htmlType='submit'>
                    Submit
                </SubmitButton>
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