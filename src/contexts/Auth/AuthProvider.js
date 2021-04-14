import React from "react";
import { withRouter, useRouter } from "next/router";
import AuthContext from './AuthContext.js';
import { Fetch } from '../../utils/Fetch';

import 'antd/dist/antd.css';
import { message } from 'antd';

const AuthProvider = ({ children, localStorage }) => {

    const [prevAuthUser, setPrevAuthUser] = React.useState(localStorage.user || {})
    const router = useRouter();
    const homeRedirect = () => router.push('/')
    const saveUserInfo = res => {
        console.log(res, "saveUserInfo Path");
        if (!res.loginSuccess) {
            throw new Error(res.message);
        }
        const newAuthUser = { ...prevAuthUser, ...res }
        setPrevAuthUser(newAuthUser)
        return res;
    }
    const login = ({ email, password }) => Fetch.post('/api/login/', {
        'email': email,
        'password': password,
    }).then(saveUserInfo).then(homeRedirect).catch(err => message.error(err.message));

    const kakaoLogin = ({ profile }) => {
        //console.log(profile);
        Fetch.post('/api/login/kakao/', {
            email: profile.kakao_account.email,
        }).then(saveUserInfo).then(homeRedirect).catch(err => message.error(err.message));
    }
    const kakaoSignUp = ({ profile }) => Fetch.post('/api/signUp/', {
        'email': profile.kakao_account.email,
        'name': profile.properties.nickname,
        'gender': profile.kakao_account.gender,
        'image': profile.properties.profile_image,
    }).then(res => {
        if (res.success) {
            router.push('/account/login')
            message.success(res.message);
        } else {
            message.error(res.message);
        }
    })

    const logout = () => {
        message.success('You have been logged out')
        setValue({ ...initialState, authUser: {}, isAuthenticated: false })
        window.localStorage.clear()
        router.push('/')
    };

    const signUp = (data) => Fetch.post('/api/signup/', {
        'name': data.name,
        'email': data.email,
        'password': data.password,
        'image': 'https://tooravel.be/img/imgfile1617785497822.png'
    }).then(res => {
        if (res.success) {
            router.push('/account/login')
            message.success(res.message);
        } else {
            message.error(res.message);
        }
    })

    const settingAccount = async ({ email, name, gender, nationality, image }) => await Fetch.post('/api/account/setting', {
        'email': email,
        'name': name,
        'gender': gender,
        'nationality': nationality,
        'image': image
    }).then(res => {
        console.log(res, "settingAccount Path")
        return res;
    }).then(saveUserInfo).then(res => message.success(res.message));

    const uploadReview = (data) => {
        console.log(data, "in uploadReview");
        Fetch.post('/api/upload/review', {
            'name': data.userName,
            'image': data.userImage,
            'date': data.date,
            'rating': data.rating,
            'comment': data.comment,
            'product': data.product,
            'keyId': data.keyId
        }).then(res => {
            res.reviewSave ? message.success(res.message) : consolo.log(res.message);
        }).catch(err => alert(err));
    }

    const initAuthUser = (data) => {
        console.log(data, "initAuthUser Path");
        setPrevAuthUser(data);
    }
    //state초기화 객체 입니다.
    const initialState = {
        saveUserInfo,
        login,
        kakaoLogin,
        logout,
        signUp,
        kakaoSignUp,
        uploadReview,
        settingAccount,
        initAuthUser,
        authUser: prevAuthUser,
        isAuthenticated: 'token' in prevAuthUser,
    };
    //Hook을 통한 state, setState를 정의합니다.
    const [value, setValue] = React.useState(initialState);

    React.useEffect(() => {
        console.log('prevAuthUser change')
        if (Object.keys(prevAuthUser).length > 0) {
            console.log('prevAuthUser not null')
            console.log(prevAuthUser, "prevAuthUser change")
            setValue({
                ...initialState,
                authUser: prevAuthUser,
                isAuthenticated: 'token' in prevAuthUser,
            })
        }
    }, [prevAuthUser]);

    React.useEffect(() => {
        console.log('value change')
        window.localStorage.clear()
        window.localStorage['isAuthenticated'] = 'token' in value.authUser;
        window.localStorage.setItem('user', JSON.stringify(value.authUser));
    }, [value.authUser]);

    return (
        //AuthProvider에 state를 사용할 컴포넌트들을 호출하려면
        //{children}이 있어야 합니다
        //그래서 마지막 return에서 {children}을 리턴해줍니다.
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default withRouter(AuthProvider);