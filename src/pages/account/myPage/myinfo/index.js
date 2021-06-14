import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { message, Input, Form, Select } from "antd";
import { useForm } from "react-hook-form";
import AuthContext from "contexts/Auth/AuthContext";
import Layout from "components/Layout/Layout";
import Container from "components/Container/Container";
import {
  StyleLabel,
  StyleButton,
} from "components/atoms/StyleAtoms/StyleAtoms";

const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 16,
  },
};

const { Option } = Select;
export default function SettingAccount() {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://staybrella.com";
  const [user, setUser] = useState(
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user"))
      : []
  );
  const [gender, setGender] = useState(user.gender || "");
  const [name, setName] = useState(user.name);
  const [nationality, setNationality] = useState(user.nationality || "");
  const [userUploadedImage, setUserUploadedImage] = useState({
    fileName: "",
    filePath: user.image,
  });

  const [userImage, setUserImage] = useState(null);
  const { settingAccount, uploadImage } = React.useContext(AuthContext);
  const { handleSubmit, register } = useForm({ reValidateMode: "onBlur" });

  const imageUpload = (e) => {
    if (e.target.files[0] !== undefined) {
      setUserImage(e.target.files[0]);
      message.success("Click the 'Change your avatar' 📸");
    }
  };
  const imageUploadServer = () => {
    if (userImage === null) {
      message.warning("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", userImage);

    uploadImage(formData)
      .then((res) => {
        setUserUploadedImage({
          fileName: res.fileName,
          filePath: `${baseUrl}/img/${res.fileName}`,
        });
        message.success(res.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 초기 렌더링시 useEffect 발생을 막을 방법은 없을까?
  useEffect(() => {
    if (userUploadedImage.fileName === "") return;
    settingAccount({
      ...user,
      image: userUploadedImage.filePath,
    });
  }, [userUploadedImage]);

  const accountInfoUpload = () => {
    if (name === "" || gender === "" || nationality === "") {
      message.error("회원 정보를 모두 입력해주세요");
      return;
    }
    const newUserInfo = {
      ...user,
      name: name,
      gender: gender,
      nationality: nationality,
      image: userUploadedImage.filePath,
    };
    settingAccount(newUserInfo);
  };

  return (
    <Layout>
      <Container title={"Members Registration"}>
        <ContainerBox>
          <ImageForm onSubmit={handleSubmit(imageUploadServer)}>
            <StyleLabel htmlFor="img_file">
              <img
                src={userUploadedImage.filePath || user.image}
                alt="계정 이미지"
              />
            </StyleLabel>
            <input
              id="img_file"
              {...register("image")}
              name="image"
              type="file"
              onChange={(e) => {
                imageUpload(e);
              }}
              accept="image/png, image/jpeg"
            ></input>
            <StyleButton htmlType="submit">Change your avatar</StyleButton>
          </ImageForm>
          <Section>
            <Inner>
              <Form name="basic" onFinish={handleSubmit(accountInfoUpload)}>
                <Form.Item>
                  <StyleLabel htmlFor="name">Your Name</StyleLabel>
                  <Input
                    {...register("name")}
                    name="name"
                    autoComplete="name"
                    defaultValue={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    allowClear
                  />
                </Form.Item>
                <Form.Item>
                  <StyleLabel htmlFor="email">Your Email</StyleLabel>
                  <Input name="email" disabled defaultValue={user.email} />
                </Form.Item>
                <Form.Item>
                  <StyleLabel htmlFor="gender">Your Gender</StyleLabel>
                  <Select
                    name="gender"
                    defaultValue={gender === "" ? "" : gender}
                    onChange={setGender}
                    // {...register("gender")}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="None">None</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <StyleLabel htmlFor="nationality" style={{ fontSize: 20 }}>
                    Your Nationality
                  </StyleLabel>
                  <Select
                    name="nationality"
                    defaultValue={nationality === "" ? "" : nationality}
                    onChange={setNationality}
                    // {...register("nationality")}
                  >
                    <Option value="None">None</Option>
                    <Option value="Korea">Korea</Option>
                    <Option value="USA">USA</Option>
                    <Option value="England">England</Option>
                    <Option value="Czech Republic">Czech Republic</Option>
                    <Option value="Australia">Australia</Option>
                  </Select>
                </Form.Item>
                <Form.Item {...tailLayout} style={{ backgroud: "white" }}>
                  <StyleButton htmlType="submit">Upload Info</StyleButton>
                </Form.Item>
              </Form>
            </Inner>
          </Section>
        </ContainerBox>
      </Container>
    </Layout>
  );
}

const ContainerBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const Section = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0px;
  width: 40%;
  background: white;
  box-shadow: 0 0 15px 0 rgb(2 59 109 / 10%);
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 40px 0;
`;
const ImageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 10rem 0px 0px;
  > label {
    cursor: pointer;
    > img {
      height: 15rem;
      width: 15rem;
      border-radius: 50%;
      margin-bottom: 10px;
      border-collapse: separate;
      :hover {
        box-shadow: 5px 5px 15px 5px rgb(2 59 109 / 20%);
      }
    }
  }
  > input {
    margin: 10px 0px;
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0px;
  }
  > button {
    margin: 10px 0px;
  }
`;
