import ".././dashboardPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/loading";
import Cookies from "universal-cookie";

export default function Products() {
  // products used to store all data of products
  const [products, setProducts] = useState([]);
  // when loading the products will be true  and when the data is done it will be false
  const [loading, setLoading] = useState(false);
  // when delete the deleteProduct will be false and the function of showData will be turn on
  const [deleteProduct, setDeleteProduct] = useState(false);

  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("Bearer"));

  useEffect(() => {
    setToken(cookies.get("Bearer"));
    // show all products
    const showData = async () => {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:5000/admin/get-products", {
          headers: {
            "x-auth-token": token,
          },
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    showData();
  }, [deleteProduct]);

  // handleDelete used to delete product when click on trash
  async function handleDelete(id) {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/delete-product/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(res)
      setDeleteProduct((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="User">
      <div className="title">
        <h3>ID</h3>
        <h3>image</h3>
        <h3>Name</h3>
        <h3>Quantity</h3>
        <h3>Price</h3>
        <h3>Options</h3>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div className="product" key={product._id}>
            <h3>{index + 1}</h3>
            <h3
              style={{
                backgroundImage: `url(${product.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {" "}
            </h3>
            <h3>{product.name}</h3>
            <h3>{product.quantity}</h3>
            <h3>{product.price} $</h3>
            <h3>
              <i
                className="fa-solid fa-trash pointer"
                onClick={() => handleDelete(product._id)}
              ></i>
            </h3>
          </div>
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
}
