import React, { useEffect, useState } from "react";
import { foodDetail } from "../component/data";
import { Link } from "react-router-dom";

const StatusOrders = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateSize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reducedHeight =
    window.innerWidth >= 768
      ? height - 300
      : window.innerWidth >= 360
      ? height - 290
      : height - 200;
  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const statusOrder = ["อยู่ระหว่างปรุง", "พร้อมเสริฟ", "รายการครบ", "ยกเลิก"];

  const sortedFoodDetail = foodDetail.sort((a, b) => {
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  const totals = foodDetail.reduce(
    (accumulator, row) => {
      accumulator.price += row.price || 0;
      accumulator.discount += row.discount || 0;
      return accumulator;
    },
    {
      price: 0,
      discount: 0,
    }
  );
  const finalPrice = totals.price - totals.discount;

  return (
    <>
      <div className="h-full flex flex-col justify-between gap-2">
        <div
          style={{ height: `calc(${reducedHeight}px)` }}
          className="overflow-y-auto"
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {sortedFoodDetail.length === 0 ? (
              <div className="flex justify-center w-full items-center col-span-2">
                <p className="text-center w-full text-[#8F8F8F] text-sm">
                  ไม่มีรายการอาหาร
                </p>
              </div>
            ) : (
              sortedFoodDetail.map((item, index) => (
                <div
                  key={index}
                  className=" border border-[#D9D9D9] rounded-sm bg-[#FFF9EA] px-3 py-2 flex flex-row gap-6"
                >
                  <div className="max-w-full w-[20%]">
                    <figure className="w-[80px] h-[80px] rounded-xl">
                      <img
                        src={item.images}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </figure>
                  </div>

                  <div className="w-full flex flex-col justify-start items-center gap-2 max-md:h-auto">
                    <div className="flex flex-row justify-between items-start w-full gap-2">
                      <p className="text-base font-[500] w-full md:h-[50px]">
                        {item.name}
                      </p>

                      <div className="w-[25px] h-auto">
                        <figure className="w-[25px] h-[25px]">
                          <img
                            src="/images/icon/trash.png"
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-full max-xxx:gap-6 gap-12 border-b border-[#8F8F8F] border-dashed pb-1 items-center">
                      <div className="flex flex-row justify-between w-full items-center">
                        <p className="text-[20px] font-[400]">฿</p>
                        <p className="text-[20px] font-[500]">
                          {formatNumber(item.price - item.discount)}
                        </p>
                      </div>
                      <div
                        className={`max-w-[100px] w-full flex justify-end rounded-sm p-1 items-center 
                    ${
                      item.status === "พร้อมเสริฟ"
                        ? "bg-[#F92727]"
                        : item.status === "รายการครบ"
                        ? "bg-[#10D024]"
                        : item.status === "อยู่ระหว่างปรุง"
                        ? "bg-[#F5AB3A]"
                        : item.status === "ยกเลิก"
                        ? "bg-[#8F8F8F]"
                        : " "
                    }
                  `}
                      >
                        <p className="text-sm text-white text-center w-full">
                          {item.status}
                        </p>
                      </div>
                    </div>
                    {item.detail && (
                      <div className="flex flex-col justify-start items-start w-full gap-0.5 ">
                        <p className="text-[10px] font-[500] text-[#8F8F8F]">
                          หมายเหตุ
                        </p>
                        <p className="text-[12px] font-[300]">{item.detail}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-between w-full mt-4 ">
          <p className="text-[20px] font-[500]">ยอดรวมทั้งหมด</p>
          <p className="text-[20px] font-[600]">
            {formatNumber(finalPrice)} ฿
          </p>
        </div>

        <Link
          to="/payment"
          className="bg-[#F44D4D] rounded-lg w-[180px] p-1 mx-auto flex justify-center items-center gap-2"
        >
          <p
            className="text-white text-[20px] font-[500]"
            disabled={sortedFoodDetail.length === 0}
          >
            ชำระเงิน
          </p>
        </Link>
      </div>
    </>
  );
};

export default StatusOrders;
