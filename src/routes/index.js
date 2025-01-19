import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
import Home from "../pages/Home/Home.js";
import HomeRecommend from "../pages/Home/HomeRecommend/HomeRecommend.js";
import HomeConcern from "../pages/Home/HomeConcern/HomeConcern.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "recommend",
            element:<HomeRecommend/>
          },
          {
            path: "concern",
            element:<HomeConcern/>
          }
        ]
      }
    ],
    errorElement:<ErrorPage/>
  }
]);
export default router