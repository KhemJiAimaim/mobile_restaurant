import React from "react";

const SpawnLoadingOrder = () => {
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center h-full max-w-[768px] w-full p-4">
        <figure className="w-[120px] h-[120px] ">
          <img src="/images/loading/cooking.gif" alt="" />
        </figure>
        <div className="flex flex-col gap-1">
          <p className="text-[40px] text-center font-[600]">กรุณารอสักครู่</p>
          <p className="text=[25px] text-center font-[600]">
            กำลังส่งรายการอาหารไปที่ครัว
          </p>
        </div>
      </div>
    </>
  );
};

export default SpawnLoadingOrder;
