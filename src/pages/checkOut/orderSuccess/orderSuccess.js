import { useNavigate } from "react-router-dom";
import "./orderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="container">
        <img
          src={require("../../../image/OrderSuccess.gif")}
          alt="Order Success"
          className="image"
        />
        <h1>Order Successful!</h1>
        <p>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button onClick={() => navigate("/")} className="home-back">
          Back to Home
        </button>
      </div>
    </div>
  );
}
