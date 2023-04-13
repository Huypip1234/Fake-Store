import React, { useState, memo } from "react";
// image
import logo from "../../assets/logo.png";
// antd
import { Button, Checkbox, Form, Input } from "antd";
// router
import { Link, useNavigate } from "react-router-dom";
//api
import { logIn } from "../../api";
//component
import { Noti } from "../../components/Noti";
// redux
import { useDispatch } from "react-redux";
import { changeIsLoading } from "../../redux/action";
//interface
import { IDataLogin } from "../../interface";

const Login = () => {
  console.log("Login render");
  const navigate = useNavigate();

  let formInitData: IDataLogin = {
    username: "",
    password: "",
    remember: false,
  };
  if (localStorage.getItem("data")) {
    formInitData = JSON.parse(localStorage.getItem("data") || ""); //JSON to Obj
    console.log("Hello: ", formInitData);
  }

  const dispatch = useDispatch();

  const onFinish = (dataLogin: IDataLogin) => {
    // Loading
    dispatch(changeIsLoading(true));
    //Call api
    logIn(dataLogin)
      .then((res) => {
        console.log(res);
        //Save data login in LocalStorage
        localStorage.setItem("data", JSON.stringify(dataLogin)); //Obj to JSON
        console.log("LocalStorage:", localStorage.getItem("data"));
        //dispatch(isAuthChange(true));

        //Change isAuthState trong Local Storage
        localStorage.setItem("isAuth", JSON.stringify(true)); //Obj to JSON
        console.log("LocalStorage:", localStorage.getItem("isAuth"));
        //Chuyen trang
        navigate("/home/all_product/1");
        //Loading
        dispatch(changeIsLoading(false));
        //Notification
        Noti("success", "200", "Login Success!");
      })
      .catch((err) => {
        Noti("error", err.response.status, err.response.data.message);
        dispatch(changeIsLoading(false));
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center basis-1/2">
      <img src={logo} alt="Lỗi rùi" className="w-[6rem]" />
      <h1 className="m-4">Sign In</h1>
      <Form
        name="basic"
        initialValues={formInitData}
        //initialValues={{username: "mor_2314", password: "83r5^_", remember: false}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        //labelCol={{ span: 7 }} //số cột của label max là 24
        wrapperCol={{ span: 24 }} //số cột của form max là 24
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Cannot be empty" }]}
        >
          <Input placeholder="User Name" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Cannot be empty" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          wrapperCol={{ span: 24 }}
          className="flex justify-center"
          valuePropName="checked"
        >
          <Checkbox>Remember</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} className="flex justify-center">
          <Button type="primary" className="bg-primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>

        <Link className="hover:text-primary" to={`/signup`}>
          No have Account? Register here!
        </Link>
      </Form>
    </div>
  );
};

export default memo(Login);
