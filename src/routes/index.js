import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
import Home from "../pages/Home/Home.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      }
    ],
    errorElement:<ErrorPage/>
  }
]);
export default router