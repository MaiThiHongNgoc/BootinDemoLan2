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

import { AuthProvider } from "./AuthContext";  
import Header from "./Component/Header/Header";  

import Admin from "./Backend/Admin/Admin";  
import UserList from "./Backend/User/UserList";  
import CategoryList from "./Backend/Category/CategoryList";  
import AuthorList from "./Backend/Author/AuthorList";  
import ProductList from "./Backend/Product/ProductList";  
import OrderList from "./Backend/Order/orderList";  
import OrderDetailList from "./Backend/orderDetail/orderDetailList";  
import Staff from "./Backend/staff/Staff";  
import ImageList from "./Backend/Image/ImageList";  

function App() {  
  return (  
    <div className="App">  
      <BrowserRouter>  
        <AuthProvider>  {/* Move AuthProvider up here */}  
          <Routes>  
            <Route path="/" element={<Home />} >  
              <Route path="topRating" element={<TopRating />} />  
              <Route path="bestSeller" element={<BestSellers />} />  
              <Route path="featured" element={<Featured />} />  
            </Route>  

            <Route path="/shop" element={<Shop />} />  
            <Route path="/blog" element={<Blog />} />  
            <Route path="/author" element={<Author />} />  
            <Route path="/contact" element={<Contact />} />  

            <Route path="/login" element={<Login />} />  
            <Route path="/cart" element={<Cart />} />  

            {/* Admin Routes */}  
            <Route path="/admin" element={<Admin />} />  
            <Route path="/user" element={<UserList />} />  
            <Route path="/category" element={<CategoryList />} />  
            <Route path="/authors" element={<AuthorList />} />  
            <Route path="/products" element={<ProductList />} />  
            <Route path="/order" element={<OrderList />} />  
            <Route path="/orderdetail" element={<OrderDetailList />} />  
            <Route path="/image" element={<ImageList />} />  
            <Route path="/staff" element={<Staff />} />  

            {/* Not Found Route */}  
            <Route path="*" element={<PageNotFound />} />  
          </Routes>  
        </AuthProvider>  
      </BrowserRouter>  
    </div>  
  );  
}  

export default App;

// import Home from './Page/Home/Home';
// import Shop from "./Page/Shop/Shop";
// import Blog from "./Page/Blog/Blog";
// import Author from "./Page/Author/Author";
// import Contact from "./Page/Contact/Contact";
// import TopRating from "./Page/Home/OurBookStore/TopRating/TopRating";
// import BestSellers from "./Page/Home/OurBookStore/BestSellers/BestSellers";
// import Featured from "./Page/Home/OurBookStore/Featured/Featured";
// import Login from "./Page/Login/Login"
// import PageNotFound from "./Page/404";
// import Cart from "./Cart/Cart";
// import Admin from "./Backend/Admin/Admin";
// import UserList from "./Backend/User/UserList";
// import CategoryList from "./Backend/Category/CategoryList";
// import AuthorList from "./Backend/Author/AuthorList";
// import ProductList from "./Backend/Product/ProductList";
// import OrderList from "./Backend/Order/orderList"
// import OrderDetailList from "./Backend/orderDetail/orderDetailList";
// import Staff from "./Backend/staff/Staff";
// import ImageList from "./Backend/Image/ImageList";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} >
//           <Route path="topRating" element={<TopRating />} />
//           <Route path="bestSeller" element={<BestSellers />} />
//           <Route path="featured" element={<Featured />} />
//           </Route>

//           <Route path="/shop" element={<Shop />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/author" element={<Author />} />
//           <Route path="/contact" element={<Contact />} />

//           <Route path="/404" element={<PageNotFound />} />


//           <Route path="/login" element={<Login />} />
//           <Route path="/cart" element={<Cart />} />



//           <Route path="/admin" element={<Admin />} >
//           </Route>
          
//           <Route path="/admin" element={<Admin />} />

//           <Route path="/user" element={<UserList />} />
//           <Route path="/category" element={<CategoryList />} />
//           <Route path="/authors" element={<AuthorList />} />
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/order" element={<OrderList />} />
//           <Route path="/orderdetail" element={<OrderDetailList />} />
//           <Route path="/image" element={<ImageList />} />


//           <Route path="/staff" element={<Staff />} />

        
//           <Route path="/login" element={<Login />} />

           

//     <Route path="*" element={<PageNotFound/>}/>


//         </Routes>
//       </BrowserRouter>

//     </div>
//   );
// }
// export default App;

