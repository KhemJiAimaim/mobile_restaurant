import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { foodDetail } from "../component/data";

function SwiperMenu() {
  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <div className="w-full mx-auto md:pt-6 pt-4 relative">
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={10}
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {foodDetail
            .filter((item) => item.bestSeller === 1)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  to={`/detail/${item.id}`}
                  className="flex flex-col rounded-xl w-full  h-[260px]"
                >
                  <figure className="w-full  h-[180px] rounded-t-xl relative">
                    <img
                      src={item.images}
                      alt=""
                      className="w-full h-full rounded-t-xl object-cover"
                    />
                    <div className="w-[29px] h-[29px] absolute top-2 left-2">
                      <img
                        src="/images/icon/Group 1728.png"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </figure>
                  <div className="px-2 py-1.5 flex flex-col justify-between bg-white rounded-b-xl h-[80px]">
                    <p className="line-clamp-2 text-left md:text-base text-[15px] h-[50px]">
                      {item.name}
                    </p>

                    {item.discount && (
                      <p className="text-[#8F8F8F] text-[10px] text-right line-through">
                        {formatNumber(item.price)}
                      </p>
                    )}
                    <div className="flex flex-row items-center justify-end gap-0.5">
                      <p className="text-base font-[600] ">
                      {item.discount
                    ? formatNumber(item.price - item.discount)
                    : formatNumber(item.price)}
                      </p>
                      <p className="text-[14px]">฿</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* ปุ่ม Custom Navigation */}
        <figure className="btn-prev absolute top-1/2 md:-left-5 -left-5 -translate-y-1/2 shadow-md z-10 w-[21px] h-[21px]">
          <img src="/images/icon/prev.png" alt="" className="w-full h-full" />
        </figure>
        <figure className="btn-next absolute top-1/2 md:-right-5 -right-5 -translate-y-1/2 shadow-md z-10 w-[21px] h-[21px]">
          <img src="/images/icon/next.png" alt="" className="w-full h-full" />
        </figure>
      </div>
    </>
  );
}

export default SwiperMenu;
