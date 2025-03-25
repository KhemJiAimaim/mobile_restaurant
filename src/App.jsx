import { useState, useEffect } from "react";
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
import ReadQrcode from "./pages/ReadQrcode";
import { getCategoriesAndFoods } from "./pages/services/cateandfood.service";

function App() {
  const api_path = "http://localhost:8003";
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [foods, setFoods] = useState([]);
  const [cateFoods, setCateFoods] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [cateCount, setCateCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategoriesAndFoods();
        setFoods(res.foods);
        setCateFoods(res.categories);
        setCateCount(res.categories.length);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsDataLoaded(false);
      }
    };
    fetchData();
  }, [refreshData]);

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
        <div className="fixed -top-0.5 w-full z-99">
          <NavbarComponent api_path={api_path} foods={foods} />
        </div>

        {/* Contents */}
        <div className="flex-grow pt-[67px] pb-[55px] transition-all duration-300 ease-in-out">
          {loading ? (
            <SpawnLoading />
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/index" />} />
              <Route
                path="/index"
                element={
                  <IndexPages
                    api_path={api_path}
                    foods={foods}
                    cateFoods={cateFoods}
                    cateCount={cateCount}
                    isDataLoaded={isDataLoaded}
                  />
                }
              />
              <Route
                path="/all-menu"
                element={
                  <MenuPages
                    api_path={api_path}
                    foods={foods}
                    cateFoods={cateFoods}
                    isDataLoaded={isDataLoaded}
                  />
                }
              />
              <Route
                path="/all-menu/:cateId"
                element={
                  <MenuPages
                    api_path={api_path}
                    foods={foods}
                    cateFoods={cateFoods}
                    isDataLoaded={isDataLoaded}
                  />
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <DetailMenu
                    api_path={api_path}
                    foods={foods}
                    cateFoods={cateFoods}
                    isDataLoaded={isDataLoaded}
                  />
                }
              />
              <Route path="/readqr/:token" element={<ReadQrcode />} />
              <Route
                path="/cart"
                element={
                  loadingOrder ? (
                    <SpawnLoadingOrder />
                  ) : (
                    <CartPages
                      onOrder={handleLoadingOrderClick}
                      api_path={api_path}
                    />
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
