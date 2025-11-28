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
import SendParcel from "../page/SendAparcel/SendParcel";
import DashBoard from "../Layout/Dashboard/DashBoardLayout";
import Myparcel from "../page/Dashboard/Myparcel";
import DashBoardLayout from "../Layout/Dashboard/DashBoardLayout";
import Payment from "../page/Dashboard/Payment/Payment";
import PaymentCancel from "../page/Dashboard/Payment/paymentCancel";
import PaymentSuccess from "../page/Dashboard/Payment/paymentSuccess";
import PaymentDetails from "../page/PaymentDetails/PaymentDetails";

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
        path: "/send-parcel",
        element: <SendParcel></SendParcel>
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
  },
  {
    path: '/dashboard',
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: 'my-parcel',
        element: <Myparcel></Myparcel>
      },
      {
        path : 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path: 'payment-cancel',
        element:<PaymentCancel></PaymentCancel>
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: 'payment-details',
        element: <PaymentDetails></PaymentDetails>
      }
    ]

  }
]);