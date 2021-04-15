import React, { useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, message, Divider, Input, Form } from 'antd';
import { useForm } from "react-hook-form";
import AuthContext from 'contexts/Auth/AuthContext';
import KaKaoLogin from 'react-kakao-login';
import Container from 'components/Container/Container';
import Layout from 'components/Layout/Layout';
import { StyleButton, StyleLabel } from "components/atoms/StyleAtoms/StyleAtoms"

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function Signup({ history }) {

    const [emailEntered, setEmailEntered] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isReEnterPasswordValid, setIsReEnterPasswordValid] = useState(false);

    const { signUp, kakaoSignUp, isAuthenticated } = React.useContext(AuthContext);
    const { handleSubmit, register, setValue } = useForm({ reValidateMode: 'onBlur' });

    const styleKakaoLogin = {
        marginLeft: '20px',
        cursor: 'pointer',
        textTransform: 'none',
        width: '70px',
        height: '32px',
        padding: '4px 15px',
        border: '1px solid transparent',
        color: 'rgba(0, 0, 0, 0.85)',
        touchAction: 'manipulation',
        boxShadow: '0 2px 0 rgb(0 0 0 / 2%)',
        transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
        fontSize: '14px',
        textAlign: 'center',
        background: '#FEE100',
        marginBottom: '20px',
        fontWeight: '400',
        borderRadius: '2px',
        '& svg': {
            width: '1em',
            height: '1em',
            marginRight: 5
        },
    }

    React.useEffect(() => {
        if (isAuthenticated) {
            alert('로그인 상태입니다.')
            history.push('/')
        }
    }, []);

    const onSubmit = data => isEmailValid && isPasswordValid && isReEnterPasswordValid && signUp(data);
    const validateEmail = (emailEntered) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setValue("email", emailEntered);
        emailEntered.match(emailRegex) ? setIsEmailValid(true) : setIsEmailValid(false)
    }
    const validatePassword = (passwordEntered) => {
        // 특수문자 / 문자 / 숫자포함 8 ~ 15자리
        const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        setValue("password", passwordEntered);
        passwordEntered.match(passwordRegex) ? setIsPasswordValid(true) : setIsPasswordValid(false);
    }

    const validateReEnterPassword = (passwordReEntered) => {
        passwordReEntered === passwordEntered ? setIsReEnterPasswordValid(true) : setIsReEnterPasswordValid(false);
    }

    // 이메일 형식 검사, 비밀번호 형식 검사
    const formCheck = () => {
        !isEmailValid && message.warning("이메일을 형식에 맞게 입력해주세요 🥺");
        !isPasswordValid && message.warning("비밀번호를 형식에 맞게 입력해주세요 🥺");
        !isReEnterPasswordValid && message.warning("같은 비밀번호를 입력해주세요.");
    }

    return (
        <Layout>
            <Container title={"Members Signup"}>
                <Section>
                    <Inner>
                        <Form
                            name="basic"
                            onFinish={handleSubmit(onSubmit)}>
                            <Form.Item>
                                <StyleLabel htmlFor='name'>Your Name</StyleLabel>
                                <Input
                                    {...register("name")}
                                    name="name"
                                    autoComplete='name'
                                    onChange={(e) => setValue('name', e.target.value)}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item>
                                <StyleLabel htmlFor='email'>Your Email</StyleLabel>
                                <Input
                                    {...register("email")}
                                    name="email"
                                    autoComplete='email'
                                    placeholder='example@address.com'
                                    onChange={(e) => { validateEmail(e.target.value) }}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item>
                                <StyleLabel htmlFor='password'>Your Password</StyleLabel>
                                <Input.Password
                                    {...register("password")}
                                    name="password"
                                    placeholder='8 to 15 including special characters / letters / numbers'
                                    onChange={(e) => { validatePassword(e.target.value) }}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item>
                                <StyleLabel htmlFor='password2'>Confirm Password</StyleLabel>
                                <Input.Password
                                    name="password2"
                                    onChange={(e) => { validateReEnterPassword(e.target.value) }}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item {...tailLayout} style={{ backgroud: 'white' }}>
                                <StyleButton htmlType="submit" onClick={formCheck}>
                                    Signup
                                </StyleButton>
                                <KaKaoLogin
                                    style={styleKakaoLogin}
                                    token='c7ba5e0cf660a7201f1856db793838fb'
                                    onSuccess={kakaoSignUp}
                                    onFailure={result =>
                                        message.error("로그인에 실패 하셨습니다.")
                                    }
                                    getProfile={true}
                                >KaKao
                                </KaKaoLogin>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <LoginSignup>
                            <Link href='/account/login'>
                                <a>
                                    <StyleButton>Login</StyleButton>
                                </a>
                            </Link>
                        </LoginSignup>
                    </Inner>
                </Section>
            </Container>
        </Layout >
    )
}

const Section = styled.div`
    display: flex;
    justify-content: center;
    margin: 35px 0px;
    width: 40%;
    background: white;
    box-shadow: 0 0 15px 0 rgb(2 59 109 / 10%);
`
const Inner = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 40px 0;
`
const LoginSignup = styled.div`
    margin: 0px 0px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    // & button 으로 하면 css 몇개 안먹음
    > a{
        text-align: center;
        text-decoration: none;
    }
`
