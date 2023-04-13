import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// React Router page
import Root from "./page/Auth/Root";
import ErrorPage from "./page/Error/ErrorPage";
import Home from "./page/Home/Home";
import SignUp from "./page/Auth/SignUp";
import Login from "./page/Auth/Login";
import AllProduct from "./page/Home/Products/AllProduct";
import AllProductList from "./page/Home/Products/AllProductList";
import Categories from "./page/Home/Products/Categories";
import Contact from "./page/Home/Contact/Contact";
import Account from "./page/Home/Account/Account";
import ProductDetail from "./page/Home/Products/ProductDetail";
// Antd
import { ConfigProvider } from "antd";
// redux
import store from "./redux/store";
import { Provider } from "react-redux";
import Cart from "./page/Home/Card/Cart";
// i18 next
import Translate from './translate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // Nested routes
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      // Nested routes
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "all_product",
        element: <AllProduct />,
        children: [
          {
            path: ":product_list_Id",
            element: <AllProductList />,
          },
          {
            path: "categories/:product_categories/:product_categories_Id",
            element: <Categories />,
          },
        ],
      },
      {
        path: "product_detail/:product_name/:product_id",
        element: <ProductDetail />,
      },
      {
        path: "translation",
        element: <Translate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Phai bo React.StricMode di */}
      <ConfigProvider // Antd
        theme={{
          token: {
            colorPrimary: "#802c6e",
            fontFamily: "Arial",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
