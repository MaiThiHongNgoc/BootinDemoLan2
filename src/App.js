import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';


import Home from './Page/Home/Home';
import Shop from "./Page/Shop/Shop";
import Blog from "./Page/Blog/Blog";
import Author from "./Page/Author/Author";
import Contact from "./Page/Contact/Contact";
import TopRating from "./Page/Home/OurBookStore/TopRating/TopRating";
import BestSellers from "./Page/Home/OurBookStore/BestSellers/BestSellers";
import Featured from "./Page/Home/OurBookStore/Featured/Featured";
import Login from "./Page/Login/Login";
import PageNotFound from "./Page/404";
import Cart from "./Cart/Cart";
import ViewCart from "./Cart/viewCart";
import Bill from "./Cart/Bill";
import RegisterForm from "./Page/Register/Register";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./Cart/CartContext"; // Import CartProvider



import Admin from "./Backend/Admin/Admin";
import DashBoard from "./Backend/Admin/Home";
import UserList from "./Backend/User/UserList";
import CategoryList from "./Backend/Category/CategoryList";
import AuthorList from "./Backend/Author/AuthorList";
import ProductList from "./Backend/Product/ProductList";
import OrderList from "./Backend/Order/orderList";
//import Staff from "./Backend/staff/Staff";
import ImageList from "./Backend/Image/ImageList";
import CheckOut from "./Cart/checkOut";
import OrderDetails from "./Backend/Order/orderDetail";
import Infomation from "./Page/Infomation/Infomation";
import Personal_Infomation from "./Page/Infomation/Personal_information";
import UserOrder from "./Page/Infomation/UserOrder";

    
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider> {/* Wrap with CartProvider */}
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<TopRating />} />
                <Route path="topRating" element={<TopRating />} />
                <Route path="bestSeller" element={<BestSellers />} />
                <Route path="featured" element={<Featured />} />
              </Route>

              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/author" element={<Author />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/viewcart" element={<ViewCart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/bill/:orderId" element={<Bill />} />

              
              

              <Route path="/infomation" element={< Infomation/>} >
                <Route path="myinfo" element={<Personal_Infomation />} />
                <Route path="userorder" element={<UserOrder />} />
              </Route>
              


              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />}>
                <Route index element={<DashBoard />} />
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="user" element={<UserList />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="authors" element={<AuthorList />} />
                <Route path="products" element={<ProductList />} />
                <Route path="order" element={<OrderList />} />
                <Route path="orderdetail/:orderId" element={<OrderDetails />} />
                <Route path="image" element={<ImageList />} />
                {/* <Route path="staff" element={<Staff />} /> */}
              </Route>
              {/* Not Found Route */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
