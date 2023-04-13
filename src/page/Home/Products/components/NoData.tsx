import React, { memo } from "react";

const NoData = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-black text-center my-10 dark:text-white">
        Sorry, We don't have thing you need :(
      </h1>
    </div>
  );
};

export default memo(NoData);
