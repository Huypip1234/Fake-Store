import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const SumaryCartItem = ({
  id,
  image,
  name,
  price,
}: {
  id: number;
  image: string;
  name: string;
  price: number;
}) => {
  // Init hooks
  const navigate = useNavigate();

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

  return (
    <li className="flex justify-between py-[1rem] border-b border-b-slate-200 items-center">
      <div
        onClick={() => {
          navigate(`/home/product_detail/${makeBeautifulURL(name)}/${id}`);
        }}
        className="flex items-center gap-[1rem] basis-[90%] cursor-pointer group"
      >
        {/* Image */}
        <div className="basis-[20%]">
          <img src={image} alt="err" />
        </div>
        {/* Name */}
        <p className="basis-[80%] group-hover:text-primary">{name}</p>
      </div>

      {/* Price */}
      <p className="font-[600] basis-[10%] ml-[1rem] text-[1rem] text-primary">
        ${price}
      </p>
    </li>
  );
};

export default memo(SumaryCartItem);
