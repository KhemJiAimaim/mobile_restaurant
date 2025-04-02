import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ListOrders from "./component/listOrders";
import StatusOrders from "./component/statusOrders";

function Cart({ onOrder, api_path, orderAll }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") || "orders";
    setActiveTab(tab);
  }, [location.search]);

  return (
    <div className="flex flex-col gap-4 bg-white w-full">
      {/* Header Tabs */}
      <div className="grid grid-cols-2 place-items-center items-center fixed px-4 py-3 bg-white max-w-[768px] w-full">
        <div className="w-full cursor-pointer group">
          <Link
            to="/cart?tab=orders"
            className="text-[20px] font-[400] text-center block"
          >
            รายการที่สั่ง
          </Link>
          <div
            className={`rounded-full h-[6px] md:w-[35%] w-[60%] mx-auto ${
              activeTab === "orders" ? "border-t-6 border-[#FFBA41]" : ""
            }`}
          ></div>
        </div>

        <div className="w-full cursor-pointer group">
          <Link
            to="/cart?tab=status"
            className="text-[20px] font-[400] text-center block"
          >
            สถานะ
          </Link>
          <div
            className={`rounded-full h-[6px] md:w-[35%] w-[60%] mx-auto ${
              activeTab === "status" ? "border-t-6 border-[#FFBA41]" : ""
            }`}
          ></div>
        </div>
        {/* <p onClick={onOrder}> e</p> */}
      </div>

      {/* Content */}
      <div className="max-h-full pt-[60px] md:px-6 px-4">
        {activeTab === "orders" && (
          <ListOrders onOrderToKitchen={onOrder} api_path={api_path} />
        )}
        {activeTab === "status" && (
          <StatusOrders api_path={api_path} orderAll={orderAll} />
        )}
      </div>
    </div>
  );
}

export default Cart;
