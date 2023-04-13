import React, { memo } from "react";
import { Link } from "react-router-dom";
// interface
import { IAllProductData } from "../../../../interface";
// image
import tiny from "../../../../assets/image/tiny.jpg";
import logo from "../../../../assets/logo.png";
import ProgressiveImage from "react-progressive-graceful-image";

interface IProps {
  item: IAllProductData;
}

const ProductItem = ({ item }: IProps) => {
  /* console.log("Product Item render"); */

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
    <li
      className="group product_item shadow-xl rounded-[0.7rem] flex flex-col cursor-pointer hover:shadow-2xl hover:translate-y-[-0.5rem]
			dark:bg-slate-800 ease-in-out duration-300"
    >
      <Link
        to={`/home/product_detail/${makeBeautifulURL(item.title)}/${item.id}`}
      >
        <div className="flex justify-center h-[15rem] p-[1rem] ultraSm:p-[1.5rem] ease-in-out duration-300 dark:bg-white rounded-t-[0.7rem]">
          {/* <img
            src={item.image}
            className="group-hover:scale-[105%] object-contain ease-in-out duration-300"
            alt="lỗi rùi ahuhu"
          /> */}
          <ProgressiveImage src={item.image || logo} placeholder={tiny}>
            {(src: string, loading) => (
              <img
                src={src}
                className={`group-hover:scale-[105%] object-contain ease-in-out duration-300 ${
                  loading ? "blur-md" : "blur-none"
                }`}
                alt="lỗi rùi ahuhu"
              />
            )}
          </ProgressiveImage>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="text_threedot_2line ease-in-out duration-300 dark:text-white">
            {item.title}
          </div>
          <div className="font-bold text-xl mt-2 ease-in-out duration-300 dark:text-white">
            ${item.price}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default memo(ProductItem);
