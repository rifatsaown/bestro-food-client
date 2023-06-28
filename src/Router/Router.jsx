import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PrivateRoute><Menu /></PrivateRoute>,
      },
      {
        path: '/order/:category',
        element: <Order/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "mycart",
        element: <MyCart/>
      }
    ]
  }
]);

export default router;
