import React, { memo } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IAllState } from "../../../interface";
import SumaryCartItem from "./Components/SummaryCartItem";

const SumaryCart = () => {
  //Get cart data
  const cartData = useSelector((allState: IAllState) => allState.cartData);
  return (
    <div className="py-[1rem] px-[1.5rem] w-[25rem]">
      <ul>
        {cartData.map((element) => (
          <SumaryCartItem
            key={element.productData.id}
            id={element.productData.id}
            image={element.productData.image}
            name={element.productData.title}
            price={element.productData.price}
          />
        ))}
      </ul>
      <Link to={"/home/Cart"} className="flex justify-end mt-[1rem]">
        <Button type="primary" className="bg-primary w-[9rem]">
          View Cart
        </Button>
      </Link>
    </div>
  );
};

export default memo(SumaryCart);
