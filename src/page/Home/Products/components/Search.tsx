import { Input } from "antd";
import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IAllProductData } from "../../../../interface";
import { changeProductListFilter, slicePage } from "../../../../redux/action";
import { useTranslation } from "react-i18next";

interface IAllProductDataProps {
  productData: IAllProductData[];
}

const Search = ({ productData }: IAllProductDataProps) => {
  console.log("Search render");

  // Init Hook
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeProductListFilter(productData));
  }, [productData]);

  // Search Function
  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    let productListFilter: IAllProductData[] = [];

    productData.forEach((element) => {
      if (
        element.title
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        productListFilter.push(element);
      }
    });
    dispatch(slicePage(productListFilter));
    dispatch(changeProductListFilter(productListFilter));
  };

  //Get Url Id
  const { product_list_Id } = useParams();
  const currentPage: number = parseInt(product_list_Id || "");

  const { t } = useTranslation();

  return (
    <>
      <div className={`flex justify-center ${currentPage > 1 && "hidden"}`}>
        <div className="container flex justify-center">
          <Input.Search
            placeholder={t("What are you finding?") || ""}
            allowClear
            onChange={(e) => {
              searchProduct(e);
            }}
            style={{ width: 300 }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(Search);
