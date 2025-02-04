import { createBrowserRouter, useLocation } from "react-router-dom";
import App from "../App.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
import Home from "../pages/Home/Home.js";
import Circles from "../pages/Circles/Circles.js";
import Shorts from "../pages/Shorts/Shorts.js";
import Mine from "../pages/Mine/Mine.js";
import Circle from "../pages/Circle/Circle.js";
// import { useState } from "react";
// const CachedRoute = ({ Component }) => {
//     const [cachedComponents, setCachedComponents] = useState({})
//     const location = useLocation()

//     const renderComponent = () => {
//         const cached = cachedComponents[location.pathname];
//         if (cached) {
//             return cached;
//         }
//         const newComponent = <Component />;
//         setCachedComponents((prev) => ({
//             ...prev,
//             [location.pathname]: newComponent
//         }));
//         return newComponent;
//     };

//     return renderComponent();
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: < Home />,
      },
      {
        path: "circles",
        element:<Circles/>
      },
        {
    path: "/circles/circle/:circleName",
    element:<Circle/>
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
  },
]);
export default router