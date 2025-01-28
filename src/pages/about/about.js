import React from "react";
import "./about.css"; // تأكد من إنشاء ملف CSS لتنسيق الصفحة
import Footer from "../../components/footer/footer";

export default function AboutPage (){
  return (
    <div className="about">
      <div className="container">
        {/* Page Header Section */}
        <div className="header">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
        </div>

        {/* About Content Section */}
        <div className="info">
          <img src={require("../../image/who.jpg")} alt="About Us" />
          <div>
            <h2>Who We Are?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <div className="box">
            <img src={require("../../image/f1.png")} alt="Free Shipping" />
            <h6>Free Shipping</h6>
          </div>
          <div className="box">
            <img src={require("../../image/f2.png")} alt="Online Order" />
            <h6>Online Order</h6>
          </div>
          <div className="box">
            <img src={require("../../image/f3.png")} alt="Save Money" />
            <h6>Save Money</h6>
          </div>
          <div className="box">
            <img src={require("../../image/f4.png")} alt="Promotions" />
            <h6>Promotions</h6>
          </div>
          <div className="box">
            <img src={require("../../image/f5.png")} alt="Happy Sell" />
            <h6>Happy Sell</h6>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="news">
          <div className="text">
            <h4>Sign Up For Newsletter</h4>
            <p>
              Get E-mail updates about our latest shop and{" "}
              <span>special offers.</span>
            </p>
          </div>
          <div className="form">
            <input type="text" placeholder="Your email address" />
            <button className="button">Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
