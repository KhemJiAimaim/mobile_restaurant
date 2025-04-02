import React, { useEffect, useState } from "react";
import { foodDetail } from "../component/data";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const StatusOrders = ({ api_path, orderAll }) => {
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

  const statusOrder = {
    1: { text: "รับออเดอร์", color: "bg-[#2B8EF8]" },
    2: { text: "อยู่ระหว่างปรุง", color: "bg-[#FFD000]" },
    3: { text: "รอเสิร์ฟ", color: "bg-[#F5AB3A]" },
    4: { text: "เสิร์ฟเรียบร้อย", color: "bg-[#10D024]" },
    5: { text: "ยกเลิก", color: "bg-[#F92727]" },
    6: { text: "สินค้าหมด", color: "bg-[#8F8F8F]" },
  };

  // const sortedFoodDetail = orderAll.sort((a, b) => {
  //   return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  // });

  const sortedFoodDetail = (orderAll?.orderList || []).sort(
    (a, b) => Number(a.status) - Number(b.status)
  );

  // const totals = foodDetail.reduce(
  //   (accumulator, row) => {
  //     accumulator.price += row.price || 0;
  //     accumulator.specialPrice += row.specialPrice || 0;
  //     return accumulator;
  //   },
  //   {
  //     price: 0,
  //     specialPrice: 0,
  //   }
  // );
  // const finalPrice = totals.price - totals.specialPrice;

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
                        src={api_path + item.food.thumbnail_link}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </figure>
                  </div>

                  <div className="w-full flex flex-col justify-start items-center gap-2 max-md:h-auto">
                    <div className="flex flex-row justify-between items-start w-full gap-2">
                      <p className="text-base font-[500] w-full md:h-[50px]">
                        {item.food.name}
                      </p>

                      {/* <div className="w-[25px] h-auto">
                        <figure className="w-[25px] h-[25px]">
                          <img
                            src="/images/icon/trash.png"
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </figure>
                      </div> */}
                    </div>
                    <div className="flex flex-row justify-between w-full max-xxx:gap-6 gap-12 border-b border-[#8F8F8F] border-dashed pb-1 items-center">
                      <div className="flex flex-row justify-between w-full items-center">
                        <p className="text-[20px] font-[400]">฿</p>
                        <p className="text-[20px] font-[500]">
                          {item.food.special_price !== 0 &&
                          item.food.special_price !== null
                            ? formatNumber(
                                item.food.special_price * item.amount
                              )
                            : formatNumber(item.food.price * item.amount)}
                        </p>
                      </div>
                      <div
                        className={`max-w-[100px] w-full flex justify-end rounded-sm p-1 items-center 
                    ${statusOrder[item.status]?.color}
                  `}
                      >
                        <p className="text-sm text-white text-center w-full">
                          {statusOrder[item.status]?.text}
                        </p>
                      </div>
                    </div>
                    {item.note && (
                      <div className="flex flex-col justify-start items-start w-full gap-0.5 ">
                        <p className="text-[10px] font-[500] text-[#8F8F8F]">
                          หมายเหตุ
                        </p>
                        <p className="text-[12px] font-[300]">{item.note}</p>
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
            {formatNumber(orderAll.price)} ฿
          </p>
        </div>

        <Link
          to={sortedFoodDetail.length > 0 ? "/payment" : "#"}
          className={`bg-[#F44D4D] rounded-lg w-[180px] p-1 mx-auto flex justify-center items-center gap-2 ${
            sortedFoodDetail.length <= 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <p className="text-white text-[20px] font-[500]">ชำระเงิน</p>
        </Link>
      </div>
    </>
  );
};

export default StatusOrders;
