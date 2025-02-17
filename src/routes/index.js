import {useRoutes} from "react-router-dom";
import KeepAlive from "react-activation";
import { lazy, Suspense} from "react";
import Loading from "../components/Loading/Loading.js";
const routes=[
  {
    path: "/",
    component: lazy(()=>import("../App.js")),
    children: [
      {
        path:'home',
        component: lazy(() => import("../pages/Home/Home.js")),
        children: [{
          path: 'recommend',
          component: lazy(() => import("../pages/Home/HomeRecommend/HomeRecommend.js")),
          children: [
            {
              path: "post/:postId",
              component: lazy(() => import("../pages/Post/Post.js"))
            }
          ]
        }, {
          path: 'concern',
          component:lazy(()=>import('../pages/Home/HomeConcern/HomeConcern.js'))
        }
        ]
      },
      {
        path: "circles",
        component:lazy(()=>import("../pages/Circles/Circles.js"))
      },
      {
        path: "circles/circle/:circleName",
        component:lazy(()=>import("../pages/Circle/Circle.js"))
      },
      {
        path: "shorts",
        component:lazy(()=>import("../pages/Shorts/Shorts.js"))
      },
      {
        path: "mine",
        component: lazy(() => import("../pages/Mine/Mine.js")),
        children: [{
          path: 'minehome',
          component:lazy(()=>import('../pages/Mine/MineHome/MineHome.js'))
        },
          {
            path: 'dynamics',
            component:lazy(()=>import('../pages/Mine/MineDynamics/MineDynamics.js'))
        }]
      }
    ],
    errorElement:lazy(()=>import("../pages/ErrorPage/ErrorPage.js"))
  },
  {
    path: "/auth",
    component:lazy(()=>import("../pages/Sign/Sign.jsx"))
  }
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

// export const transitionRoutes = [
//   {
//     path: "/",
//     element: lazy(() => import("../App.js")),
//     children: [
//       {
//         path:'home',
//         element: lazy(()=>import("../pages/Home/Home.js")),
//         nodeRef: createRef(),
//       },
//       {
//         path: "circles",
//         element: lazy(()=>import("../pages/Circles/Circles.js")),
//         nodeRef: createRef()
//       },
//       {
//         path: "circle/:circleName",
//         element: lazy(()=>import("../pages/Circle/Circle.js")),
//         nodeRef: createRef()
//       },
//       {
//         path: "shorts",
//         element: lazy(()=>import("../pages/Shorts/Shorts.js")),
//         nodeRef: createRef()
//       },
//       {
//         path: "mine",
//         element: lazy(()=>import("../pages/Mine/Mine.js")),
//         nodeRef: createRef()
//       }
//     ],
//   }
// ]
const Router = () => useRoutes(generateRouter(routes))
export default Router

