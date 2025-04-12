import React from "react";

const SpawnLoading = ({ api_path, logo }) => {
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center h-full max-w-[768px] w-full p-4">
        <div className="flex items-center justify-center overflow-hidden">
          {logo ? (
            <img
              src={api_path + logo}
              alt=""
              className="max-w-[250px] max-h-[250px] object-cover"
            />
          ) : null}
        </div>
        <figure className="animate-spin w-[110px] h-[110px] ">
          <img src="/images/loading/loding.png" alt="" />
        </figure>
        <div className="flex flex-col gap-1">
          <p className="text-[40px] text-center font-[600]">กรุณารอสักครู่</p>{" "}
          <p className="text=[25px] text-center font-[600]">
            พนักงานกำลังไปที่โต๊ะของท่าน
          </p>
        </div>
      </div>
    </>
  );
};

export default SpawnLoading;
