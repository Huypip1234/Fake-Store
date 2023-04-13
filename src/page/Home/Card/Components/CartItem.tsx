import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuantitySelection from "../../../../components/QuantitySelection";
import SizeSelection from "../../../../components/SizeSelection";
import { deleteProductOfCart, getUserShoppingCartData } from "../../../../api";
import { Noti } from "../../../../components/Noti";
import { changeCartData, changeIsLoading } from "../../../../redux/action";
import { IAllState, ICartData } from "../../../../interface";

const CartItem = ({
  id,
  image,
  name,
  price,
  quantity,
}: {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  /* Init Hooks */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* SizeSelection */
  const [sizePicker, setSizePicker] = useState<string>("L");
  /* End Size Selection */

  const makeBeautifulURL = (url: string) => {
    return url
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
      .replace(/đ/gi, "d");
  };

  const [quantityState, setQuantityState] = useState(quantity);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(parseFloat((quantityState * price).toFixed(2)));
  }, [quantityState]);

  /* Delete */
  const userInforData = useSelector(
    (allState: IAllState) => allState.userInforData
  );
  const allProductDataImmutation = useSelector(
    (allState: IAllState) => allState.allProductDataImmutation
  );
  const deleteProduct = (id: number) => {
    dispatch(changeIsLoading(true));
    /* Delete */
    deleteProductOfCart(id)
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
          `Xóa thành công sp "${res.data.title}" khỏi giỏ hàng!`,
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
  /* End Delete */

  return (
    <div className="mt-[3rem] lg:mt-[1.5rem] flex justify-between items-center border-b border-b-slate-200 pb-[1rem]">
      <div className="flex items-center 2xl:basis-[45%] xl:basis-[40%] lg:basis-[35%]">
        <div
          onClick={() => {
            navigate(`/home/product_detail/${makeBeautifulURL(name)}/${id}`);
          }}
          className="basis-[35%] sm:basis-[30%] md:basis-[20%] dark:bg-white dark:p-[0.5rem] dark:rounded-xl cursor-pointer"
        >
          <img src={image} alt="error" className="w-full" />
        </div>

        <div className="basis-[65%] sm:basis-[70%] md:basis-[80%]">
          <p
            onClick={() => {
              navigate(`/home/product_detail/${makeBeautifulURL(name)}/${id}`);
            }}
            className="px-[2rem] dark:text-white cursor-pointer transition-all hover:text-primary dark:hover:text-primaryDark"
          >
            {name}
          </p>
          {/* Mobile */}
          <div className="lg:hidden pl-[2rem] mt-[1rem] flex items-center justify-between">
            <div className="flex flex-col gap-[1rem]">
              {/* Size Selection */}
              <SizeSelection
                sizePicker={sizePicker}
                setSizePicker={setSizePicker}
                className="sm:block hidden"
              />
              {/* Price */}
              <div>
                Price:{" "}
                <span className="font-[600] dark:text-white !text-primary">
                  ${price}
                </span>
              </div>
              {/* Quantity selection */}
              <QuantitySelection
                quantityState={quantityState}
                setQuantityState={setQuantityState}
                price={price}
              />
              {/* Total */}
              <div className="dark:text-white">
                Total:{" "}
                <span className="font-[600] text-[1.2rem] dark:text-white  text-primary">
                  ${total}
                </span>
              </div>
            </div>
            {/* Remove */}
            <div
              className="xl:w-[4rem] flex justify-center"
              onClick={() => {
                deleteProduct(id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash cursor-pointer dark:text-white hover:text-primary dark:hover:text-primaryDark"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />{" "}
              </svg>
            </div>
          </div>
          {/* End Mobile */}
        </div>
      </div>

      <div className="hidden lg:flex justify-between w-[35rem] 2xl:basis-[55%] xl:basis-[60%] lg:basis-[65%] items-center">
        {/* Size Selection */}
        <SizeSelection sizePicker={sizePicker} setSizePicker={setSizePicker} />
        {/* Price */}
        <div className="font-[600] dark:text-white text-primary">${price}</div>
        {/* Quantity selection */}
        <QuantitySelection
          quantityState={quantityState}
          setQuantityState={setQuantityState}
          price={price}
        />
        {/* Total */}
        <div className="font-[600] text-[1.2rem] dark:text-white w-[3rem] text-primary">
          ${total}
        </div>
        {/* Remove */}
        <div
          className="xl:w-[4rem] flex justify-center"
          onClick={() => {
            deleteProduct(id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-trash cursor-pointer dark:text-white hover:text-primary dark:hover:text-primaryDark"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />{" "}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItem);
