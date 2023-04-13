import { Avatar, Dropdown, theme } from "antd";
import { MenuProps } from "rc-menu";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IAllState } from "../../../interface";
import { Noti } from "../../Noti";
import { useTranslation } from "react-i18next";

const AvatarNav = () => {
  const { t } = useTranslation();

  // logout handlle
  const handleLogout = () => {
    //dispatch(isAuthChange(false));
    localStorage.setItem("isAuth", JSON.stringify(false)); //Obj to JSON
    console.log("LocalStorage:", localStorage.getItem("isAuth"));
    //Clear Local Storage
    if (!JSON.parse(localStorage.getItem("data") || "").remember) {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("data");
    }
    //Notification
    Noti("success", "200", "Logout Success!");
  };

  //Antd menu
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link className="text-[1rem] !transition-none" to="account">
          {t("Account")}
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
    {
      key: "2",
      label: (
        <Link
          to="/login"
          className="text-[1rem] !transition-none"
          onClick={handleLogout}
        >
          {t("Log out")}
        </Link>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
  ];
  /* End Antd Menu */

  /* Antd dropdown */
  const { useToken } = theme;
  const { token } = useToken();
  /* End antd dropdown */

  /* UserInforData */
  const {
    name: { firstname, lastname },
  } = useSelector((allState: IAllState) => allState.userInforData);
  /* End UserInforData */

  return (
    <div>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        trigger={["click"]}
        dropdownRender={(menu) => (
          <div
            className="mt-[1.5rem] bg-white mr-[0.5rem]"
            style={{
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <div className="px-[1rem] py-[0.5rem] text-base font-semibold">
              {firstname + " " + lastname}
            </div>
            <hr />
            {React.cloneElement(menu as React.ReactElement, {
              style: { boxShadow: "none" },
            })}
          </div>
        )}
      >
        <Avatar className="bg-primary text-white cursor-pointer" size={40}>
          {firstname[0]?.toLocaleUpperCase()}
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default memo(AvatarNav);
