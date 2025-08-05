// src/components/Navbar/Navbar.jsx

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
    const isScrollingDown = prevScrollPos > currentScrollPos;
    setVisible(isScrollingDown || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
    setScrolled(currentScrollPos > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Store Google accessToken on redirect
  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const token = hashParams.get("accessToken");

    if (token) {
      sessionStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  // Fetch logged-in user
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
        `${process.env.REACT_APP_API_URL}/auth/logout`,
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
      <div className={`navbar-top ${visible ? "visible" : "hidden"}`}>
        <div className="navbar-top-left">
          <Link to="/" className="main-navbar-left">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-top-right">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <a href={`${process.env.REACT_APP_API_URL}/auth/google`}>Login</a>
          )}
          <Link to="/cart">🛒</Link>
        </div>
      </div>

      <nav className="main-navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">NEW & TRENDING</Link>
          </li>
          <li>
            <Link to="/">MALA BRACELETS</Link>
          </li>
          <li>
            <Link to="/">MALA BEADS</Link>
          </li>
          <li>
            <Link to="/">SINGING BOWLS</Link>
          </li>
          <li>
            <Link to="/">PRAYER FLAGS</Link>
          </li>
          <li>
            <Link to="/">INCENSE</Link>
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
