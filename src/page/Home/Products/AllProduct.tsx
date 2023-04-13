// interface
import { Outlet } from "react-router-dom";
import { memo } from "react";

const AllProduct = () => {
  console.log("All Product render");

  return (
    <div className="mt-[2.5rem] md:mt-[4rem]">
      <Outlet />
    </div>
  );
};

export default memo(AllProduct);
