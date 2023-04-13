import { Button, Dropdown, theme } from "antd";
import { MenuProps } from "rc-menu";
import vnFlag from "../../../assets/image/vietnam_flag.png";
import engFlag from "../../../assets/image/english_flag.png";
import React, { memo } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const LanguageBtn = (props: { className: string }) => {
  /* i18 next */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  //Antd menu
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            changeLanguage("vn");
            localStorage.setItem("language", JSON.stringify("vn"));
          }}
          className="flex items-center gap-[0.5rem]"
        >
          <img src={vnFlag} alt="err" className="w-[1.5rem]" />
          <p className="text-[1rem] !transition-none">Tiếng Việt</p>
        </button>
      ),
      /* icon: <mdileOutlined />,
    disabled: true, */
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => {
            changeLanguage("en");
            localStorage.setItem("language", JSON.stringify("en"));
          }}
          className="flex items-center gap-[0.5rem]"
        >
          <img src={engFlag} alt="err" className="w-[1.5rem]" />
          <p className="text-[1rem] !transition-none">English</p>
        </button>
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

  const { t } = useTranslation();

  return (
    <div {...props}>
      <Dropdown
        menu={{ items }}
        placement="bottom"
        trigger={["click"]}
        dropdownRender={(menu) => (
          <div
            className="mt-[0.5rem] md:mt-[1.5rem] bg-white mr-[0.5rem]"
            style={{
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            {React.cloneElement(menu as React.ReactElement, {
              style: { boxShadow: "none" },
            })}
          </div>
        )}
      >
        <Button className="bg-white">{t("Language")}</Button>
      </Dropdown>
    </div>
  );
};

export default memo(LanguageBtn);
