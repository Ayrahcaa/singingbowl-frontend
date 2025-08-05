import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import axios from "axios";
import "./Navbar.scss";
import logo from "../Assets/Logo/logo.svg";

function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    // Scroll direction and distance
    const isScrollingDown = prevScrollPos > currentScrollPos;
    setVisible(isScrollingDown || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);

    // Background change after scroll
    setScrolled(currentScrollPos > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Google Access Token (if redirected from login)
  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const token = hashParams.get("accessToken");

    if (token) {
      sessionStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
      }
    };
    fetchUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/logout`,
        {},
        { withCredentials: true }
      );
      sessionStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      {/* Top Layer */}
      <div className={`navbar-top ${visible ? "visible" : "hidden"}`}>
        <div className="left">
          <span>📞 800-886-5551</span>
          <Link to="/#">OVER 12K ⭐⭐⭐⭐⭐ REVIEWS</Link>
          <Link to="/#">ABOUT US</Link>
          <Link to="/#">DIGITAL GIFT SERVICES</Link>
          <Link to="/#">MY WISHLIST</Link>
          <Link to="/#">JUST IN FROM NEPAL</Link>
        </div>
        <div className="right">
          {/* <span>NPR ▼</span> */}
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <span>{user.image}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <a href={`${process.env.REACT_APP_AUTH_URL}/google`}>Login</a>
          )}
          <Link to="/cart">🛒</Link>
        </div>
      </div>

      {/* Bottom Layer */}
      <nav className={`main-navbar ${visible ? "visible" : "hidden"}`}>
        <div className={`navbar-left ${visible ? "visible" : "hidden"}`}>
          <Link to="/" className="main-navbar-left">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">NEW & TRENDING</Link>
          </li>
          <li>
            <Link to="/">SINGING BOWL</Link>
          </li>
          <li>
            <Link to="/">BAJRA</Link>
          </li>
          <li>
            <Link to="/">THANGKA</Link>
          </li>
          <li>
            <Link to="/">PRAYER FLAGS</Link>
          </li>
          <li>
            <Link to="/">GONG</Link>
          </li>
          <li>
            <Link to="/">JEWELRY</Link>
          </li>
          <li>
            <Link to="/">HOME ARTIFACTS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
