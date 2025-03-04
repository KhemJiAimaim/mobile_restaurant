import React from "react";

const SpawnLoading = () => {
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center h-full max-w-[768px] w-full p-4">
        <div className="border border-[#EEEEEE] rounded-xl w-[220px] h-[220px] flex items-center justify-center">
          <p className="text-[50px] font-[700]">LOGO</p>
        </div>
        <figure className="animate-spin w-[150px] h-[150px] ">
          <img src="/images/loading/loding.png" alt="" />
        </figure>
        <div className="flex flex-col gap-1">
          <p className="text-[40px] text-center font-[600]">กรุณารอสักครู่</p>{" "}
          <p className="text=[25px] text-center font-[600]">
            พนักงานกำลังดำเนินการ
          </p>
        </div>
      </div>
    </>
  );
};

export default SpawnLoading;
