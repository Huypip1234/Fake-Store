import React, { useEffect } from "react";
// image
import banner from "../../assets/intro.svg";
// antd
import { Outlet } from "react-router-dom";
// router
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAllState } from "../../interface";
import Spinner from "../../components/Spin";

const Root = () => {
  console.log("Root render");
  const navigate = useNavigate();
  //Init language
  if (!localStorage.getItem("language")) {
    //hoac === null
    localStorage.setItem("language", JSON.stringify("en")); //Obj to JSON
  }

  //Init isAuth
  if (!localStorage.getItem("isAuth")) {
    //hoac === null
    localStorage.setItem("isAuth", JSON.stringify(false)); //Obj to JSON
  }
  const isAuth: boolean = JSON.parse(localStorage.getItem("isAuth") || "");

  useEffect(() => {
    isAuth ? navigate("./home/all_product/1") : navigate("./login");
  }, []);

  const loading = useSelector((allState: IAllState) => allState.isLoading);

  return (
    <div className="h-screen flex justify-center items-center relative">
      {" "}
      {/* Loading absolute phụ thuộc vào đây */}
      {loading && <Spinner />}
      <div className="md:flex md:items-center">
        <Outlet />

        <div className="hidden md:flex justify-center items-center basis-1/2">
          <img className="w-[100%]" src={banner} alt="Lỗi rùi" />
        </div>
      </div>
    </div>
  );
};

export default Root;
