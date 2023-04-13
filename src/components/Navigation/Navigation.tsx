import React from "react";
import { useEffect, useState, memo } from "react";
//React Router
import { Link } from "react-router-dom";
// antd
import { MenuProps } from "antd";
// image
import logo from "../../assets/logo.png";
// Redux
import { useSelector } from "react-redux";
// Interface
import { IAllState } from "../../interface";
// Component
import AvatarNav from "./components/AvatarNav";
import MobileMenu from "./components/MobileMenu";
import PcMenu from "./components/PcMenu";
import ShoppingCart from "./components/ShoppingCart";
// Menu hamburger
import Hamburger from "hamburger-react";
import LanguageBtn from "./components/LanguageBtn";

const Navigation = () => {
  console.log("Navigation render");

  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  //Antd menu
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
          className="text-[1rem] !transition-none"
          to="all_product/categories/electronics/1"
        >
          electronics
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
    {
      key: "2",
      label: (
        <Link
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
          className="text-[1rem] !transition-none"
          to="all_product/categories/jewelery/1"
        >
          jewelery
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
    {
      key: "3",
      label: (
        <Link
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
          className="text-[1rem] !transition-none"
          to={`all_product/categories/men's clothing/1`}
        >
          men's clothing
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
    {
      key: "4",
      label: (
        <Link
          className="text-[1rem] !transition-none"
          to={`all_product/categories/women's clothing/1`}
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
        >
          women's clothing
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
  ];
  /* End Antd Menu */

  //prevent scrolling
  const loading = useSelector((allState: IAllState) => allState.isLoading);

  if (isShowMobileMenu || loading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  //Get cartData
  const cartData = useSelector((allState: IAllState) => allState.cartData);

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu
        isShowMobileMenu={isShowMobileMenu}
        setIsShowMobileMenu={setIsShowMobileMenu}
        items={items}
      />
      {/* End Mobile Menu */}
      <nav className="pt-4 pb-4 shadow-lg dark:bg-slate-800 ease-in-out duration-300 bg-white z-20 relative">
        <div className="w-[93%] flex justify-between mx-auto">
          <div className="flex">
            <div>
              <Link to="all_product/1">
                <img src={logo} alt="Lỗi rùi ahuhu" className="w-[3.5rem]" />
              </Link>
            </div>
            <h1 className="text-[1.5rem] flex items-center ml-[0.6rem] extremeSm:ml-[1rem] text-primary dark:text-white ease-in-out duration-300">
              <Link to="all_product/1">Fake Store</Link>
            </h1>
            {/* PC Menu */}
            <PcMenu items={items} />
            {/* End PC Menu */}
          </div>

          <ul className="flex w-[9rem] md:w-[14rem] justify-between items-center ease-in-out duration-300">
            {/* Change Language btn */}
            <LanguageBtn className="hidden md:block" />

            {/* Shopping Cart icon */}
            <li className="px-[1rem]">
              <ShoppingCart cartData={cartData} />
            </li>

            {/* Avatar Icon */}
            <li>
              <AvatarNav />
            </li>

            {/* Menu mobile Icon */}
            <li className="md:hidden">
              <button
                onClick={() => {
                  setIsShowMobileMenu(!isShowMobileMenu);
                }}
                className="flex justify-center items-center"
              >
                <Hamburger
                  toggled={isShowMobileMenu}
                  hideOutline={false}
                  size={25}
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default memo(Navigation);
