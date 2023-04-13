import React, { Dispatch, useState, memo } from "react";
import { useDispatch } from "react-redux";
import {
  increaseTotalAllProductPrice,
  decreaseTotalAllProductPrice,
} from "../redux/action";

const QuantitySelection = ({
  quantityState,
  setQuantityState,
  price,
  className,
}: {
  quantityState: number;
  setQuantityState: Dispatch<React.SetStateAction<number>>;
  price: number;
  className?: string;
}) => {
  const dispatch = useDispatch();
  return (
    <div className={"" + className}>
      <div className="flex">
        <div
          className={`border w-[2rem] dark:text-white h-[2rem] flex justify-center items-center cursor-pointer select-none ${
            quantityState <= 0 &&
            "bg-slate-300 cursor-not-allowed dark:text-black"
          }`}
          onClick={() => {
            if (quantityState > 0) {
              setQuantityState(quantityState - 1);
              dispatch(
                decreaseTotalAllProductPrice(parseFloat(price.toFixed(2)))
              );
            }
          }}
        >
          -
        </div>
        <div className="border w-[3rem] dark:text-white h-[2rem] flex justify-center items-center">
          {quantityState}
        </div>
        <div
          className="border w-[2rem] dark:text-white h-[2rem] flex justify-center items-center cursor-pointer select-none"
          onClick={() => {
            setQuantityState(quantityState + 1);
            dispatch(
              increaseTotalAllProductPrice(parseFloat(price.toFixed(2)))
            );
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default memo(QuantitySelection);
