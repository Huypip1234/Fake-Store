import { Dropdown, Space } from "antd";
// Type
import { ItemType } from "antd/es/menu/hooks/useItems";
import React, { Dispatch, SetStateAction, useEffect, memo } from "react";
// Router
import { NavLink } from "react-router-dom";
// antd
import { DownOutlined } from "@ant-design/icons";
import LanguageBtn from "./LanguageBtn";
// i18 next
import { useTranslation } from "react-i18next";

interface IProps {
  isShowMobileMenu: boolean;
  setIsShowMobileMenu: Dispatch<SetStateAction<boolean>>;
  items: ItemType[];
}

const MobileMenu = ({
  isShowMobileMenu,
  setIsShowMobileMenu,
  items,
}: IProps) => {
  console.log("Mobile Menu Render");

  const { t } = useTranslation();

  return (
    <ul
      id="mobileMenu"
      className={`${
        isShowMobileMenu ? "translate-y-[5rem]" : "translate-y-[-95%]"
      } md:hidden flex h-[95%] bg-opacity-80 bg-slate-100 dark:bg-slate-700 dark:bg-opacity-80 dark:text-white p-[3rem] gap-[2rem] w-[100%] absolute z-10 items-center flex-col ease-in-out duration-300`}
    >
      <li>
        <NavLink
          to="all_product/1"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:activeStyle"
          }
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
        >
          <div className="font-normal">{t("Home")}</div>
        </NavLink>
      </li>
      <li>
        <Dropdown
          menu={{ items }}
          placement="bottom"
          trigger={["click"]}
          dropdownRender={(menu) => (
            <div className="mt-[0.5rem]">
              {React.cloneElement(menu as React.ReactElement, {
                style: {},
              })}
            </div>
          )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className="cursor-pointer text-[1rem] font-normal font-sans">
              {t("Categories")}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </li>
      <li>
        <NavLink
          to="contact"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:activeStyle"
          }
          onClick={() => {
            setIsShowMobileMenu(false);
          }}
        >
          <div className="font-normal">{t("Contact")}</div>
        </NavLink>
      </li>
      <li>
        {/* Change Language btn */}
        <LanguageBtn className="" />
      </li>
    </ul>
  );
};

export default memo(MobileMenu);
