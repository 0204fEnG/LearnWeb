import {useParams, useRoutes} from "react-router-dom";
import KeepAlive from "react-activation";
import { lazy, Suspense} from "react";
import Loading from "../components/Loading/Loading.js";
// 动态包裹 KeepAlive 的组件
const KeepAliveWrapper = ({ Component,saveScrollType,paramName}) => {
  const KeepAliveId=useParams()[`${paramName}`]; // 获取路由参数
  return (
    <KeepAlive id={KeepAliveId} saveScrollPosition={saveScrollType}>
      <Component />
    </KeepAlive>
  );
};
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
            path: 'minedynamics',
            component:lazy(()=>import('../pages/Mine/MineDynamics/MineDynamics.js'))
          },
            {
             path: 'minefollow',
             component:lazy(()=>import("../pages/MineFollow/MineFollow.js"))
           },
        ]
      },
      {
        path: "user/:userId",
        component: lazy(() => import('../pages/User/User.js')),
        children: [{
          path: 'userhome',
          component:lazy(()=>import('../pages/User/UserHome/UserHome.js'))
        },
          {
            path: 'userdynamics',
            component:lazy(()=>import('../pages/User/UserDynamics/UserDynamics.js'))
        }]
      },
      {
        path: 'message',
        component:lazy(()=>import('../pages/Message/Message.js'))
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
    switch (item.path) {
      case 'minehome':
      case 'minedynamics':
      case 'minefollow':{
        item.element = <Suspense fallback={
          <Loading />
        }>
          <KeepAlive cacheKey={item.path} saveScrollPosition={'screen'}>
            <item.component />
          </KeepAlive>
        </Suspense>
        break
      }
      case 'post/:postId':
      case 'circles/circle/:circleName': {
        const Component = item.component
        const path = item.path;
        const parts = path.split(':');
        const paramName = parts[1];
          item.element = <Suspense fallback={
          <Loading />
        }>
            <KeepAliveWrapper Component={Component} saveScrollType={true} paramName={paramName} />
        </Suspense>
        break
      }
      case 'home':
      case 'recommend':
      case 'concern':
      case 'circles':
      case 'shorts':
      case 'mine': {
        item.element = <Suspense fallback={
          <Loading />
        }>
          <KeepAlive cacheKey={item.path} saveScrollPosition={true}>
            <item.component />
          </KeepAlive>
        </Suspense>
        break
      }
      default: {
        item.element = <Suspense fallback={
          <Loading />
        }>
            <item.component />
        </Suspense>
        break
      }
    }
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

