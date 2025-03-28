import { createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "../App.jsx";
import Login from "../components/Login.jsx";
import Detail from "../components/Detail.jsx";
import Aboutus from "../components/Aboutus.jsx";
import AddProduct from "../components/AddProduct.jsx";
import Register from "../components/Register.jsx";
import PrivateRoute from "./privateRoutes.jsx";
import Myproducts from "../components/Myproducts.jsx";
import EditProduct from "../components/EditProduct.jsx";
import Home from "../components/Home.jsx";
import Contact from "../components/Contact.jsx";
import LikedProducts from "../components/LikedProducts.jsx";



const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'aboutus', element: <Aboutus /> },
      { path: 'Detail/:id', element: <Detail/> },
      { path: 'contact', element: <Contact/>},
      {path: 'liked', element: <PrivateRoute><LikedProducts/></PrivateRoute>},
      { 
        path: 'addproduct', 
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ) 
      },
      { 
        path: 'myproducts', 
        element: (
          <PrivateRoute>
            <Myproducts />
          </PrivateRoute>
        ) 
      },
      {
        path: '/edit-product/:id',
        element: <PrivateRoute><EditProduct/></PrivateRoute>
      }

    ]
  },
  // {
  //   path: 'login',
  //   element: <Login/>
  // },
  // {
  //   path: '/Detail/:id',
  //   element: <Detail/>
  // },
  // {
  //   path: '/aboutus',
  //   element: <Aboutus/>
  // },
  // {
  //   path: '/addproduct',
  //   element: <PrivateRoute> <AddProduct/></PrivateRoute>
  // },
  // {
  //   path: '/register',
  //   element: <Register/>
  // },
  // {
  //   path: '/myproducts',
  //   element: <PrivateRoute> <Myproducts/></PrivateRoute>
  // },
  // {
  //   path: '/edit-product/:id',
  //   element: <PrivateRoute><EditProduct/></PrivateRoute>
  // }
  ]);


  export default router;