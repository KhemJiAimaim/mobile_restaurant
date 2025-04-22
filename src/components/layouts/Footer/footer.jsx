import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const FooterComponent = ({
  onEmployeeClick,
  nameTable,
  catePage,
  onCallStaff,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
    setOpenLang(false);
  };

  const handleToggleLang = () => {
    setOpenLang((prev) => !prev);
    setOpenMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        openMenu
      ) {
        setOpenMenu(false);
      }
      if (
        langRef.current &&
        !langRef.current.contains(event.target) &&
        openLang
      ) {
        setOpenLang(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openLang, openMenu]);

  return (
    <>
      <div className="max-w-[768px] w-full bg-[#FFBA41] rounded-t-3xl md:px-6 px-4 py-1.5 h-[55px]">
        <div className="grid grid-cols-3 items-center w-full">
          {/* 1 */}
          <div
            onClick={() => onEmployeeClick(() => onCallStaff(1))}
            className="flex flex-col justify-start items-center cursor-pointer mr-auto"
          >
            <figure className="w-[30px] h-[30px]">
              <img
                src="/images/icon/clarity_employee.png"
                alt=""
                className="w-full h-full"
              />
            </figure>
            <p className="text-sm">เรียกพนักงาน</p>
          </div>

          {/* 2 */}
          <div className="flex flex-row justify-center items-end gap-2">
            <figure className="w-[30px] h-[30px]">
              <img
                src="/images/icon/Group 611.png"
                alt=""
                className="w-full h-full"
              />
            </figure>
            <p className="md:text-xl text-md font-[600]">: {nameTable}</p>
          </div>

          {/* 3 */}
          <div className="flex gap-3 justify-end items-center">
            {/* 1*/}
            <div className="relative">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={handleToggleLang}
              >
                <figure className="border-2 border-[#313131] rounded-full w-[25px] h-[25px]">
                  <img
                    src="/images/icon/cif_th.png"
                    alt="Language Icon"
                    className="w-full h-full rounded-full"
                  />
                </figure>
                <p className="text-[12px] pt-0.5">TH</p>
              </div>

              <div
                ref={langRef}
                className={`absolute w-[160px] bg-slate-50 border border-[#D9D9D9] rounded-xl shadow-md bottom-16 right-0 p-2 transition-all duration-300 ease-in-out flex flex-col gap-1 ${
                  openLang
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <button className="flex justify-start gap-2 items-center hover:bg-[#FFBA41] p-1 px-2 rounded-lg">
                  <figure className="w-6 h-auto">
                    <img
                      src="/images/icon/cif_th.png"
                      alt="TH"
                      className="w-full"
                    />
                  </figure>
                  <p className="text-base font-[500]">ภาษาไทย</p>
                </button>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>

                <button className="flex justify-start gap-2 items-center hover:bg-[#FFBA41] p-1 px-2 rounded-lg">
                  <figure className="w-6 h-auto">
                    <img
                      src="/images/icon/English.png"
                      alt="EN"
                      className="w-full"
                    />
                  </figure>
                  <p className="text-base font-[500]">English</p>
                </button>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>
              </div>
            </div>

            {/* 2 */}
            <div className="relative">
              {/* ปุ่มเปิดเมนู */}
              <div
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={handleToggleMenu}
              >
                <figure className="w-[25px] h-[25px] rounded-full">
                  <img
                    src="/images/icon/menu.png"
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
                <p className="text-sm">เมนูหลัก</p>
              </div>

              <div
                ref={menuRef}
                className={`absolute w-[160px] bg-slate-50 border border-[#D9D9D9] rounded-xl shadow-md bottom-16 right-0 p-2 transition-all duration-300 ease-in-out flex flex-col gap-1 ${
                  openMenu
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <NavLink
                  to={`/all-menu/${catePage}`}
                  className={({ isActive }) =>
                    `text-base p-1 px-2 rounded-lg ${
                      isActive && location.search !== "?bestseller=1"
                        ? "bg-[#FFBA41]"
                        : "hover:bg-[#FFBA41]"
                    }`
                  }
                >
                  รายการอาหาร
                </NavLink>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>

                <NavLink
                  to="/all-menu?bestseller=1"
                  className={`text-base p-1 px-2 rounded-lg ${
                    location.pathname === "/all-menu" &&
                    location.search === "?bestseller=1"
                      ? "bg-[#FFBA41]"
                      : "hover:bg-[#FFBA41]"
                  }`}
                >
                  สินค้าขายดี
                </NavLink>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>

                <NavLink
                  to="/cart?tab=orders"
                  className={`text-base p-1 px-2 rounded-lg ${
                    location.pathname === "/cart" &&
                    location.search === "?tab=orders"
                      ? "bg-[#FFBA41]"
                      : "hover:bg-[#FFBA41]"
                  }`}
                >
                  รายการที่สั่ง
                </NavLink>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>

                <NavLink
                  to="/cart?tab=status"
                  className={`text-base p-1 px-2 rounded-lg ${
                    location.pathname === "/cart" &&
                    location.search === "?tab=status"
                      ? "bg-[#FFBA41]"
                      : "hover:bg-[#FFBA41]"
                  }`}
                >
                  สถานะรายการ
                </NavLink>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>

                <NavLink
                  to="/payment"
                  className={({ isActive }) =>
                    `text-base p-1 px-2 rounded-lg ${
                      isActive ? "bg-[#FFBA41]" : "hover:bg-[#FFBA41]"
                    }`
                  }
                >
                  ชำระเงิน
                </NavLink>
                <div className="border-t border-[#8F8F8F]/50 rounded-full mx-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterComponent;
