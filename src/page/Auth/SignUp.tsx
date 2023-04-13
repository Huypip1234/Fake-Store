import React, { useState, memo } from "react";
// image
import logo from "../../assets/logo.png";
// antd
import { Button, Form, Input } from "antd";
//component
import { Noti } from "../../components/Noti";
//api
import { signUp } from "../../api";
// router
import { Link, useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { changeIsLoading } from "../../redux/action";
// Interface
import { IDataSignUp } from "../../interface";

const SignUp = () => {
  console.log("Sign Up render");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = (dataSignUp: IDataSignUp) => {
    console.log(dataSignUp);
    // Loading
    dispatch(changeIsLoading(true));

    //Call API
    signUp(dataSignUp)
      .then((res) => {
        console.log(res);
        //Notification
        Noti("success", "200", "Đăng kí thành công!");
        //Loading
        dispatch(changeIsLoading(false));
        //Chuyen trang
        navigate("/login");
        //Save data login in LocalStorage
        localStorage.setItem(
          "data",
          JSON.stringify({
            username: "johnd",
            password: "m38rmF$",
            remember: true,
          })
        ); //Obj to JSON
        console.log("LocalStorage:", localStorage.getItem("data"));
        //dispatch(initFormData({username: "johnd", password: "m38rmF$", remember: true}));
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
      <h1 className="m-4">Register</h1>
      <Form
        name="basic"
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
          name="email"
          rules={[{ required: true, message: "Cannot be empty" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} className="flex justify-center">
          <Button type="primary" className="bg-primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        <Link className="hover:text-primary" to={`/logIn`}>
          Have an account? Sign In here!
        </Link>
      </Form>
    </div>
  );
};

export default memo(SignUp);
