import axios from "axios";
import Cookies from "universal-cookie";
export default async function AddProductsToCart(id) {
  const token = new Cookies().get("Bearer");
  try {

    const res = await axios.post(
      "http://localhost:5000/api/add-to-cart",
      {
        id: id,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

  } catch (err) {
    console.error(err); 
  }
}