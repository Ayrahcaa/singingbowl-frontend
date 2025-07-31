// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import api from "../../utils/axios";
// import "./Navbar.scss";
// import axios from "axios";
// import logo from "../Assets/Logo/logo.svg";

// function Navbar() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   const [showMenu, setShowMenu] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
//   const [visible, setVisible] = useState(true);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const handleScroll = () => {
//     const currentScrollPos = window.pageYOffset;
//     const offset = currentScrollPos;

//     if (offset > 280) {
//       setScrolled(true);
//     } else {
//       setScrolled(false);
//     }

//     // Hide navbar and dropdown when scrolling up, show when scrolling down
//     const isScrollingDown = prevScrollPos > currentScrollPos;
//     setVisible(isScrollingDown || currentScrollPos < 10);

//     if (!isScrollingDown) {
//       setShowMenu(false); // Close dropdown when scrolling up
//     }

//     setPrevScrollPos(currentScrollPos);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [prevScrollPos, visible]);

//   // ✅ On first load, check if Google sent us an access token in URL fragment
//   useEffect(() => {
//     const hashParams = new URLSearchParams(location.hash.substring(1));
//     const token = hashParams.get("accessToken");

//     if (token) {
//       sessionStorage.setItem("accessToken", token);
//       // Remove the token from the URL for cleanliness
//       window.history.replaceState({}, document.title, "/");
//     }
//   }, [location]);

//   // ✅ Fetch current user info with the token
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/user");
//         setUser(res.data.user);
//       } catch (err) {
//         console.log("Not logged in");
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, [location]);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_AUTH_URL}/logout`,
//         {},
//         { withCredentials: true }
//       );
//       sessionStorage.removeItem("accessToken");
//       window.location.href = "/";
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <nav
//       className={`main-navbar ${scrolled ? "dark-nav" : ""} ${
//         visible ? "visible" : "hidden"
//       } `}
//     >
//       <Link to="/" className="main-navbar-left">
//         <img src={logo} alt="Singing bowl logo" />
//       </Link>

//       {/* <h1>My E-Commerce</h1> */}
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/cart">Cart</Link>
//         </li>
//         <li>
//           {user && (
//             <li>
//               <Link to="/orders">My Orders</Link>
//             </li>
//           )}
//         </li>
//         {user ? (
//           <>
//             <li>Hello, {user.name}!</li>
//             <li>
//               <button onClick={handleLogout}>Logout</button>
//             </li>
//           </>
//         ) : (
//           <li>
//             <a href={`${process.env.REACT_APP_AUTH_URL}/google`}>
//               Login with Google
//             </a>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

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
            <a href={`${process.env.REACT_APP_AUTH_URL}/google`}>Login</a>
          )}
          <Link to="/cart">🛒</Link>
        </div>
      </div>

      {/* Bottom Layer */}
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
