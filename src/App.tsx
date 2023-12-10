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



function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginDashBoard />,
    },
    {
      path: '/',
      element: <NavDashBoard />,
      children: [
        {
          path: '/product',
          element: <Product />,
        },
        {
          path: '/voucher',
          element: <Voucher />,
        },
        {
          path: '/payment',
          element: <Payment />,
        },
        {
          path: '/shipp',
          element: <Shipp />,
        },
        {
          path: '/author',
          element: <Author />,
        },
        {
          path: '/order',
          element: <Order />,
        },
        {
          path: '/history',
          element: <History />,
        },
        {
          path: '/staff',
          element: <Staff />,
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />

}
export default App