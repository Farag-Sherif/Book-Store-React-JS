import "./checkOut.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/loading/loading";
import Footer from "../../components/footer/footer";

export default function CheckOutPage() {
  // user information
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  // when submit the accept is true to check the label
  const [accept, setAccept] = useState(false);
  // when the user enter the right information the website will go to home page
  const nav = useNavigate();
  // use cookie to save user token in cookie
  const cookie = new Cookies();
  // when submit loading will be true  and when the information is submit will be false
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(cookie.get("Bearer"));

  useEffect(() => {
    setToken(cookie.get("Bearer"));
    // show all products
    const showData = async () => {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            "x-auth-token": token,
          },
        });
        setProducts(res.data.cart);
        setTotalPrice(res.data.grandTotal);
        console.log(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    showData();
  }, [token]);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    // when start submit the loading will be true to turn on Loading
    setLoading(true);
      try {
        const res = await axios.post(
            "http://localhost:5000/api/order", 
            {
              cart: products,
              totalPrice: totalPrice,
              address: address,
              phone: phone,
            },
            { 
              headers: {
                "x-auth-token": token,
              },
            }
          );
          nav("/orderSuccess");
        console.log(res);
        // when finish submit the loading will be false to stop Loading
        setLoading(false);
      } catch (res) {
        console.log(res);
      } finally {
        setLoading(false);
      }
  }

  return (
    <div className="checkOut">
      {/* when loading is true will turn on Loading  */}
      {loading && <Loading />}
      <div className="container">
        <div className="header">
          <h2>CheckOut</h2>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
        </div>
        <div className="formContainer">
          <form action="" className="form">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {accept && address.length < 5 &&(
              <p className="errorMessage">Please Enter Your Address</p>
            )}
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {accept && phone === "" &&(
              <p className="errorMessage">Please Enter Your Phone Number</p>
            )}

            <button
              type="submit"
              className="button pointer"
              onClick={(e) => submit(e)}>
              checkOut
            </button>
          </form>
          <div className="products">
            <div className="title">
              <h3>ID</h3>
              <h3 className="image">image</h3>
              <h3>Name</h3>
              <h3>Quantity</h3>
              <h3>Price</h3>
            </div>
            {products.map((product, index) => (
              <div className="product" key={index}>
                <h3>{index + 1}</h3>
                <div
                  style={{
                    backgroundImage: `url(${product.product.images[0]})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                  className="image">
                  {" "}
                </div>
                <h3>{product.product.name}</h3>
                <h3>{product.quantity}</h3>
                <h3>{product.totalPrice} $</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
