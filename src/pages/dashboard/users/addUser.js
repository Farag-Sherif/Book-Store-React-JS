import ".././dashboardPage.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { User } from "../../../components/context/userContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../../components/loading/loading";

export default function SingUpPage() {
  // user information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // when submit the accept is true to check the label
  const [accept, setAccept] = useState(false);
  // use context to save the user token
  const { token, setToken } = useContext(User);
  // when the user enter the right information the website will go to home page
  const nav = useNavigate();
  // use cookie to save user token in cookie
  const cookie = new Cookies();
  // when submit loading will be true  and when the information is submit will be false
  const [loading, setLoading] = useState(false);
  // when user click on sing up button turn on this function
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    // when start submit the loading will be true to turn on Loading
    setLoading(true);
    try {
      let res = await axios.post("http://localhost:5000/api/signup", {
        name: name,
        email: email,
        password: password,
      });
      // when finish submit the loading will be false to stop Loading
      setLoading(false);
      // navigate to home page
      nav("/dashboard/users");
    } catch (res) {
      if (res.status === 400) {
        setEmailError(true);
        setLoading(false);
      }
    }
  }

  return (
    <div className="add-user">
      {/* when loading is true will turn on Loading  */}
      {loading && <Loading />}
      <form action="" className="logForm">
        <h3
          style={{ textAlign: "center", fontSize: "3rem", marginTop: "1rem" }}
        >
          Add New User
        </h3>

        <label htmlFor="name" className="white">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name.length < 2 && accept && (
          <p className="errorMessage">Your Name is require</p>
        )}

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
        {email === "" && accept && (
          <p className="errorMessage">This Email is require</p>
        )}
        {emailError && accept && (
          <p className="errorMessage">This Email is already been taken</p>
        )}

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
        {password.length < 8 && accept && (
          <p className="errorMessage">Password must be more than 8 character</p>
        )}

        <label htmlFor="confirmPassword" className="white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword !== password && accept && (
          <p className="errorMessage">Passwords is not matching</p>
        )}

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
