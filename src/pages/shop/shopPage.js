import { Link } from "react-router-dom";
import axios from "axios";
import "./shopPage.css";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import AddProductsToCart from "../cart/addProductToCart";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [itemsShow, setItemsShow] = useState(16);

  useEffect(() => {
    const showData = async () => {
      try {
        let res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    showData();
  }, []);

  return (
    <div className="shop">
      <div className="landing">
        <div className="title container">
          <h1>
            "There is no greater pleasure than diving into a book and forgetting
            the world around you."
          </h1>
          <h1>Shop Now</h1>
        </div>
      </div>
      <div
        className="most-popular"
        style={{ paddingTop: "10rem", backgroundColor: "white" }}
      >
        <div className="container products">
          {products
            .filter((product, index) => index < itemsShow)
            .map((product) => (
              <div className="product" key={product._id}>
                <div
                  className="image"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                ></div>
                <div className="info">
                  <span>{product.category}</span>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                  <span>{product.price}$</span>
                  <button className="button pointer" onClick={()=> AddProductsToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
        {!(itemsShow >= products.length) && (
          <button
            className="loading-more button pointer"
            onClick={() => setItemsShow((prev) => prev + 16)}
          >
            Loading More <i className="fa-solid fa-caret-down"></i>
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
