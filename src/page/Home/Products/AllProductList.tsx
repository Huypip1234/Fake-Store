import React, { useEffect, useState, memo } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeAllProductDataImmutation,
  changeIsLoading,
  slicePage,
} from "../../../redux/action";
// api
import { getSortedProduct } from "../../../api";
// interface
import { IAllProductData, IAllState } from "../../../interface";
// antd
import { Button, Dropdown, MenuProps, Pagination, Skeleton } from "antd";
import ProductItem from "./components/ProductItem";
import {
  DownOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
// router
import { useNavigate, useParams } from "react-router-dom";
import Search from "./components/Search";
import NoData from "./components/NoData";
import { Noti } from "../../../components/Noti";
// i18 next
import { useTranslation } from "react-i18next";

const AllproductList = () => {
  console.log("All Product List render");

  // Init Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get all Product
  const allProductData = useSelector(
    (allState: IAllState) => allState.allProductDataImmutation
  );
  useEffect(() => {
    dispatch(slicePage(allProductData));
  }, [allProductData]);
  /* End Get All Product */

  /* Page slice */
  const allProductDataSliced: IAllProductData[][] = useSelector(
    (allState: IAllState) => allState.pageSlice
  );
  /*  And page Slice */

  /* Sort by id */
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    dispatch(changeIsLoading(true));
    console.log("click", e);
    const increaseOrDecrease = e.key === "1" ? "asc" : "desc";
    getSortedProduct(increaseOrDecrease)
      .then((res) => {
        dispatch(changeIsLoading(false));
        //Save
        dispatch(changeAllProductDataImmutation(res.data));
        //Dispatch to Redux
        dispatch(slicePage(res.data));
      })
      .catch((err) => {
        dispatch(changeIsLoading(false));
        Noti("error", err.response.status, err.response.data.message);
      });
  };

  const items: MenuProps["items"] = [
    {
      label: "Tăng dần",
      key: "1",
      icon: <ArrowUpOutlined />,
    },
    {
      label: "Giảm dần",
      key: "2",
      icon: <ArrowDownOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  /* End Sort by id */

  /* Pagination */
  const { product_list_Id } = useParams(); //Get url
  const currentPage: number = parseInt(product_list_Id || "");
  const productListFilter = useSelector(
    (allState: IAllState) => allState.productListFilter
  );
  /* End Pagination */

  const isLoading = useSelector((allState: IAllState) => allState.isLoading);

  const { t } = useTranslation();

  return (
    <>
      {/* Searching */}
      <Search productData={allProductData} />
      {/* End Searching */}

      {/* Sorting */}
      <div className="flex justify-center mt-[1.5rem] md:mt-[1rem]">
        <div className="container">
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button className="dark:text-white">
              {t("Sort by ID")}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      {/* End Sorting */}

      {/* Product List */}
      <Skeleton
        loading={isLoading}
        active
        className="container mx-[auto] my-[2rem]"
      >
        {allProductDataSliced[currentPage - 1]?.length > 0 ? (
          <div className="mt-[1rem] mb-[5rem] flex justify-center">
            <ul className="grid grid-cols-2 gap-4 container md:grid-cols-3 md:gap-5 lg:gap-10 xl:grid-cols-4 xl:gap-14">
              {allProductDataSliced[currentPage - 1].map((element) => {
                return <ProductItem item={element} key={element.id} />;
              })}
            </ul>
          </div>
        ) : (
          <NoData />
        )}
      </Skeleton>
      {/* End Product List */}

      {/* Pagination */}
      <div className="flex justify-end container ml-auto mr-auto">
        <div>
          <Pagination
            showTitle={false}
            defaultCurrent={1}
            current={currentPage}
            defaultPageSize={16} //So san pham 1 trang
            total={productListFilter.length} //Tong so san pham -> de tinh toan chia page
            onChange={(page, pageSize) => {
              navigate(`/home/all_product/${page}`);
              // scroll to top
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </div>
      {/* End Pagination */}
    </>
  );
};

export default memo(AllproductList);
