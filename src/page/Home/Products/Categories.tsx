import React, { useEffect, useState, memo } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeIsLoading, slicePage } from "../../../redux/action";
// api
import { getProductInCategories } from "../../../api";
// interface
import { IAllProductData, IAllState } from "../../../interface";
// antd
import { Pagination } from "antd";
import ProductItem from "./components/ProductItem";
// router
import { useParams, useNavigate } from "react-router-dom";
import Search from "./components/Search";
import NoData from "./components/NoData";
import { Noti } from "../../../components/Noti";

const Categories = () => {
  console.log("Categories render");

  // Init Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get Url Id
  const { product_categories } = useParams();

  // Get Categories Data
  const [categoriesData, setCategoriesData] = useState<IAllProductData[]>([]);

  useEffect(() => {
    //loading open
    dispatch(changeIsLoading(true));
    //get api
    getProductInCategories(product_categories || "")
      .then((res) => {
        //loading close
        dispatch(changeIsLoading(false));
        //Save Data
        setCategoriesData(res.data);
        //Luc nay allProductData van rong, phai re-render lai 1 lan thi moi co gia tri

        //set data in state
        dispatch(slicePage(res.data));
      })
      .catch((err) => {
        Noti("error", err.response.status, err.response.data.message);
        dispatch(changeIsLoading(false));
      });
  }, [product_categories]);
  // Ko tu reload lai vi cung la 1 component -> Phai cho product_categories vao
  /* End Get All Product */

  /* Page slice */
  const allProductDataSliced: IAllProductData[][] = useSelector(
    (allState: IAllState) => allState.pageSlice
  );
  /* And page Slice */

  /* Pagination */
  const { product_categories_Id } = useParams(); //Get url
  const currentPage: number = parseInt(product_categories_Id || "");
  const productListFilter = useSelector(
    (allState: IAllState) => allState.productListFilter
  );
  /* End Pagination */

  return (
    <>
      {/* Searching */}
      <Search productData={categoriesData} />
      {/* End Searching */}

      {/* Product List */}
      {allProductDataSliced[currentPage - 1]?.length > 0 ? (
        <div className="mt-[4rem] mb-[5rem] flex justify-center">
          <ul className="grid grid-cols-2 gap-4 container md:grid-cols-3 md:gap-5 lg:gap-10 xl:grid-cols-4 xl:gap-14">
            {allProductDataSliced[currentPage - 1].map((element) => {
              return <ProductItem item={element} key={element.id} />;
            })}
          </ul>
        </div>
      ) : (
        <NoData />
      )}
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
              navigate(`/home/all_product/categories/electronics/${page}`);
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

export default memo(Categories);
