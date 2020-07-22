import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home/index'
import Interface from '../views/apitest/index'
import layoutMenu from '../views/layout/index'
import Layout from '../layout'
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    name: 'Home',
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/home/index'),
        name: 'Dashboard',
        meta: { title: '用例管理', activeMenu: '/home' }
      }
    ],
    meta: { title: '首页' }
  },
  {
    path: '/apitest',
    name: 'Apitest',
    component: Layout,
    redirect: '/apitest/index',
    children: [
      {
        path: 'index',
        name: 'Api',
        component: Interface,
        meta: { activeMenu: '/apitest', parentPath: '/apitest/index' },
        redirect: '/apitest/index/list',
        children: [
          {
            path: 'list',
            name: 'ApiList',
            component: () => import(/* webpackChunkName: "about" */ '../views/apitest/list'),
            meta: { title: '接口列表', activeMenu: '/apitest' }
          },
          {
            path: 'setapi',
            name: 'SetApi',
            component: () => import(/* webpackChunkName: "about" */ '../views/setapitest/index'),
            meta: { title: '集合测试', activeMenu: '/apitest' }
          }
        ]

      }
    ],
    meta: { title: '接口管理' }
  },
  {
    path: '/testcase',
    name: 'TestCase',
    component: Layout,
    redirect: '/testcase/index',
    children: [
      {
        path: 'index',
        name: 'Api',
        component: layoutMenu,
        meta: { activeMenu: '/testcase', parentPath: '/testcase/index' },
        redirect: '/testcase/index/case',
        children: [
          {
            path: 'case',
            name: 'Case',
            component: () => import(/* webpackChunkName: "about" */ '../views/testcase/case'),
            meta: { title: '单场景接口用例', activeMenu: '/testcase' }
          },
          {
            path: 'simplecaserecord',
            name: 'CaseRecord',
            component: () => import(/* webpackChunkName: "about" */ '../views/testcase/simplecaserecord'),
            meta: { title: '单场景用例报告', activeMenu: '/testcase', index: '/testcase/index/case' },
            hidden: true
          }
        ]

      }
    ],
    meta: { title: '用例管理', activeMenu: '/testcase' }
  },
  {
    path: '/testplan',
    name: 'TestPlan',
    component: () => import(/* webpackChunkName: "about" */ '../views/testplan/index'),
    meta: { title: '测试计划' },
    hidden: true
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理' },
    redirect: '/system/index',
    children: [
      {
        path: 'index',
        name: 'sys',
        component: layoutMenu,
        meta: { activeMenu: '/system', parentPath: '/system/index' },
        redirect: '/system/index/project',
        children: [
          {
            path: 'project',
            name: 'Project',
            component: () => import('../views/project/index'),
            meta: { title: '项目管理', activeMenu: '/system' }
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('../views/user/index.vue'),
            meta: { title: '个人信息', activeMenu: '/system' }
          },
          {
            path: 'module',
            name: 'Module',
            component: () => import('../views/project/components/modules'),
            meta: { title: '模块管理', activeMenu: '/system' },
            hidden: true
          }
        ]
      }
    ]
  }
]

export const asyncRouterMap = [

]
const createRouter = () => new VueRouter({
  routes: constantRouterMap
})

const router = createRouter()

export default router
