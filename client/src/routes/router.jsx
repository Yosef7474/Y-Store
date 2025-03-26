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



const router = createBrowserRouter([{
    path: '/',
    element: <App />
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: '/Detail/:id',
    element: <Detail/>
  },
  {
    path: '/aboutus',
    element: <Aboutus/>
  },
  {
    path: '/addproduct',
    element: <PrivateRoute> <AddProduct/></PrivateRoute>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/myproducts',
    element: <PrivateRoute> <Myproducts/></PrivateRoute>
  },
  {
    path: '/edit-product/:id',
    element: <PrivateRoute><EditProduct/></PrivateRoute>
  }
  ]);


  export default router;