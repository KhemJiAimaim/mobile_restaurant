import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { cate, foodDetail } from "./component/data";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams(); // ดึง `id` จาก URL
  const navigate = useNavigate();
  const menu = foodDetail.find((item) => item.id === parseInt(id)); // ค้นหาข้อมูลเมนู
  const [text, setText] = useState("");
  const [count, setCount] = useState(1);

  const formatNumber = (num) => Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleIncrement = () => {
    setCount(count + 1); // เพิ่มจำนวน
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1); // ลดจำนวน (ไม่ให้ค่าติดลบ)
    }
  };

  const handleAddToCart = () => {
    if (count <= 0) {
      alert("กรุณาเลือกจำนวนสินค้า");
      return;
    }

    const item = {
      id: menu.id,
      name: menu.name,
      price: menu.price - menu.discount,
      originalPrice: menu.price,
      discount: menu.discount,
      count,
      note: text,
      image: menu.images,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate(-1);
  };
  const cateName = cate.find((item) => item.id === menu.cateID);
  return (
    <div className="md:px-6 px-4 py-4 max-w-[768px] flex flex-col justify-center gap-6">
      <div className="flex justify-start items-center gap-4">
        <div
          className="w-[40px] h-[40px] flex justify-center items-center bg-[#FFBA41] rounded-full cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <figure className="w-[30px] h-[30px]">
            <img
              src="/images/icon/arrow-up.png"
              alt=""
              className="w-full h-full"
            />
          </figure>
        </div>
        <p className="text-[22px] font-[700]">{cateName.name}</p>
      </div>

      <figure className="w-[280px] h-[280px] shadow-sm rounded-lg mx-auto">
        <img
          src={menu.images}
          alt={menu.name}
          className="w-full h-full rounded-lg object-cover"
        />
      </figure>

      <div className="flex flex-col gap-3">
        <h1 className="text-[25px] font-[600]">{menu.name}</h1>
        <p className="text-sm">{menu.detail}</p>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-base font-[500]">
            หมายเหตุ
          </label>
          <textarea
            id="message"
            className="w-full h-24 p-2 px-4 rounded-lg outline-none bg-[#F2F2F2] text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="รายละเอียด..."
          />
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-end md:w-[30%] w-full">
          <p className="text-[#8F8F8F] text-[20px] text-right line-through">
            {formatNumber(menu.price)}.00
          </p>
          <div className="flex flex-row justify-between w-full">
            <p className="text-[30px]">฿</p>
            <p className="text-[30px] font-[600] text-right">
              {formatNumber(menu.price - menu.discount)}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end items-center gap-4">
          <figure
            className="btn-minus w-[40px] h-[40px] cursor-pointer"
            onClick={handleDecrement}
          >
            <img
              src="/images/icon/Group 1105.png"
              alt="ลดจำนวน"
              className="w-full h-full"
            />
          </figure>

          <p className="text-[30px] font-[500]">{count}</p>

          <figure
            className="btn-plus w-[40px] h-[40px] cursor-pointer"
            onClick={handleIncrement}
          >
            <img
              src="/images/icon/Group 1106.png"
              alt="เพิ่มจำนวน"
              className="w-full h-full"
            />
          </figure>
        </div>
      </div>

      <div
        className="bg-[#F44D4D] rounded-lg w-[250px] p-2 mx-auto flex justify-center items-center gap-2 cursor-pointer hover:bg-[#d43b3b] transition-all"
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        <figure className="w-6 h-6">
          <img
            src="/images/icon/mdi_cart-outline.png"
            alt="Cart Icon"
            className="w-full h-full object-contain"
          />
        </figure>
        <p className="text-white text-[25px] font-[500]">ใส่ตะกร้า</p>
      </div>
    </div>
  );
};

export default DetailPage;
