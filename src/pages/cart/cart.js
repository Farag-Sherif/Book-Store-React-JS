import "./cart.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function OpenCart({ openCart, setIsCartOpen }) {
  // products used to store all data of products
  const [products, setProducts] = useState([]);
  // when delete the deleteProduct will be false and the function of showData will be turn on
  const [deleteProduct, setDeleteProduct] = useState(false);
  // when user click on cart icon the setShowItems = true
  const [showItems, setShowItems] = useState(openCart);
  const [error, setError] = useState("");
  const cookie = new Cookies();
  const [token, setToken] = useState(cookie.get("Bearer"));

  useEffect(() => {
    const showData = async () => {
      setToken(cookie.get("Bearer"));
      try {
        let res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(res);
        setProducts(res.data.cart);
        if (res.data.cart.length === 0) {
          setError("Start adding products to your cart.");
        }
      } catch (err) {
        console.error(err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("You are not logged in.");
          } else if (err.response.status === 500) {
            setError("Start adding products to your cart.");
          } else {
            setError("An unexpected error occurred.");
          }
        } else {
          setError("Network error. Please try again later.");
        }
      }
    };
  
    showData();
  }, [ deleteProduct , showItems]); // Only depend on user.token if it's the only thing that should trigger a refetch

  // handleDelete used to delete product when click on trash
  async function handleDelete(id) {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/remove-from-cart/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setDeleteProduct((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="cart"
      style={{
        opacity: showItems ? "1" : "0",
        visibility: showItems ? "visible" : "hidden",
        right: showItems ? "0" : "-100%",
      }}>
      <i
        className="fa-solid fa-xmark pointer hover"
        onClick={() => {
          setShowItems(false);
          setIsCartOpen(false);
        }}></i>
      <div className="products">
        {products.length ? (
          products.map((product, index) => (
            <div className="product" key={index}>
              <div
                className="image"
                style={{
                  backgroundImage: `url(${product.product.images[0]})`,
                }}>
                {" "}
              </div>
              <h3>{product.product.name}</h3>
              <h3>{product.quantity}</h3>
              <h3>{product.totalPrice} $</h3>
              <i
                className="fa-solid fa-trash pointer"
                onClick={() => handleDelete(product.product._id)}></i>
            </div>
          ))
        ) : (
          <h1
            style={{
              color: "#333",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              margin: "2rem 0",
            }}>
            {error}
          </h1>
        )}
        <Link to="/checkOut" className="button" onClick={() => setIsCartOpen(false)}>Checkout</Link>
      </div>
    </div>
  );
}
