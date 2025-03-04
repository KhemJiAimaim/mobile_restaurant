import React, { useState } from "react";
import SwiperMenu from "./component/swiper";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { cate, foodDetail } from "./component/data";

function index() {
  const swiperRef = useRef(null);
  const [selectedCate, setSelectedCate] = useState(null);

  const filteredFoodDetail = selectedCate
    ? foodDetail.filter((item) => item.cateID === selectedCate)
    : foodDetail;

  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-white flex flex-col overflow-auto">
      <div className="bg-[#313131] p-6 ">
        <div className="flex flex-row items-end gap-2">
          <p className="text-white md:text-2xl text-xl font-[600] flex-shrink-0">
            สินค้าขายดี
          </p>
          <div className="border-t border-white w-full mb-2 rounded-full"></div>
          <Link
            to="/all-menu"
            className="border border-white mb-2 rounded-full w-[70px] flex-shrink-0 hover:bg-[#FFBA41] "
          >
            <p className="text-white text-center tracking-[1px]">ทั้งหมด</p>
          </Link>
        </div>

        <SwiperMenu />
      </div>

      <div className="bg-[#FFCC44] w-full mx-auto relative p-4">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={5}
          // loop={true}
          breakpoints={{
            0: { slidesPerView: 4 },
            768: { slidesPerView: 8 },
          }}
          className="swiper-container items-center"
        >
          {cate.map((item, index) => (
            <SwiperSlide key={index} onClick={() => setSelectedCate(item.id)}>
              <Link
                to={`/all-menu/${item.id}`}
                className="w-[70px] flex flex-col gap-2 justify-center items-center flex-shrink-0"
              >
                <figure className="w-[52px] h-[53px] rounded-md">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </figure>
                <p className="font-[500] md:text-base text-sm text-black">
                  {item.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-3 md:gap-6 gap-2 p-4 place-items-center ">
        {filteredFoodDetail.map((item, index) => (
          <Link
            to={`/detail/${item.id}`}
            key={index}
            className="flex flex-col border border-[#D9D9D9] rounded-xl w-full md:h-[230px] h-[200px]"
          >
            <figure className="w-full md:h-[150px] h-[122px] rounded-t-xl relative">
              <img
                src={item.images}
                alt=""
                className=" w-full h-full rounded-t-xl object-cover"
              />
              <div className="w-[20px] h-[20px] absolute top-2 left-2">
                <img
                  src="/images/icon/Group 1728.png"
                  alt=""
                  className=" w-full h-full"
                />
              </div>
            </figure>

            <div className="px-2 py-1.5 flex flex-col justify-between h-[78px]">
              <p className="line-clamp-1 text-left md:text-base text-[15px]">
                {item.name}
              </p>

              {item.discount && (
                <p className="text-[#8F8F8F] text-[8px] text-right line-through">
                  {formatNumber(item.price)}
                </p>
              )}

              <div className="flex flex-row items-center justify-end gap-0.5">
                <p className="text-base font-[600]">
                  {item.discount
                    ? formatNumber(item.price - item.discount)
                    : formatNumber(item.price)}
                </p>
                <p className="text-[14px]">฿</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default index;
