// import { asyncRouterMap, constantRouterMap } from '../../router'
//
// const permission = {
//   state: {
//     routers: constantRouterMap,
//     addRouters: [],
//     accessCodes: []
//   },
//   mutations: {
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers
//       state.routers = constantRouterMap.concat(routers)
//     }
//   },
//   actions: {
//     GenerateRoutes ({
//       commit
//     }, data) {
//       return new Promise(resolve => {
//         const permissionList = []
//         if (data) {
//           data.map(v => {
//             permissionList.push(v)
//           })
//         }
//         const route = asyncRouterMap
//
//         const accessedRouters = filterAsyncRouter(route, permissionList)
//         accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
//         commit('SET_ROUTERS', accessedRouters)
//         resolve()
//       })
//     }
//   }
// }
//
// export default permission
