import React, { useState, useEffect } from "react";
import { foodDetail } from "../component/data";
import { Link, useNavigate } from "react-router-dom";

const ListOrders = ({ onOrderToKitchen }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [height, setHeight] = useState(window.innerHeight);


 useEffect(() => {
    const updateSize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reducedHeight = window.innerWidth >= 768
  ? height - 250
  : window.innerWidth >= 360
  ? height - 240
  : height - 200;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    //รายการที่ซ้ำกัน
    const mergedCart = storedCart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.count += item.count;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    setCartItems(mergedCart.reverse());
  }, []);

  const formatNumber = (num) => Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //ลดจำนวนอาหาร
  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, count: Math.max(item.count - 1, 1) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //เพิ่มจำนวนอาหาร
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ลบรายการอาหาร
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOrderClick = () => {
    if (cartItems == 0) {
      return;
    }
    onOrderToKitchen();
    console.log("คำสั่งถูกส่งไปครัว");
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between gap-3">
        <div style={{ height: `calc(${reducedHeight}px)` }} className="overflow-y-auto">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {cartItems.length === 0 ? (
              <div className="flex justify-center w-full items-center col-span-2">
                <p className="text-center w-full text-[#8F8F8F] text-sm">
                  ไม่มีรายการอาหาร
                </p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-[#D9D9D9] rounded-sm bg-[#FFF9EA] px-3 py-2 flex flex-row gap-6 w-full h-auto"
                >
                  <div className="max-w-full w-[20%]">
                    <figure className="w-[80px] h-[80px] rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </figure>
                  </div>

                  <div className="w-full flex flex-col justify-start items-center gap-2 max-md:h-auto">
                    <div className="flex flex-row justify-between items-start w-full gap-2">
                      <p className="text-base font-[500] w-full md:h-[50px]">
                        {item.name}
                      </p>

                      <div className="w-[19px] h-auto">
                        <figure
                          className="w-[19px] h-[19px] cursor-pointer"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <img
                            src="/images/icon/trash.png"
                            alt="del"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </figure>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-start w-full gap-2 border-b border-[#8F8F8F] border-dashed pb-1">
                      <div className="flex flex-row justify-between w-full items-center">
                        <p className="text-[20px] font-[400]">฿</p>
                        <p className="text-[20px] font-[500]">
                          {formatNumber(item.price * item.count)}
                        </p>
                      </div>
                      <div className="w-full flex flex-row justify-end items-center gap-4">
                        <figure
                          className="btn-minus w-[22px] h-[22px] cursor-pointer"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <img
                            src="/images/icon/Group 1105.png"
                            alt="ลดจำนวน"
                            className="w-full h-full"
                          />
                        </figure>

                        <p className="text-[20px] font-[500]">{item.count}</p>

                        <figure
                          className="btn-plus w-[22px] h-[22px] cursor-pointer"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <img
                            src="/images/icon/Group 1106.png"
                            alt="เพิ่มจำนวน"
                            className="w-full h-full"
                          />
                        </figure>
                      </div>
                    </div>
                    {item.note && (
                      <div className="flex flex-col justify-start items-start w-full gap-0.5">
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

        <div className="flex flex-row justify-center gap-6 ">
          <div
            className="bg-[#013D59] rounded-lg w-[180px] p-1 mx-auto flex justify-center items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <p className="text-white text-[20px] font-[500]">ย้อนกลับ</p>
          </div>

          <button
            className="bg-[#F44D4D] rounded-lg w-[180px] p-1 mx-auto flex justify-center items-center gap-2"
            onClick={handleOrderClick}
            disabled={cartItems.length === 0}
          >
            <p className="text-white text-[20px] font-[500]">ดำเนินการ</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListOrders;