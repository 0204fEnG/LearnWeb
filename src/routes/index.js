import { useRoutes} from "react-router-dom";
// import App from "../App.js";
// import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
// import Home from "../pages/Home/Home.js";
// import Circles from "../pages/Circles/Circles.js";
// import Shorts from "../pages/Shorts/Shorts.js";
// import Mine from "../pages/Mine/Mine.js";
// import Circle from "../pages/Circle/Circle.js";
import KeepAlive from "react-activation";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading.js";
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
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index:true,
//         element: < Home />,
//       },
//       {
//         path: "circles",
//         element:<Circles/>
//       },
//         {
//     path: "/circles/circle/:circleName",
//     element:<Circle/>
//   },
//       {
//         path: "shorts",
//         element:<Shorts/>
//       },
//       {
//         path: "mine",
//         element:<Mine/>
//       }
//     ],
//     errorElement:<ErrorPage/>
//   },
// ]);
const routes=[
  {
    path: "/",
    component: lazy(()=>import("../App.js")),
    children: [
      {
        index:true,
        component: lazy(()=>import("../pages/Home/Home.js"))
      },
      {
        path: "circles",
        component:lazy(()=>import("../pages/Circles/Circles.js"))
      },
      {
        path: "/circles/circle/:circleName",
        component:lazy(()=>import("../pages/Circle/Circle.js"))
      },
      {
        path: "shorts",
        component:lazy(()=>import("../pages/Shorts/Shorts.js"))
      },
      {
        path: "mine",
        component:lazy(()=>import("../pages/Mine/Mine.js"))
      }
    ],
    // errorElement:lazy(()=>import("../pages/ErrorPage/ErrorPage.js"))
  },
]
// 路由处理方式
const generateRouter = (routes) => {
  return routes.map((item) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={
      <Loading/>
    }>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      <KeepAlive cacheKey={item.path}>
        <item.component />
      </KeepAlive>
    </Suspense>
    return item
  })
}

const Router = () => useRoutes(generateRouter(routes))
export default Router