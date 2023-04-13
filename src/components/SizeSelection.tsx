import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";

const SizeSelection = ({
  sizePicker,
  setSizePicker,
  className,
}: {
  sizePicker: string;
  setSizePicker: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) => {
  console.log("sizeSelection render");

  return (
    <div className={"" + className}>
      <div className="flex gap-[1rem]">
        <div
          className={`sizePicker dark:text-white ${
            sizePicker === "L" && "activeSizePicker"
          }`}
          onClick={() => {
            setSizePicker("L");
          }}
        >
          L
        </div>
        <div
          className={`sizePicker dark:text-white ${
            sizePicker === "XL" && "activeSizePicker"
          }`}
          onClick={() => {
            setSizePicker("XL");
          }}
        >
          XL
        </div>
        <div
          className={`sizePicker dark:text-white ${
            sizePicker === "XLXX" && "activeSizePicker"
          }`}
          onClick={() => {
            setSizePicker("XLXX");
          }}
        >
          XLXX
        </div>
      </div>
    </div>
  );
};

export default memo(SizeSelection);
