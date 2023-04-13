import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addProductOfCart, getUserShoppingCartData } from "../../../api";
import { IAllState, ICartData } from "../../../interface";
import { changeCartData, changeIsLoading } from "../../../redux/action";
import { Button, Rate, Image, Skeleton } from "antd";
import ProductItem from "./components/ProductItem";
import Payment from "./components/Payment";
import { Noti } from "../../../components/Noti";
import SizeSelection from "../../../components/SizeSelection";
import QuantitySelection from "../../../components/QuantitySelection";
// image
import tiny from "../../../assets/image/tiny.jpg";
import logo from "../../../assets/logo.png";
import ProgressiveImage from "react-progressive-image";

const ProductDetail = () => {
  console.log("Product Detail Render");
  // Init hooks
  const dispatch = useDispatch();

  // scroll to top
  // Phải cho location vào vì ko thể tự reload lại mỗi khi đổi sản phẩm
  // Ko thể tự reload lại mỗi khi đổi sản phẩm vì cùng là 1 component -> chỉ re-render chứ ko reload
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Get all Product
  const allProductData = useSelector(
    (allState: IAllState) => allState.allProductDataImmutation
  );
  /* End Get All Product */

  // Get url
  const { product_id } = useParams();
  const id: number = parseInt(product_id || "");

  // Filter data from all product
  const productData = allProductData.find((element) => element.id === id);

  //Maybe you like
  let suggestProductData = [];
  let suggestProductDataCount = 0;
  for (let element of allProductData) {
    if (suggestProductDataCount === 4) {
      break;
    }
    if (
      element.category === productData?.category &&
      element.id !== productData.id
    ) {
      suggestProductData.push(element);
      suggestProductDataCount++;
    }
  }

  /* Quantity */
  const [quantityState, setQuantityState] = useState(1);
  /* End Quantity */

  /* Payment Modal */
  const [open, setOpen] = useState(false);
  /* End payment Modal */

  /* SizeSelection */
  const [sizePicker, setSizePicker] = useState<string>("L");
  /* End Size Selection */

  /* Bill Data  */
  const productDataArr = [];
  productDataArr.push({
    id: productData?.id,
    img: productData?.image,
    title: productData?.title,
    quantity: quantityState,
    price: productData?.price,
    size: sizePicker,
  });
  const billData = {
    productData: productDataArr,
    total:
      productData &&
      parseFloat((productData?.price * quantityState).toFixed(2)),
  };
  /* End Bill Data */

  /* Add to cart */
  const userInforData = useSelector(
    (allState: IAllState) => allState.userInforData
  );
  const allProductDataImmutation = useSelector(
    (allState: IAllState) => allState.allProductDataImmutation
  );
  const addToCart = (id: number) => {
    dispatch(changeIsLoading(true));
    /* Add */
    addProductOfCart(id)
      .then((res) => {
        // Get new data (Get again to update)
        interface ICartDataTemporary {
          productId: number;
          quantity: number;
        }
        getUserShoppingCartData(userInforData.id)
          .then((res) => {
            const cartDataTemporary: ICartDataTemporary[] = res.data?.products;
            //get data product
            const data: ICartData[] = [];
            cartDataTemporary?.forEach((element) => {
              const found = allProductDataImmutation.find(
                (ele) => ele.id === element.productId
              );
              found &&
                data.push({ productData: found, quantity: element.quantity });
            });
            dispatch(changeCartData(data));
          })
          .catch((err) => {
            Noti("error", err.response.status, err.response.data.message);
          });
        //Loading
        dispatch(changeIsLoading(false));
        //Notification
        Noti(
          "success",
          `Thêm thành công sp "${productData?.title}" vào giỏ hàng!`,
          "* Đây chỉ là minh họa vì ko thể can thiệp vào Database"
        );
      })
      .catch((err) => {
        console.log(err);
        //Loading
        dispatch(changeIsLoading(false));
        Noti("error", err.response.status, err.response.data.message);
      });
  };
  /* End add to cart */

  return (
    <div className="flex justify-center mt-[3rem]">
      <div className="container">
        {/* Image and title, price */}
        <div className="flex md:gap-[3rem] items-center md:flex-row flex-col">
          <div className="md:basis-[55%] xl:basis-[40%] p-[2rem] bg-white rounded-[0.7rem]">
            <ProgressiveImage
              src={productData?.image || logo}
              placeholder={tiny}
            >
              {(src: string, loading: boolean) => (
                <Image
                  src={src}
                  className={`transition-all duration-1000 ${
                    loading ? "blur-md" : "blur-none"
                  }`}
                />
              )}
            </ProgressiveImage>
          </div>
          <div className="w-full md:basis-[45%] xl:basis-[60%] md:pt-[3rem] dark:pt-[2rem]">
            {/* Title */}
            <h1 className="dark:text-white">
              {productData?.title || <Skeleton active />}
            </h1>
            {/* rating */}
            <div className="flex items-center gap-[2rem]">
              <div>
                <Rate
                  className="text-primary dark:text-primaryDark"
                  disabled
                  value={productData?.rating.rate}
                />
              </div>
              <div className="dark:text-white">
                {productData?.rating.count} reviews
              </div>
            </div>
            {/* price */}
            <div className="font-[600] text-3xl mt-2 ease-in-out duration-300 dark:text-white">
              ${productData?.price}
            </div>
            <hr className="mt-[1rem]" />
            {/* Size */}
            <div className="mt-[1rem]">
              <p className="font-[600] text-lg dark:text-white mb-[0.5rem]">
                Size
              </p>
              <SizeSelection
                sizePicker={sizePicker}
                setSizePicker={setSizePicker}
              />
            </div>
            {/* Count */}
            <div className="mt-[2.5rem] gap-[1.5rem] flex items-center">
              <p className="font-[600] text-lg dark:text-white">Total</p>
              <QuantitySelection
                price={productData?.price || 0}
                quantityState={quantityState}
                setQuantityState={setQuantityState}
              />
            </div>
            {/* Button */}
            <div className="gap-[1rem] flex mt-[2rem]">
              <Button
                size="large"
                className="bg-primary basis-[50%] !h-[3rem] dark:drop-shadow-[0px_0px_20px_#802c6e]"
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
                disabled={quantityState <= 0 ? true : false}
              >
                Buy Now
              </Button>
              <Button
                size="large"
                className="bg-slate-200 basis-[50%] !h-[3rem]"
                disabled={quantityState <= 0 ? true : false}
                onClick={() => {
                  addToCart(id);
                }}
              >
                Add To Cart
              </Button>

              {/* Payment Modal */}
              <Payment open={open} setOpen={setOpen} billData={billData} />
              {/* End Payment Modal */}
            </div>
          </div>
        </div>
        {/* End Image and title, price */}

        {/* Description */}
        <div className="mt-[3rem]">
          <div className="text-primary dark:text-primaryDark font-[700] text-2xl border-b-[0.2rem] pb-[0.3rem] border-primary dark:border-primaryDark inline-block">
            Description
          </div>
          <div className="mt-[1rem] dark:text-white">
            {productData?.description || <Skeleton active />}
          </div>
        </div>
        {/* End Description */}

        {/* Maybe you like */}
        <div className="mt-[3rem]">
          <div className="text-primary dark:text-primaryDark font-[700] text-2xl border-b-[0.2rem] pb-[0.3rem] border-primary dark:border-primaryDark inline-block">
            You may also like
          </div>
          {/* Product List */}
          <div className="mt-[2rem] flex justify-center">
            <ul className="w-full grid grid-cols-2 gap-4 container md:grid-cols-3 md:gap-5 lg:gap-10 xl:grid-cols-4 xl:gap-14">
              {suggestProductData.length !== 0 &&
                suggestProductData.map((element) => {
                  return <ProductItem item={element} key={element.id} />;
                })}
            </ul>
          </div>
          {/* End Product List */}
        </div>
        {/* End Maybe you like */}
      </div>
    </div>
  );
};

export default memo(ProductDetail);
