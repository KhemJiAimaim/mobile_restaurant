import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { foodDetail } from "../../../pages/component/data";

function NavbarComponent({ api_path, foods, logo }) {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFood, setFilteredFood] = useState(foods);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = foods.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFood(filtered);
    } else {
      setFilteredFood(foodDetail);
    }
  };

  const handleSelectFood = () => {
    setSearchTerm("");
  };

  const updateCartCount = () => {
    const storedCart = localStorage.getItem("cart");
    const cartData = storedCart ? JSON.parse(storedCart) : [];

    // ใช้ Set เพื่อนับเฉพาะสินค้าที่ไม่ซ้ำกัน
    // const uniqueItems = new Set(cartData.map((item) => item.id));
    // setCartCount(uniqueItems.size);

    const tatalCount = cartData.reduce((sum, item) => sum + item.count, 0);
    setCartCount(tatalCount);
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      updateCartCount();
    }, 500); // อัปเดตทุก 500ms

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="bg-[#313131] md:px-6 px-4 py-4 max-w-[768px] max-h-[70px] shadow-sm relative flex justify-center items-center">
        <div className="flex flex-row gap-1 justify-between items-center w-full mx-auto">
          <div className="flex-shrink-0 max-w-[75px] w-full">
            <Link to="/" className="xxs:w-[75px] w-[60px] h-auto">
              {logo ? (
                <img
                  src={api_path + logo}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : null}
            </Link>
            {/* <p className="text-white font-[600] text-[25px]">LOGO</p> */}
          </div>

          <div className="flex flex-row justify-end items-center w-full">
            <div className="flex flex-row justify-between xxs:gap-4 gap-2 ">
              <div className="bg-white md:px-4 px-1 py-1.5 rounded-lg md:w-full w-[190px] mx-auto h-[30px] text-[#8F8F8F] flex items-center border border-gray-300 justify-between">
                <input
                  type="text"
                  placeholder="ค้นหาเมนู..."
                  className="outline-none bg-transparent text-black md:w-[200px] w-[150px]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <SearchIcon sx={{ color: "#313131", fontSize: 25 }} />
              </div>

              <Link
                to="/cart"
                className="flex flex-row items-center gap-1 flex-1 w-full"
              >
                <figure className="w-[20px] h-[20px]">
                  <img
                    src="/images/icon/mdi_trolley.png"
                    alt=""
                    className="w-full h-full"
                  />
                </figure>

                <div className="bg-[#FFBA41] w-[25px] h-[25px] rounded-full flex justify-center items-center">
                  <p className="text-[11.5px] text-black text-center leading-none font-medium">
                    {cartCount}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {searchTerm && (
          <ul className="absolute w-full bg-slate-50 border border-[#D9D9D9] max-h-[200px] overflow-auto z-50 left-0 rounded-b-md shadow-md">
            {filteredFood.length > 0 ? (
              filteredFood.map((food) => (
                <Link
                  to={`/detail/${food.id}`}
                  key={food.id}
                  onClick={handleSelectFood}
                  className="block px-4 py-2 cursor-pointer hover:bg-[#FFBA41] txet-[16px] font-[500] flex items-center justify-start gap-3"
                >
                  <figure className="w-12 h-12 rounded-sm shadow-sm">
                    <img
                      src={api_path + food.thumbnail_link}
                      alt=""
                      className="w-full h-full rounded-sm object-cover"
                    />
                  </figure>
                  {food.name}
                </Link>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">ไม่พบเมนู</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default NavbarComponent;
