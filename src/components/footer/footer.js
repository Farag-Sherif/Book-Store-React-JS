import { Link } from "react-router-dom";
import "./footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="container info">
        <div className="box">
          <h3>Menu</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contactUs">ContactUs</Link>
        </div>
        <div className="box">
          <h3>Need help?</h3>
          <Link to="/">Terms & conditions</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Refund Policy</Link>
          <Link to="/">FAQ Use Cases</Link>
        </div>
        <div className="box">
          <h3>Social Media</h3>
          <Link to="/" className="facebook">
            <i className="fa-brands fa-facebook"></i>
            Facebook
          </Link>
          <Link to="/" className="linkedin">
            <i className="fa-brands fa-linkedin"></i>
            LinkedIn
          </Link>
          <Link to="/" className="instagram">
            <i className="fa-brands fa-instagram"></i>
            Instagram
          </Link>
          <Link to="/" className="twitter">
            <i className="fa-brands fa-twitter"></i>
            Twitter
          </Link>
          <Link to="/" className="youtube">
            <i className="fa-brands fa-youtube"></i>
            Youtube
          </Link>
        </div>
      </div>
    </footer>
  );
}
