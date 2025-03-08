import React, { useEffect, useState } from "react";
import { foodDetail } from "./component/data";
import dayjs from "dayjs";
import "dayjs/locale/th";

const Payment = ({ onPaymentClick }) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [tax, setTaxTotal] = useState(7);
  const [serviceCharge, setServiceCharge] = useState(5);

  useEffect(() => {
    const updateSize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reducedHeight =
    tax === 0 && serviceCharge === 0
      ? window.innerWidth >= 768
        ? height - 530
        : window.innerWidth >= 360
        ? height - 470
        : height - 400
      : tax > 0 || serviceCharge > 0
      ? window.innerWidth >= 768
        ? height - 570
        : window.innerWidth >= 360
        ? height - 510
        : height - 400
      : //ถ้าไม่มี tax และ serviceCharge
      window.innerWidth >= 768
      ? height - 590
      : window.innerWidth >= 360
      ? height - 300
      : height - 400;

  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalPrice = foodDetail.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const totalSpecialPrice = foodDetail.reduce(
    (sum, item) => sum + item.specialPrice * item.count,
    0
  );

  const totalDiscount = totalPrice - totalSpecialPrice;

  const serviceChargeTotal = totalSpecialPrice * (5 / 100);

  const grandTotal = totalSpecialPrice + serviceChargeTotal;

  const taxTotal = grandTotal * (7 / 100);

  const Tatal = grandTotal + taxTotal;

  console.log(Tatal);

  //ปัดเป็นจำนวนเต็ม
  // const tax = Math.round(netTotal * 0.07);
  // const serviceCharge = Math.round(netTotal * 0.05);
  // const grandTotal = Math.round(netTotal + tax + serviceCharge);

  return (
    <div>
      <div className="w-full h-full md:px-6 px-4 md:py-4 py-1 flex flex-col justify-between md:gap-4 xxx:gap-2 gap-1">
        <div className="flex flex-row justify-between items-end gap-2 ">
          <div className="rounded-xl w-[80px] h-[80px] flex justify-center items-center border border-[#EEEEEE]">
            {/* <img src="/images/img/Rectangle 912.png" alt="" className="w-full h-full object-cover rounded-xl"/> */}
            <p className="text-[20px] font-[700]">LOGO</p>
          </div>
          <p className="text-[15px] font-[500]">ชื่อร้าน</p>
        </div>

        <div className="flex justify-between pt-2">
          <div className="flex flex-col justify-start">
            <p className="text-sm font-[400]">ที่อยู่ติดต่อ</p>
            <p className="text-[12px]">เลขประจำตัวผู้เสียภาษี : 11111111121</p>
          </div>
          <div className="flex flex-col justify-end text-right">
            <p className="text-sm font-[400]">หมายเลขออเดอร์ : 000004</p>
            <p className="text-[12px]">
              {dayjs().locale("th").format("D MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start md:gap-2 gap-1 border-t border-[#8F8F8F] pt-1">
          <p className="text-sm font-[400]">รายการทั้งหมด</p>

          <div
            style={{ height: `calc(${reducedHeight}px)` }}
            className="overflow-auto w-full flex flex-col gap-1"
          >
            {foodDetail.map((item, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="flex flex-row justify-between w-full items-end gap-4">
                  <p className="text-[15px] font-[500] line-clamp-1 w-[50%]">
                    {item.name}
                  </p>

                  <p className="text-[15px] font-[500] text-center w-[10%]">
                    {item.count}
                  </p>

                  <div className="w-full flex flex-col justify-end text-right flex-1">
                    {item.specialPrice && (
                      <p className="text-[12px] font-[300] line-through">
                        {formatNumber(item.price * item.count)}
                      </p>
                    )}

                    <p className="text-[15px] font-[500]">
                      {/* ราคาที่ลดแล้ว คูณกับ จำนวน */}
                      {item.specialPrice
                        ? formatNumber(item.specialPrice * item.count)
                        : formatNumber(item.price * item.count)}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] font-[300] max-w-[50%] w-full">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full py-1">
          <div className="border-t-2 border-[#CACACA] rounded-full"></div>
          <div className="flex justify-between">
            <p className="text-[14px] font-[500]">ราคา</p>
            <p className="text-[14px] font-[400]">
              {formatNumber(totalSpecialPrice)} ฿
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px] font-[500]">ส่วนลด</p>
            <p className="text-[14px] font-[400]">
              -{formatNumber(totalDiscount)} ฿
            </p>
          </div>

          {tax !== 0 && (
            <div className="flex justify-between">
              <p className="text-[14px] font-[500]">ภาษี 7%</p>
              <p className="text-[14px] font-[400]">
                {formatNumber(taxTotal)} ฿
              </p>
            </div>
          )}

          {serviceCharge !== 0 && (
            <div className="flex justify-between">
              <p className="text-[14px] font-[500]">Service charge 5%</p>
              <p className="text-[14px] font-[400]">
                {formatNumber(serviceChargeTotal)} ฿
              </p>
            </div>
          )}

          <div className="border-t-2 border-[#CACACA] border-dashed"></div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <p className="text-lg font-[500]">ยอดทั้งหมด</p>
          <p className="text-lg font-[500]">{formatNumber(Tatal)} ฿</p>
        </div>

        <div
          className="bg-[#F44D4D] rounded-lg w-[224px] p-1 mx-auto flex justify-center items-center gap-2 cursor-pointer"
          onClick={onPaymentClick}
        >
          <p className="text-white text-xl font-[500]">ยืนยันชำระเงิน</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
