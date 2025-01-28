import { Link } from "react-router-dom";
import "./homePage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import AddProductsToCart from "../cart/addProductToCart";

export default function HomePage() {
  const [products, setProducts] = useState([]);

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
    <div className="home">
      <div className="landing">
        <div className="title container">
          <p>Casual & Everyday Reads</p>
          <h1>Blend relaxation and knowledge effortlessly!</h1>
          <p>
            Effortlessly blend relaxation and inspiration with our Casual &
            Everyday book collection, featuring captivating stories, insightful
            reads, and lighthearted adventures perfect for your daily moments of
            escape and reflection.
          </p>
          <button className="button white">View Collection</button>
        </div>
      </div>
      <div className="most-popular">
        <h1>Newest products</h1>
        <div className="container">
          {products
            .filter((product, index) => products.length - 4 <= index)
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
                  <button className="button pointer" onClick={() => AddProductsToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="other-section">
        <div className="container">
          <div className="section">
            <img
              src={require("../../image/image-27.jpg")}
              alt="product"
              title=" "
              className="pointer"
              style={{ width: "100%" }}
            />
            <h1 className="white">
              Discover our curated House Mind Collection today!
            </h1>
            <button className="button white">View Collection</button>
          </div>
        </div>
      </div>
      <div className="most-popular" style={{ paddingBottom: "15rem" }}>
        <h1>Most Popular</h1>
        <div className="container">
          {products
            .filter((product, index) => index <= 3)
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
                  <button className="button pointer" onClick={() => AddProductsToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="other-section">
        <div className="container">
          <div className="section" style={{ margin: "-20rem auto 0 3rem" }}>
            <img
              src={require("../../image/image-21.jpg")}
              alt="product"
              title=" "
              className="pointer"
              style={{ width: "100%" }}
            />
            <h1 className="white">
              Discover our curated Kendra Elliot Echo Road Melinda Leigh
              Collection today!
            </h1>
            <button className="button white">View Collection</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
