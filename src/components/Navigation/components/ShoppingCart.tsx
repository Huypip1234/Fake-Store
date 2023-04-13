import React, { memo } from "react";
import { Link } from "react-router-dom";
// Antd
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Dropdown, theme } from "antd";
import { ICartData } from "../../../interface";
import SumaryCart from "../../../page/Home/Card/SumaryCart";

const ShoppingCart = ({ cartData }: { cartData: ICartData[] }) => {
  /* Antd dropdown */
  const { useToken } = theme;
  const { token } = useToken();
  /* End antd dropdown */

  return (
    <>
      <Dropdown
        placement="bottom"
        dropdownRender={() => (
          <div
            className="mt-[2.2rem] mr-[0.5rem] bg-white "
            style={{
              backgroundColor: token.colorBgElevated,
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <SumaryCart />
          </div>
        )}
      >
        {/* Cart Icon PC */}
        <Link to={`/home/Cart`} className="md:flex hidden items-center">
          <Badge count={cartData.length || 0}>
            <ShoppingCartOutlined className="text-[1.5rem] dark:text-white" />
          </Badge>
        </Link>
        {/* Cart Icon PC */}
      </Dropdown>

      {/* Cart Icon Mobile */}
      <Link to={`/home/Cart`} className="md:hidden flex items-center">
        <Badge count={cartData.length || 0}>
          <ShoppingCartOutlined className="text-[1.5rem] dark:text-white" />
        </Badge>
      </Link>
      {/* End Cart Icon Mobile */}
    </>
  );
};

export default memo(ShoppingCart);
