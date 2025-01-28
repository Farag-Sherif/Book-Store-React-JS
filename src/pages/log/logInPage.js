import "./forms.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/loading/loading";

export default function LogInPage() {
  // user information
  const [email, setEmail] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [password, setPassword] = useState("");
  // when submit the accept is true to check the label
  const [accept, setAccept] = useState(false);
  // when the user enter the right information the website will go to home page
  const nav = useNavigate();
  // use cookie to save user token in cookie
  const cookie = new Cookies();
  // when submit loading will be true  and when the information is submit will be false
  const [loading, setLoading] = useState(false);

  // when user click on log in button turn on this function
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    // when start submit the loading will be true to turn on Loading
    setLoading(true);
    try {
      let res = await axios.post("http://localhost:5000/api/signin", {
        email: email,
        password: password,
      });
      // save details in User context to use it in any file
      const tokenOfData = res.data.token;
      const typeOfUser = res.data.type;
      cookie.set("Bearer", tokenOfData);
      cookie.set("Type", typeOfUser);
      // when finish submit the loading will be false to stop Loading
      setLoading(false);
      // navigate to home page
      nav("/");
    } catch (res) {
      console.log(res);
      // if the password or email is wrong setErrorInput = true
      if (res.status === 401 || res.status === 400) {
        setLoading(false);
        setErrorInput(true);
      }
    }
  }

  return (
    <div className="login">
      {/* when loading is true will turn on Loading  */}
      {loading && <Loading />}
      <form action="" className="logForm">
        <h3
          style={{ textAlign: "center", fontSize: "3rem", marginTop: "1rem" }}
        >
          Log in
        </h3>

        <label htmlFor="email" className="white">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="white">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorInput && accept && (
          <p className="errorMessage">The Password or Email is not correct</p>
        )}

        <button
          type="submit"
          className="button white pointer"
          style={{ margin: "3rem auto 2rem", width: "75%" }}
          onClick={(e) => submit(e)}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
