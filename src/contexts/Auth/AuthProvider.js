import React from "react";
import { withRouter, useRouter } from "next/router";
import AuthContext from "contexts/Auth/AuthContext";
import { Fetch } from "utils/Fetch";
import "antd/dist/antd.css";
import { message } from "antd";

const AuthProvider = ({ children, localStorage }) => {
  const [prevAuthUser, setPrevAuthUser] = React.useState(
    localStorage.user || {}
  );
  const router = useRouter();
  const homeRedirect = () => router.push("/");
  const saveUserInfo = (res) => {
    console.log(res, "saveUserInfo Path");
    if (!res.loginSuccess) {
      throw new Error(res.message);
    }
    const newAuthUser = { ...prevAuthUser, ...res };
    setPrevAuthUser(newAuthUser);
    return res;
  };
  const login = ({ email, password }) =>
    Fetch.post("/api/login/", {
      email: email,
      password: password,
    })
      .then(saveUserInfo)
      .then(homeRedirect)
      .catch((err) => message.error(err.message));

  const kakaoLogin = ({ profile }) => {
    Fetch.post("/api/login/kakao/", {
      email: profile.kakao_account.email,
    })
      .then(saveUserInfo)
      .then(homeRedirect)
      .catch((err) => message.error(err.message));
  };

  const kakaoSignUp = ({ profile }) =>
    Fetch.post("/api/signUp/", {
      email: profile.kakao_account.email,
      name: profile.properties.nickname,
      gender: profile.kakao_account.gender,
      image: profile.properties.profile_image,
    }).then((res) => {
      if (res.success) {
        router.push("/account/login");
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });

  const logout = () => {
    message.success("You have been logged out");
    setValue({ ...initialState, authUser: {}, isAuthenticated: false });
    window.localStorage.clear();
    router.push("/");
  };

  const signUp = (data) =>
    Fetch.post("/api/signup/", {
      name: data.name,
      email: data.email,
      password: data.password,
      image: "https://staybrella.com/img/imgfile1618415682649.png",
    }).then((res) => {
      if (res.success) {
        router.push("/account/login");
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });

  const settingAccount = ({ email, name, gender, nationality, image }) =>
    Fetch.post("/api/account/setting", {
      email: email,
      name: name,
      gender: gender,
      nationality: nationality,
      image: image,
    })
      .then((res) => {
        console.log(res, "settingAccount Path");
        return res;
      })
      .then(saveUserInfo)
      .then((res) => message.success(res.message));

  const uploadImage = (data) => Fetch.post("/api/upload/image", data);

  //state초기화 객체 입니다.
  const initialState = {
    saveUserInfo,
    login,
    kakaoLogin,
    logout,
    signUp,
    kakaoSignUp,
    uploadImage,
    settingAccount,
    authUser: prevAuthUser,
    isAuthenticated: "token" in prevAuthUser,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [value, setValue] = React.useState(initialState);

  React.useEffect(() => {
    console.log("prevAuthUser change");
    if (Object.keys(prevAuthUser).length > 0) {
      console.log("prevAuthUser not null");
      console.log(prevAuthUser, "prevAuthUser change");
      setValue({
        ...initialState,
        authUser: prevAuthUser,
        isAuthenticated: "token" in prevAuthUser,
      });
    }
  }, [prevAuthUser]);

  React.useEffect(() => {
    console.log(value, "value change");
    window.localStorage.clear();
    window.localStorage["isAuthenticated"] = "token" in value.authUser;
    window.localStorage.setItem("user", JSON.stringify(value.authUser));
  }, [value.authUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default withRouter(AuthProvider);
