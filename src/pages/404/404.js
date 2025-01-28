import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

export default function NotFoundPage () {
  return (
    <div className="not-found-page">
      <div className="content">
        <img src={require("../../image/03.png")} alt="404" />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Link to="/" className="home-back">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

 