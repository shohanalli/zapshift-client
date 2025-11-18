import { createBrowserRouter } from "react-router";
import Home from "../page/Home/home/Home";
import MainLayout from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
      index: true,
      element: <Home></Home>
      }
    ]
  },
]);