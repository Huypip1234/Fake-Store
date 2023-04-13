import { Button, Input, Modal } from "antd";
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
// image
import logo from "../../../../assets/logo.png";
import { useSelector } from "react-redux";
import { IAllState } from "../../../../interface";
import { Noti } from "../../../../components/Noti";

interface IBillData {
  productData: {
    id?: number;
    img?: string;
    title?: string;
    quantity?: number;
    price?: number;
    size?: string;
  }[];
  total?: number;
}

const Payment = ({
  open,
  setOpen,
  billData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  billData: IBillData;
}) => {
  /* Antd Modal */
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      Noti(
        "success",
        "Đặt hàng thành công",
        "Đơn hàng sẽ được giao tới bạn sớm!"
      );
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  /* End Antd Modal */

  /* UserData */
  const userInforData = useSelector(
    (allState: IAllState) => allState.userInforData
  );
  /* End UserData */

  return (
    <Modal
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="w-[8rem] h-[2.5rem]"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
          className="bg-primary w-[8rem] h-[2.5rem]"
        >
          Confirm
        </Button>,
      ]}
    >
      {/* Main */}
      <div>
        {/* Header */}
        <div className="flex items-center">
          <div className="flex">
            <div>
              <Link to="all_product/1">
                <img src={logo} alt="Lỗi rùi ahuhu" className="w-[3.5rem]" />
              </Link>
            </div>
            <h1 className="text-[1.5rem] flex items-center ml-[1rem] text-primary ease-in-out duration-300">
              <Link to="all_product/1" className="hover:text-primary">
                Fake Store
              </Link>
            </h1>
          </div>
          <div className="border-l px-[1rem] h-[2rem] border-l-primary text-[1.5rem] hidden ultraSm:flex items-center ml-[1rem] text-primary ease-in-out duration-300">
            Payment
          </div>
        </div>
        {/* End Header */}

        {/* Product */}
        {billData?.productData?.map((element) => {
          return (
            <div
              key={element.id}
              className="py-[2rem] flex items-center justify-between"
            >
              <div className="flex gap-[1rem] items-center">
                <div className="w-[5rem]">
                  <img src={element.img} alt="error" />
                </div>
                <div>
                  <p>{element.title}</p>
                  <p>Size: {element.size}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p>x{element.quantity}</p>
                <p>${element.price}</p>
              </div>
            </div>
          );
        })}

        {/* End Product */}

        {/* Receiver */}
        <div>
          <p>
            Receiver:{" "}
            <span className="text-black text-[1rem]">
              {userInforData.name.firstname + " " + userInforData.name.lastname}
            </span>
          </p>
          <p>
            Phone:{" "}
            <span className="text-black text-[1rem]">
              {userInforData.phone}
            </span>
          </p>
          <p>
            Email:{" "}
            <span className="text-black text-[1rem]">
              {userInforData.email}
            </span>
          </p>
          <p>
            Address:{" "}
            <span className="text-black text-[1rem]">
              {" " +
                userInforData.address.number +
                " " +
                userInforData.address.street +
                " " +
                userInforData.address.city}
            </span>
          </p>
        </div>
        {/* End Receiver */}

        {/* Voucher */}
        <div className="mt-[2rem] mb-[1rem]">
          <p>Voucher:</p>
          <Input
            className="my-[0.5rem]"
            placeholder="Enter your Fake Store Voucher"
          />
        </div>
        {/* End  Voucher */}

        {/* Total */}
        <div className="flex justify-end border-b pb-[0.5rem]">
          <p>
            Total:{" "}
            <span className="text-primary text-2xl ml-[0.5rem]">
              ${billData.total}
            </span>
          </p>
        </div>

        {/* End Total */}
      </div>
      {/* End Main */}
    </Modal>
  );
};

export default memo(Payment);
