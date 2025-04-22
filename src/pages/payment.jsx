import React, { useEffect, useState } from "react";
import { foodDetail } from "./component/data";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Cookies from "js-cookie";

const Payment = ({
  api_path,
  onPaymentClick,
  orderAll,
  generalInfoMap,
  contactInfoMap,
  taxAndServiceMap,
  onCheckBill,
}) => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateSize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reducedHeight =
    Number(taxAndServiceMap?.tax_rate?.info_value) === 0 &&
    Number(taxAndServiceMap?.service_rate?.info_value) === 0
      ? window.innerWidth >= 768
        ? height - 530
        : window.innerWidth >= 360
        ? height - 470
        : height - 400
      : Number(taxAndServiceMap?.tax_rate?.info_value) > 0 ||
        Number(taxAndServiceMap?.service_rate?.info_value) > 0
      ? window.innerWidth >= 768
        ? height - 625
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

  // คำนวณราคา
  // ราคาเต็ม
  const priceAll = (orderAll.orderList || []).reduce(
    (sum, item) => sum + (item.food.price || 0) * item.amount,
    0
  );

  // ส่วนลดทั้งหมด
  const discountAll = (orderAll.orderList || []).reduce(
    (sum, item) =>
      item.food.special_price !== 0 && item.food.special_price !== null
        ? sum + (item.food.price - item.food.special_price) * item.amount
        : sum + 0,
    0
  );

  // ราคาหลังหักส่วนลด
  const netSubtotal = priceAll - discountAll;

  // ราคา service charge
  const serviceChargePrice =
    netSubtotal * (Number(taxAndServiceMap?.service_rate?.info_value) / 100);

  // ราคาภาษี
  const taxPrice =
    ((netSubtotal + serviceChargePrice) *
      Number(taxAndServiceMap?.tax_rate?.info_value)) /
    100;

  // ราคาสุทธิ
  const totalPrice = netSubtotal + serviceChargePrice + taxPrice;

  return (
    <div>
      <div className="w-full h-full md:px-6 px-4 md:py-4 py-1 flex flex-col justify-between md:gap-4 xxx:gap-2 gap-1">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <div className="inline-flex justify-center items-center overflow-hidden">
            {generalInfoMap.web_logo?.info_link ? (
              <img
                src={api_path + generalInfoMap.web_logo?.info_link}
                alt=""
                className="max-w-[120px] max-h-[120px] object-contain"
              />
            ) : null}
          </div>
          {/* <p className="text-[20px] font-[700]">LOGO</p> */}
          <p className="text-[15px] font-[500]">
            {contactInfoMap.shop_name?.info_value}
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <div className="flex flex-col justify-start">
            <p className="text-sm font-[400]">
              ที่อยู่ติดต่อ : {contactInfoMap?.address?.info_value}
            </p>
            {contactInfoMap?.tax_number?.info_value !== "" &&
              contactInfoMap?.tax_number?.info_value !== null && (
                <p className="text-[12px]">
                  เลขประจำตัวผู้เสียภาษี :{" "}
                  {contactInfoMap?.tax_number?.info_value}
                </p>
              )}
          </div>
          <div className="flex flex-col justify-end text-right">
            <p className="text-sm font-[400]">
              หมายเลขออเดอร์ : {orderAll.order_number}
            </p>
            <p className="text-[12px]">
              {dayjs().locale("th").format("D MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start md:gap-2 gap-1 border-t border-[#8F8F8F] pt-1">
          <p className="text-sm font-[400]">รายการทั้งหมด</p>

          <div
            style={{ height: `calc(${reducedHeight}px)` }}
            className="overflow-auto w-full flex flex-col gap-1 pt-4.5"
          >
            {(orderAll?.orderList || []).map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-end items-start min-h-[41px]"
              >
                <div className="flex flex-row justify-between w-full items-end gap-4">
                  <p className="text-[15px] font-[500] line-clamp-1 w-[50%]">
                    {item.food.name}
                  </p>

                  <p className="text-[15px] font-[500] text-center w-[10%]">
                    {item.amount}
                  </p>

                  <div className="w-full flex flex-col justify-end text-right flex-1">
                    {item.food.special_price !== 0 &&
                      item.food.special_price !== null && (
                        <p className="text-[12px] font-[300] line-through">
                          {formatNumber(item.food.price * item.amount)}
                        </p>
                      )}

                    <p className="text-[15px] font-[500]">
                      {/* ราคาที่ลดแล้ว คูณกับ จำนวน */}
                      {item.food.special_price !== 0 &&
                      item.food.special_price !== null
                        ? formatNumber(item.food.special_price * item.amount)
                        : formatNumber(item.food.price * item.amount)}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] font-[300] max-w-[50%] w-full">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full py-1">
          <div className="border-t-2 border-[#CACACA] rounded-full"></div>
          <div className="flex justify-between">
            <p className="text-[14px] font-[500]">ราคา</p>
            <p className="text-[14px] font-[400]">{formatNumber(priceAll)} ฿</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px] font-[500]">ส่วนลด</p>
            <p className="text-[14px] font-[400]">
              - {formatNumber(discountAll)} ฿
            </p>
          </div>

          {Number(taxAndServiceMap?.tax_rate?.info_value) !== 0 &&
            Number(taxAndServiceMap?.tax_rate?.info_value) !== null && (
              <div className="flex justify-between">
                <p className="text-[14px] font-[500]">
                  {taxAndServiceMap?.tax_rate?.info_title}{" "}
                  {taxAndServiceMap?.tax_rate?.info_value}%
                </p>
                <p className="text-[14px] font-[400]">
                  {formatNumber(taxPrice)} ฿
                </p>
              </div>
            )}

          {Number(taxAndServiceMap?.service_rate?.info_value) !== 0 &&
            Number(taxAndServiceMap?.service_rate?.info_value) !== null && (
              <div className="flex justify-between">
                <p className="text-[14px] font-[500]">
                  {taxAndServiceMap?.service_rate?.info_title}{" "}
                  {taxAndServiceMap?.service_rate?.info_value}%
                </p>
                <p className="text-[14px] font-[400]">
                  {formatNumber(serviceChargePrice)} ฿
                </p>
              </div>
            )}

          <div className="border-t-2 border-[#CACACA] border-dashed"></div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <p className="text-lg font-[500]">ยอดทั้งหมด</p>
          {totalPrice !== 0 && totalPrice !== null && (
            <p className="text-lg font-[500]">{formatNumber(totalPrice)} ฿</p>
          )}
        </div>

        <div
          className="bg-[#F44D4D] rounded-lg w-[224px] p-1 mx-auto flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => onPaymentClick(() => onCheckBill(2))}
        >
          <p className="text-white text-xl font-[500]">ยืนยันชำระเงิน</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
