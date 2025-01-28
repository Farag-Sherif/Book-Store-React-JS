import ".././dashboardPage.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import Loading from "../../../components/loading/loading";
import { User } from "../../../components/context/userContext";

export default function AddProducts() {
  // user information
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // when submit the accept is true to check the label
  const [accept, setAccept] = useState(false);
  const user = useContext(User);

  // when submit loading will be true and when the information is submit will be false
  const [loading, setLoading] = useState(false);

  // when user click on Add new to button turn on this function
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:5000/admin/add-product",
        {
          name: name,
          description: description,
          category: category,
          images: images,
          price: price,
          quantity: quantity,
        },
        {
          headers: {
            "x-auth-token": user.token,
          },
        }
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="add-user">
      {/* when loading is true will turn on Loading */}
      {loading && <Loading />}
      <form action="" className="logForm">
        <h3
          style={{ textAlign: "center", fontSize: "3rem", marginTop: "1rem" }}
        >
          Add New Product
        </h3>

        <label htmlFor="name" className="white">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter The Name of Product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name.length < 2 && accept && (
          <p className="errorMessage">The Name of Product is required</p>
        )}

        <label htmlFor="description" className="white">
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Enter The Description of Product"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {description === "" && accept && (
          <p className="errorMessage">This Field is required</p>
        )}

        <label htmlFor="category" className="white">
          Category
        </label>
        <input
          type="text"
          id="category"
          placeholder="Enter Category of Product"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {category === "" && accept && (
          <p className="errorMessage">This Field is required</p>
        )}

        <label htmlFor="image" className="white">
          Image of Product
        </label>
        <input
          type="url"
          id="image"
          placeholder="Paste the URL of the Product Image Here"
          value={images[0]}
          onChange={(e) => setImages([e.target.value])}
        />
        {images[0] === "" && accept && (
          <p className="errorMessage">This Field is required</p>
        )}
        <div className="d-flex" style={{ gap: "2rem" }}>
          <div style={{ width: "50%" }}>
            <label htmlFor="price" className="white">
              Price of Product
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            {price <= 0 && accept && (
              <p className="errorMessage">Price must be greater than 0</p>
            )}
          </div>
          <div style={{ width: "50%" }}>
            <label htmlFor="quantity" className="white">
              Quantity of Product
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            {quantity <= 0 && accept && (
              <p className="errorMessage">Quantity must be greater than 0</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="button white pointer"
          style={{ margin: "3rem auto 2rem", width: "75%" }}
          onClick={(e) => submit(e)}
        >
          Add New
        </button>
      </form>
    </div>
  );
}
