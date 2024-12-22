import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>
  }
]);
export default router