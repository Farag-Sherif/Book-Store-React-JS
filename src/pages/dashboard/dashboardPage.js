import "./dashboardPage.css";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  
  return (
    <div className="dashboard">
      <div className="leftSide">
        <Link to="/dashboard/users">
          <i className="fa-solid fa-users"></i>
          <span> Users</span>
        </Link>
        <Link to="/dashboard/add-user">
          <i className="fa-solid fa-user-plus"></i>
          <span> Add User</span>
        </Link>
        <Link to="/dashboard/products">
          <i className="fa-brands fa-product-hunt"></i>
          <span> Products</span>
        </Link>
        <Link to="/dashboard/add-products">
          <i className="fa-solid fa-plus"></i>
          <span> Add Products</span>
        </Link>
      </div>
      <div className="rightSide" style={{ position: "relative" }}>
        <Outlet />
      </div>
    </div>
  );
}
