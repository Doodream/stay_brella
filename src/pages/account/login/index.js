import React, { useRef, useState } from 'react';
import Link from 'next/link';

import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Button, message, Space, Divider, Input, Form, Checkbox } from 'antd';
import { useForm } from "react-hook-form";
import AuthContext from '../../../contexts/Auth/AuthContext';
import KaKaoLogin from 'react-kakao-login';

import Layout from '../../../components/Layout/Layout';

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function Login({ history }) {

    const [emailEntered, setEmailEntered] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const { login, kakaoLogin, isAuthenticated } = React.useContext(AuthContext);
    const { handleSubmit, register, reset, setValue } = useForm({ reValidateMode: 'onBlur' });

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

    const onSubmit = data => {
        reset()
        //login(data)
        alert(JSON.stringify(data));
    }

    const validateEmail = (emailEntered) => {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (emailEntered.match(emailRegex)) {
            setEmailEntered(emailEntered);
            setIsEmailValid(true);
            setValue("email", emailEntered);
        } else {
            setEmailEntered(emailEntered);
            setIsEmailValid(false);
        }
    }
    const validatePassword = (passwordEntered) => {
        // 특수문자 / 문자 / 숫자포함 8 ~ 15자리
        const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (passwordEntered.match(passwordRegex)) {
            setPasswordEntered(passwordEntered);
            setIsPasswordValid(true);
            setValue("password", passwordEntered);
        } else {
            setPasswordEntered(passwordEntered);
            setIsPasswordValid(false);
        }
    }
    // 이메일 형식 검사, 비밀번호 형식 검사
    const formCheck = () => {
        if (!isEmailValid) message.warning("이메일을 형식에 맞게 입력해주세요");
        if (!isPasswordValid) message.warning("비밀번호를 형식에 맞게 입력해주세요");
    }

    return (
        <Layout>
            <Container>
                <PageTitle>
                    <span>Members Login</span>
                    <Divider style={{ boxShadow: '0 0 15px 0 rgb(2 59 109 / 10%)', margin: '10px 0 0 0' }} />
                </PageTitle>
                <Section>
                    <Inner>
                        <Form
                            name="basic"
                            onFinish={handleSubmit(onSubmit)}>
                            <Form.Item>
                                <label for='email' style={{ fontSize: 20 }}>Your Email</label>
                                <Input
                                    {...register("email")}
                                    name="email"
                                    autoComplete='email'
                                    laceholder='example@address.com'
                                    onChange={(e) => { validateEmail(e.target.value) }}
                                    allowClear />
                            </Form.Item>
                            <Form.Item>
                                <label for='password' style={{ fontSize: 20 }}>Your Password</label>
                                <Input.Password
                                    {...register("password")}
                                    name="password"
                                    placeholder='8 to 15 including special characters / letters / numbers'
                                    onChange={(e) => { validatePassword(e.target.value) }}
                                    allowClear />
                            </Form.Item>
                            <Form.Item {...tailLayout} style={{ backgroud: 'white' }}>
                                <Button htmlType="submit" onClick={formCheck} style={{ background: '#34495e', color: 'white' }}>
                                    Login
                                </Button>
                                <KaKaoLogin
                                    //className={classes.loginKakao}
                                    style={styleKakaoLogin}
                                    token='0dbc092d8a49e7456606d2cab34a0b88'
                                    onSuccess={kakaoLogin}
                                    onFailure={result =>
                                        message.error("로그인에 실패 하셨습니다.")
                                    }
                                    getProfile={true}
                                >KaKao</KaKaoLogin>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <LoginSignup>
                            <Link href='/account/signup'>
                                <a>
                                    <Button>Signup</Button>
                                </a>
                            </Link>
                        </LoginSignup>
                    </Inner>
                </Section>
            </Container>
        </Layout >
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    background: white;
`

const PageTitle = styled.div`
    width: 90%;
    > span {
        font-size: 2rem;
        color: #34495e;
    }
`
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
        > button {
        width: 100px;
        background: #34495e;
        color: white;
    }
    text-align: center;
    text-decoration: none;
    }
`
