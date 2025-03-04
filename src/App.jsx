import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import NavbarComponent from "./components/layouts/Navber/navbar";
import FooterComponent from "./components/layouts/Footer/footer";

import IndexPages from "./pages/index";
import MenuPages from "./pages/all_menu";
import SpawnLoading from "./pages/component/Loading";
import SpawnLoadingOrder from "./pages/component/LoadingOrder";
import DetailMenu from "./pages/detail";
import CartPages from "./pages/cart";
import StatusOrders from "./pages/component/statusOrders";
import Payment from "./pages/payment";
import { foodDetail } from "./pages/component/data";

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Handle general loading state for any button or action
  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleLoadingOrderClick = () => {
    // localStorage.removeItem('orderDetails');
    // localStorage.removeItem("cartItems");
    localStorage.clear(); // ล้าง localStorage ทั้งหมด
    setLoadingOrder(true);
    setTimeout(() => {
      setLoadingOrder(false);
    }, 1000);
  };

  return (
    <BrowserRouter>
      <div className="max-w-[768px] w-full mx-auto flex flex-col h-screen">
        {/* Navbar */}
        <div className="fixed top-0 w-full z-99">
          <NavbarComponent />
        </div>

        {/* Contents */}
        <div className="flex-grow pt-[69px] pb-[55px] transition-all duration-300 ease-in-out border border-gray-300">
          {loading ? (
            <SpawnLoading />
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/index" />} />
              <Route path="/index" element={<IndexPages />} />
              <Route path="/all-menu" element={<MenuPages />} />
              <Route path="/all-menu/:cateId" element={<MenuPages />} />

              <Route path="/detail:id" element={<DetailMenu />} />
              <Route
                path="/cart"
                element={
                  loadingOrder ? (
                    <SpawnLoadingOrder />
                  ) : (
                    <CartPages onOrder={handleLoadingOrderClick} />
                  )
                }
              />

              <Route
                path="/payment"
                element={<Payment onPaymentClick={handleLoadingClick} />}
              />
            </Routes>
          )}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 w-full bg-white shadow-md z-10 transition-all duration-300 ease-in-out">
          <FooterComponent onEmployeeClick={handleLoadingClick} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
