import React from "react";
import "./contactUs.css"; // تأكد من إنشاء ملف CSS لتنسيق الصفحة
import Footer from "../../components/footer/footer";

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="container">
        {/* Page Header Section */}
        <div className="header">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Reach out to us anytime.</p>
        </div>

        {/* Contact Details Section */}
        <div className="details">
          <div className="information">
            <h2>Visit Our Office or Contact Us Today</h2>
            <h3>Head Office</h3>
            <div>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <p>123 Main Street, City, Country</p>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <p>contact@example.com</p>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <p>+123 456 7890</p>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <p>Monday to Saturday: 9:00 AM to 6:00 PM</p>
              </li>
            </div>
          </div>

          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d8a32a5e4f1e!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633031234567!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="form">
          <form>
            <h2>Send Us a Message</h2>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="button">
              Submit
            </button>
          </form>

          <div className="people">
            <div>
              <img src={require("../../image/f1.png")} alt="Person 1" />
              <p>
                <strong>John Doe</strong> <br />
                Senior Marketing Manager <br />
                Phone: +123 456 7890 <br />
                Email: john@example.com
              </p>
            </div>
            <div>
              <img src={require("../../image/f1.png")} alt="Person 2" />
              <p>
                <strong>Jane Smith</strong> <br />
                Customer Support <br />
                Phone: +123 456 7891 <br />
                Email: jane@example.com
              </p>
            </div>
            <div>
              <img src={require("../../image/f1.png")} alt="Person 3" />
              <p>
                <strong>Mike Johnson</strong> <br />
                Technical Support <br />
                Phone: +123 456 7892 <br />
                Email: mike@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
