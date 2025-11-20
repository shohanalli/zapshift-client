import { createBrowserRouter } from "react-router";
import Home from "../page/Home/home/Home";
import MainLayout from "../Layout/MainLayout";
import Covarege from "../page/Coverage/Covarege";
import About from "../page/About/About";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../page/Authenthication/Login";
import Ragister from "../page/Authenthication/Ragister";
import Raider from "../page/Raider/Raider";
import PrivetRouter from "./PrivetRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
      index: true,
      element: <Home></Home>
      },
      {
        path: "/coverage",
        element: <Covarege></Covarege>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: '/raider',
        element:<PrivetRouter> <Raider></Raider></PrivetRouter>
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Ragister></Ragister>
      }
    ]
  }
]);