import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginDashBoard from "./pages/login";
import NavDashBoard from "./components/navbar";
import Product from "./pages/products";
import Voucher from "./pages/voucher";
import Payment from "./pages/payment";
import Shipp from "./pages/shipp";
import Author from "./pages/author";
import Order from "./pages/order";
import History from "./pages/history";
import Staff from "./pages/staff";
import { Home } from "./pages/home";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginDashBoard />,
    },
    {
      path: '/dashboard',
      element: <NavDashBoard />,
      children: [
        {
          path: "/dashboard/home",
          element: <Home />,
        },
        {
          path: '/dashboard/product',
          element: <Product />,
        },
        {
          path: '/dashboard/voucher',
          element: <Voucher />,
        },
        {
          path: '/dashboard/payment',
          element: <Payment />,
        },
        {
          path: '/dashboard/shipp',
          element: <Shipp />,
        },
        {
          path: '/dashboard/author',
          element: <Author />,
        },
        {
          path: '/dashboard/order',
          element: <Order />,
        },
        {
          path: '/dashboard/history',
          element: <History />,
        },
        {
          path: '/dashboard/staff',
          element: <Staff />,
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />

}
export default App