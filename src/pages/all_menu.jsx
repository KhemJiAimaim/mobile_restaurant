import React, { useState } from "react";
import SwiperMenu from "./component/swiper";
import { cate, foodDetail } from "./component/data";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link, useParams } from "react-router-dom";

function all_menu({ api_path, foods, cateFoods, isDataLoaded, setCatePage }) {
  const swiperRef = useRef(null);
  const { cateId } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const bestSellerFilter = queryParams.get("bestseller"); // ดึงค่าพารามิเตอร์ bestseller
  const [selectedCate, setSelectedCate] = useState(cateId ? Number(cateId) : 1);

  useEffect(() => {
    if (cateId) {
      const id = Number(cateId);
      setSelectedCate(id);
      setCatePage(id);
    }
  }, [cateId]);

  const filteredFoodDetail = foods.filter((item) => {
    if (bestSellerFilter) {
      return item.best_seller === true;
    }
    return selectedCate
      ? item.cate_id.split(",").includes(selectedCate.toString())
      : true; // กรองตาม cateID
  });

  const formatNumber = (num) =>
    Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      {isDataLoaded && (
        <div
          className={`bg-white flex flex-col overflow-auto p-4 ${
            bestSellerFilter !== "1" ? "gap-4" : "gap-0"
          }`}
        >
          <div className="w-full mx-auto relative ">
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={5}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 4 },
                768: { slidesPerView: 8 },
              }}
              className="swiper-container items-center"
            >
              {bestSellerFilter !== "1" &&
                cateFoods.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => setSelectedCate(item.id)}
                  >
                    <Link
                      to={`/all-menu/${item.id}`}
                      className={`w-full flex flex-col gap-2 justify-center items-center flex-shrink-0 hover:bg-[#FFCC44] rounded-xl py-2 px-3 ${
                        selectedCate === item.id || cateId === item.id
                          ? "bg-[#FFCC44]"
                          : ""
                      }`}
                    >
                      <figure className="w-[52px] h-[53px] rounded-md">
                        <img
                          src={api_path + item.thumbnail}
                          alt={item.title}
                          className="w-full h-full"
                        />
                      </figure>
                      <p className="font-[500] md:text-base text-sm text-black">
                        {item.title}
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 md:gap-6 gap-3 place-items-center ">
            {filteredFoodDetail.length === 0 ? (
              <div className="flex justify-center w-full items-center md:col-span-3 col-span-3">
                <p className="text-center w-full text-[#8F8F8F] text-sm">
                  ไม่มีรายการอาหาร
                </p>
              </div>
            ) : (
              filteredFoodDetail.map((item, index) => (
                <Link
                  to={`/detail/${item.id}`}
                  key={item.id}
                  className="flex flex-col border border-[#D9D9D9] rounded-xl w-full h-auto"
                >
                  <figure className="w-full md:h-[200px] h-[180px] rounded-t-xl relative">
                    <img
                      src={api_path + item.thumbnail_link}
                      alt={item.name}
                      className="w-full h-full rounded-t-xl object-cover"
                    />
                  </figure>
                  <div className="px-2 py-1.5 flex flex-col bg-white rounded-b-xl">
                    <p className="line-clamp-2 text-left md:text-base text-[15px] h-[50px]">
                      {item.name}
                    </p>

                    {item.special_price !== null &&
                      item.special_price !== 0 && (
                        <p className="text-[#8F8F8F] text-[8px] text-right line-through">
                          {formatNumber(item.price)}
                        </p>
                      )}

                    <div className="flex flex-row items-center justify-end gap-0.5">
                      <p className="text-base font-[600]">
                        {item.special_price !== null && item.special_price !== 0
                          ? formatNumber(item.special_price)
                          : formatNumber(item.price)}
                      </p>
                      <p className="text-[14px]">฿</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default all_menu;
