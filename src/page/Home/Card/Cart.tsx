import React, { useEffect, useState, memo } from "react";
import { Affix, Button, Skeleton } from "antd";
import CartItem from "./Components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { IAllState } from "../../../interface";
import { initTotalAllProductPrice } from "../../../redux/action";
import Payment from "../Products/components/Payment";

const Cart = () => {
  console.log("Card Page Render");

  // Hooks init
  const dispatch = useDispatch();

  //Get cart data
  const cartData = useSelector((allState: IAllState) => allState.cartData);

  /* calculate total price */
  const totalPrice = useSelector(
    (allState: IAllState) => allState.totalAllProductPrice
  );
  useEffect(() => {
    let sum = 0;
    cartData.forEach((element) => {
      sum += element.productData.price * element.quantity;
    });
    dispatch(initTotalAllProductPrice(parseFloat(sum.toFixed(2))));
  }, [cartData]);
  /* End calculate total price */

  /* Bill Data  */
  const billData = {
    productData: cartData.map((element) => ({
      id: element.productData?.id,
      img: element.productData?.image,
      title: element.productData?.title,
      quantity: element.quantity,
      price: element.productData?.price,
      size: "L",
    })),
    total: totalPrice,
  };
  /* End Bill Data */

  /* Payment Modal */
  const [open, setOpen] = useState(false);
  /* End payment Modal */

  const isLoading = useSelector((allState: IAllState) => allState.isLoading);

  return (
    <div className="flex justify-center">
      <div className="2xl:w-[80rem] xl:w-[70rem] xl:px-0 lg:w-[60rem] lg:px-0 ssm:px-[3rem] px-[1rem]">
        {/* Cart Header */}
        <h1 className="mt-[3rem] text-primary text-center dark:text-primaryDark">
          My Shopping Cart
        </h1>

        <div className="hidden lg:flex justify-between my-[2rem] py-[1rem] px-[1.5rem] shadow-lg rounded-lg dark:bg-slate-800">
          <div className="2xl:basis-[45%] xl:basis-[40%] lg:basis-[35%] font-[600] dark:text-white">
            Product
          </div>
          <div className="flex 2xl:basis-[55%] xl:basis-[60%] lg:basis-[65%]">
            <div className="font-[600] 2xl:ml-[5.5rem] xl:ml-[5.5rem] lg:ml-[5.5rem] dark:text-white">
              Size
            </div>
            <div className="font-[600] 2xl:ml-[9.5rem] xl:ml-[9rem] lg:ml-[9rem] dark:text-white ">
              Price
            </div>
            <div className="font-[600] 2xl:ml-[5rem] xl:ml-[4.5rem] lg:ml-[4rem] dark:text-white">
              Quantity
            </div>
            <div className="font-[600] 2xl:ml-[5rem] xl:ml-[4.5rem] lg:ml-[4.5rem] dark:text-white ">
              Total
            </div>
            <div className="font-[600]  2xl:ml-[3.5rem] 2xl:block xl:ml-[2.8rem] xl:block hidden dark:text-white">
              Remove
            </div>
          </div>
        </div>
        {/* End Cart Header */}

        {/* Cart Item */}
        <Skeleton active avatar loading={isLoading}>
          <div className="px-[1rem]">
            {cartData.map((element) => (
              <CartItem
                key={element.productData.id}
                id={element.productData.id}
                image={element.productData.image}
                name={element.productData.title}
                price={element.productData.price}
                quantity={element.quantity}
              />
            ))}
          </div>
        </Skeleton>
        {/* End Cart Item */}

        {/* Cart Footer */}
        <Affix offsetBottom={0}>
          <div className="shadow-top py-[1rem] bg-white dark:bg-slate-800 dark:rounded-lg dark:px-[1rem] z-10 flex ssm:flex-row justify-end ssm:items-center ssm:gap-[2rem] gap-[1rem] items-end">
            <div className="dark:text-white">
              Total ({cartData.length} product):
              <span className="font-[600] text-[1.3rem] ml-[1rem] text-primary dark:text-white">
                ${totalPrice}
              </span>
            </div>
            <Button
              type="primary"
              className="bg-primary w-[10rem] h-[2.5rem] dark:text-white"
              onClick={() => {
                setOpen(true);
              }}
            >
              Payment
            </Button>
          </div>
        </Affix>
        {/* End Cart Footer */}

        {/* Payment Modal */}
        <Payment open={open} setOpen={setOpen} billData={billData} />
        {/* End Payment Modal */}
      </div>
    </div>
  );
};

export default memo(Cart);
