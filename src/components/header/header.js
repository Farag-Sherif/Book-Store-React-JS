import "./header.css";
import logo from "../../image/logo.svg";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../context/userContext";
import Cookies from "universal-cookie";
import OpenCart from "../../pages/cart/cart";

export default function HeaderNav() {
  // when user click on bars icon the setShowItems = true,
  // and when click on the items in header will go to the navigate and the setShowItems = false
  const [showItems, setShowItems] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // to get the token from cookie and context
  const cookie = new Cookies();
  const user = useContext(User);
  const Token = user.token;
  const getBearer = cookie.get("Bearer");
  const [token, setToken] = useState(getBearer);
  const [type, setType] = useState(cookie.get("Type"));

  useEffect(() => {
    setToken(getBearer);
    setType(cookie.get("Type"));
  }, [getBearer, type ]);

  // delet token from cookie
  const handleLogout = () => {
    cookie.remove("Bearer");
    cookie.remove("Type");
    setToken(null);
  };
  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      {/* the header at media min 993px  */}
      <header className="d-flex largeSize" style={{ height: "8rem" }}>
        <ul className="d-flex white" style={{ gap: "3rem", fontSize: "2rem" }}>
          <Link to="/" className="pointer hover white">
            Home
          </Link>
          <Link to="/shop" className="pointer hover white">
            Shop
          </Link>
          {Token && type === "admin" && (
            <Link to="/dashboard" className="pointer hover white">
              Dashboard
            </Link>
          )}
          <Link to="/about" className="pointer hover white">
            About
          </Link>
          <Link to="/contactUs" className="pointer hover white">
            Contact Us
          </Link>
        </ul>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            title=" "
            className="pointer"
            style={{ height: "100%" }}
          />
        </Link>
        <div className="d-flex white " style={{ gap: "3rem", fontSize: "2rem" }}>
          <i
            className="fa-solid fa-bag-shopping pointer hover white"
            onClick={() => setIsCartOpen(true)}></i>
          {token ? (
            <Link to="/login" className=" button white" onClick={handleLogout}>
              Log Out
            </Link>
          ) : (
            <div className="d-flex" style={{ gap: "1rem" }}>
              <Link to="/login" className=" button white">
                Log In
              </Link>
              <Link to="/singUp" className=" button white">
                Sing Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* the header at media min 993px  */}
      <header className="d-flex smallSize" style={{ height: "8rem" }}>
        <div className="d-flex" style={{ width: "100%" }}>
          <div style={{ flex: "1", textAlign: "center" }}>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                title=" "
                className="pointer"
                style={{ height: "100%" }}
              />
            </Link>
          </div>
          <i
            className="fa-solid fa-bars hover pointer white"
            onClick={() => setShowItems(true)}></i>
        </div>
        <div
          className="white list"
          style={{
            fontSize: "2rem",
            visibility: showItems ? "visible" : "hidden",
            opacity: showItems ? "1" : "0",
          }}>
          <i
            className="fa-solid fa-xmark pointer hover"
            onClick={() => setShowItems(false)}></i>
          <ul className="white  items">
            <Link
              to="/"
              className="pointer hover white"
              onClick={() => setShowItems(false)}>
              Home
            </Link>
            <Link
              to="/shop"
              className="pointer hover white"
              onClick={() => setShowItems(false)}>
              Shop
            </Link>
            {Token && type === "admin" && (
              <Link
                to="/dashboard"
                className="pointer hover white"
                onClick={() => setShowItems(false)}>
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className="pointer hover white"
              onClick={() => setShowItems(false)}>
              About
            </Link>
            <Link
              to="/contactUs"
              className="pointer hover white"
              onClick={() => setShowItems(false)}>
              Contact Us
            </Link>
          </ul>
          <div className="icon" style={{ margin: "3rem" }}>

            <i
              className="fa-solid fa-bag-shopping pointer hover white"
              onClick={() => {
                setIsCartOpen(true);
                setShowItems(false);
              }}></i>
          </div>
          {token ? (
            <div className="d-flex registerButtons" style={{ gap: "1rem" }}>
              <Link
                to="/login"
                className=" button white"
                onClick={() => {
                  handleLogout();
                  setShowItems(false);
                }}>
                Log Out
              </Link>
            </div>
          ) : (
            <div className="d-flex registerButtons" style={{ gap: "1rem" }}>
              <Link
                to="/login"
                className=" button white"
                onClick={() => setShowItems(false)}>
                Log In
              </Link>
              <Link
                to="/singUp"
                className=" button white"
                onClick={() => setShowItems(false)}>
                Sing Up
              </Link>
            </div>
          )}
        </div>
      </header>
      {isCartOpen && (
        <OpenCart openCart={isCartOpen} setIsCartOpen={setIsCartOpen} />
      )}
    </div>
  );
}
