import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
import Home from "../pages/Home/Home.js";
import Circles from "../pages/Circles/Circles.js";
import Shorts from "../pages/Shorts/Shorts.js";
import Mine from "../pages/Mine/Mine.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "circles",
        element:<Circles/>
      },
      {
        path: "shorts",
        element:<Shorts/>
      },
      {
        path: "mine",
        element:<Mine/>
      }
    ],
    errorElement:<ErrorPage/>
  }
]);
export default router