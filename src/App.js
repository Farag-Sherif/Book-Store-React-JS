import "./App.css";
import HeaderNav from "./components/header/header";
import HomePage from "./pages/home/homePage";
import { Route, Routes, useLocation } from "react-router-dom";
import LogInPage from "./pages/log/logInPage";
import SingUpPage from "./pages/log/singUpPage";
import Dashboard from "./pages/dashboard/dashboardPage";
import Users from "./pages/dashboard/users/users";
import AddUser from "./pages/dashboard/users/addUser";
import Products from "./pages/dashboard/products/products";
import AddProducts from "./pages/dashboard/products/addProducts";
import ShopPage from "./pages/shop/shopPage";
import Type from "./requireRoute/requireRoute";
import ProductDetails from "./pages/productDetails/Details";
import AboutPage from "./pages/about/about";
import ContactPage from "./pages/contactUs/contactUs";
import NotFoundPage from "./pages/404/404";
import CheckOutPage from "./pages/checkOut/checkOut";
import OrderSuccess from "./pages/checkOut/orderSuccess/orderSuccess";

function App() {
  const location = useLocation();
  return (
    <>
      {(location.pathname !== "/*" && location.pathname !== "/orderSuccess") && <HeaderNav />}
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkOut" element={<CheckOutPage />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/singUp" element={<SingUpPage />} />
        <Route element={<Type />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="products" element={<Products />} />
            <Route path="add-products" element={<AddProducts />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
