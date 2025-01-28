import { Link, useLocation } from "react-router-dom";
import "./Details.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading/loading";
import Footer from "../../components/footer/footer";
import AddProductsToCart from "../cart/addProductToCart";
export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const location = useLocation();
  const splitOfURL = location.pathname.split("/");
  const id = splitOfURL[splitOfURL.length - 1];
  useEffect(() => {
    const showDetails = async () => {
      setLoading(true);
      try {
        let res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setDetails(res.data);
        let data = await axios.get(`http://localhost:5000/api/products`);
        setRelatedProducts(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    showDetails();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Details">
          <div className="container">
            <img src={details.images} alt="" />
            <div className="info">
              <span>{details.category}</span>
              <h3>{details.name}</h3>
              <span className="price">
                $ {details.price}{" "}
                <span style={{ display: "inline" }}> & Free Shipping </span>
              </span>
              <h4>Product Details</h4>
              <p>{details.description}</p>
              <input
                type="number"
                id="quantity"
                placeholder="Enter the Quantity of the Product Here"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button className="button" onClick={() => AddProductsToCart(details._id)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
      <div
        className="most-popular"
        style={{ paddingTop: "10rem", backgroundColor: "white" }}
      >
        <h1>Related Products</h1>
        <div className="container products">
          {relatedProducts
            .filter((product) =>
              product.category
                .split(" ")
                .some((category) =>
                  details.category.split(" ").includes(category)
                )
            )
            .filter((product) => product.name !== details.name)
            .filter((product, index) => index < 4)
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
      <Footer />
    </>
  );
}
