import React from "react";
import { foodDetail } from "./component/data";
import dayjs from "dayjs";
import "dayjs/locale/th";

const Payment = ({ onPaymentClick }) => {
  const formatNumber = (num) => Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalPrice = foodDetail.reduce((sum, item) => sum + (item.price * item.count), 0);
  const totalDiscount = foodDetail.reduce((sum, item) => sum + (item.discount * item.count), 0);
  const netTotal = totalPrice - totalDiscount;
  // const tax = netTotal * 0.07;
  // const serviceCharge = netTotal * 0.05;
  // const grandTotal = netTotal + tax + serviceCharge;

  //ปัดเป็นจำนวนเต็ม
  const tax = Math.round(netTotal * 0.07);
  const serviceCharge = Math.round(netTotal * 0.05);
  const grandTotal = Math.round(netTotal + tax + serviceCharge);

  return (
    <>
      <div className="w-full h-full md:px-6 px-4 md:py-4 py-1 flex flex-col md:gap-4 xxx:gap-2 gap-1">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="rounded-xl w-[80px] h-[80px] flex justify-center items-center border border-[#EEEEEE]">
            {/* <img src="/images/img/Rectangle 912.png" alt="" className="w-full h-full object-cover rounded-xl"/> */}
            <p className="text-[20px] font-[700]">LOGO</p>
          </div>
          <p className="text-[15px] font-[500]">ชื่อร้าน</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col justify-start">
            <p className="text-[10px] font-[400]">ที่อยู่ติดต่อ</p>
            <p className="text-[9px]">เลขประจำตัวผู้เสียภาษี : 11111111121</p>
          </div>
          <div className="flex flex-col justify-end text-right">
            <p className="text-[9px]">หมายเลขออเดอร์ : 000004</p>
            <p className="text-[10px] font-[400]">{dayjs().locale("th").format("D MMMM YYYY")}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start md:gap-2 gap-1 border-t border-[#8F8F8F] pt-1">
          <p className="text-sm font-[400]">รายการทั้งหมด</p>

          <div className="overflow-auto w-full md:h-[360px] xxl:h-[200px] xxx:h-[110px] h-[200px] flex flex-col">
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
                    <p className="text-[12px] font-[300] line-through">
                      {formatNumber(item.price * item.count)}
                    </p>
                     <p className="text-[15px] font-[500]">{/* ราที่ลดแล้ว คูณกับ จำนวน */}
                      {formatNumber((item.price - item.discount) * item.count)}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] font-[300]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full py-1">
          <div className="border-t-2 border-[#CACACA] rounded-full"></div>
          <div className="flex justify-between">
            <p className="text-[15px] font-[500]">ราคา</p>
            <p className="text-[15px] font-[400]">{formatNumber(totalPrice)}฿</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[15px] font-[500]">ส่วนลด</p>
            <p className="text-[15px] font-[400]">-{formatNumber(totalDiscount)}  ฿</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[15px] font-[500]">ภาษี 7%</p>
            <p className="text-[15px] font-[400]">{formatNumber(tax)} ฿</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[15px] font-[500]">Service charge 5%</p>
            <p className="text-[15px] font-[400]">{formatNumber(serviceCharge)} ฿</p>
          </div>
          <div className="border-t-2 border-[#CACACA] border-dashed"></div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <p className="text-lg font-[500]">ยอดทั้งหมด</p>
          <p className="text-lg font-[500]">{formatNumber(grandTotal)} ฿</p>
        </div>

        <div
          className="bg-[#F44D4D] rounded-lg w-[224px] p-1 mx-auto flex justify-center items-center gap-2 cursor-pointer"
          onClick={onPaymentClick}
        >
          <p className="text-white xxx:text-[25px] text-xl font-[500]">
            ยืนยันชำระเงิน
          </p>
        </div>
      </div>
    </>
  );
};

export default Payment;
