import React, { memo } from "react";
import Avatar from "antd/es/avatar/avatar";
import { useSelector } from "react-redux";
import { IAllState } from "../../../interface";
import { Skeleton } from "antd";

const Account = () => {
  //get user information data from Redux
  const {
    name: { firstname, lastname },
    email,
    phone,
    address: { number, street, city },
  } = useSelector((allState: IAllState) => allState.userInforData);

  return (
    <div className="flex justify-center mt-[4rem]">
      <div className="container flex flex-col gap-[3rem]">
        {/* Avatar and name */}
        <div className="flex items-center gap-[1.5rem]">
          <Avatar
            shape="square"
            size={64}
            className="bg-primary text-white cursor-pointer"
          >
            {firstname[0]?.toLocaleUpperCase()}
          </Avatar>
          <div>
            <p className="text-2xl font-semibold dark:text-white">
              {firstname + " " + lastname || <Skeleton active />}
            </p>
            <p className="dark:text-white">User</p>
          </div>
        </div>
        {/* End Avatar and name */}

        <div className="flex flex-col gap-[0.5rem]">
          {/* Email */}
          <p className="dark:text-white">
            <span
              className="
          text-lg font-semibold dark:text-primaryDark"
            >
              Email:{" "}
            </span>
            {email || <Skeleton active />}
          </p>
          {/* End Email */}

          {/* Phone */}
          <p className="mt-[0.2rem] dark:text-white">
            <span
              className="
          text-lg font-semibold dark:text-primaryDark"
            >
              Phone:{" "}
            </span>
            {phone || <Skeleton active />}
          </p>
          {/* End Phone */}

          {/* Location */}
          <p className="dark:text-white">
            <span
              className="
          text-lg font-semibold dark:text-primaryDark"
            >
              Address:
            </span>
            {" " + number + " " + street + " " + city || <Skeleton active />}
          </p>
          {/* End location */}
        </div>
      </div>
    </div>
  );
};

export default memo(Account);
