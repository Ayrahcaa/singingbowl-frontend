import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductsByCategory from "./pages/ProductsByCategory/ProductsByCategory";
import ScrollToTop from "./ScrollToTop";

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Remove token from URL for cleanliness
      window.history.replaceState({}, document.title, "/");
    }
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/category/:slug" element={<ProductsByCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
