import React, { memo } from "react";
// Type
import { ItemType } from "antd/es/menu/hooks/useItems";
// Router
import { NavLink } from "react-router-dom";
// antd
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const PcMenu = ({ items }: { items: ItemType[] }) => {
  const { t } = useTranslation();
  return (
    <ul className="hidden md:flex justify-between items-center ml-10 w-[16rem] dark:text-white ease-in-out duration-300">
      <li>
        <NavLink
          to="all_product/1"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:activeStyle"
          }
        >
          <div className="font-normal">{t("Home")}</div>
        </NavLink>
      </li>
      <li>
        <Dropdown
          menu={{ items }}
          placement="bottom"
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
        >
          <div className="font-normal">{t("Contact")}</div>
        </NavLink>
      </li>
    </ul>
  );
};

export default memo(PcMenu);
