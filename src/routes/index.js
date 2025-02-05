import {useRoutes} from "react-router-dom";
import KeepAlive from "react-activation";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading.js";
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
    errorElement:lazy(()=>import("../pages/ErrorPage/ErrorPage.js"))
  },
]
const generateRouter = (routes) => {
  return routes.map((item) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={
      <Loading/>
    }>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      <KeepAlive cacheKey={item.path} saveScrollPosition={true}>
        <item.component />
      </KeepAlive>
    </Suspense>
    return item
  })
}

const Router = () => useRoutes(generateRouter(routes))
export default Router