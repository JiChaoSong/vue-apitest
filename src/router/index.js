import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home/index'
// import Interface from '../views/apitest/index'
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
        meta: { title: '首页', activeMenu: '/home' }
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
        component: layoutMenu,
        meta: { title: null, activeMenu: '/apitest', parentPath: '/apitest/index' },
        redirect: '/apitest/index/setapi',
        children: [
          {
            path: 'list',
            name: 'ApiList',
            component: () => import(/* webpackChunkName: "about" */ '../views/apitest/list'),
            meta: { title: '集合测试', activeMenu: '/apitest' },
            hidden: true
          },
          {
            path: 'setapi',
            name: 'SetApi',
            component: () => import(/* webpackChunkName: "about" */ '../views/setapitest/index'),
            meta: { title: '接口测试', activeMenu: '/apitest' }
          },
          {
            path: 'create',
            name: 'Create',
            component: () => import('../views/setapitest/create'),
            meta: { title: '新增接口', activeMenu: '/apitest', index: '/apitest/index/setapi' },
            hidden: true
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('../views/setapitest/detail'),
            meta: { title: '接口详情', activeMenu: '/apitest', index: '/apitest/index/setapi' },
            hidden: true
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
          },
          {
            path: 'process',
            name: 'Process',
            component: () => import(/* webpackChunkName: "about" */ '../views/processcase/index'),
            meta: { title: '测试集管理', activeMenu: '/testcase' },
            hidden: false
          },
          {
            path: 'processcreate',
            name: 'ProcessCreate',
            component: () => import(/* webpackChunkName: "about" */ '../views/processcase/create'),
            meta: { title: '测试集添加', activeMenu: '/testcase', index: '/testcase/index/process' },
            hidden: true
          },
          {
            path: 'caseplan',
            name: 'CasePlan',
            component: () => import('../views/testplan/index'),
            meta: { title: '测试计划', activeMenu: '/testcase' },
            hidden: true
          }
        ]

      }
    ],
    meta: { title: '用例管理', activeMenu: '/testcase' }
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
            path: 'setting',
            name: 'Setting',
            component: () => import('../views/project/setting'),
            meta: { title: '全局配置', activeMenu: '/system' },
            hidden: true
          },
          {
            path: 'variables',
            name: 'Variables',
            component: () => import('../views/variables/index'),
            meta: { title: '全局变量', activeMenu: '/system' }
          },
          {
            path: 'status',
            name: 'Status',
            component: () => import('../views/statucode/index'),
            meta: { title: '状态码', activeMenu: '/system' }
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('../views/user/index.vue'),
            meta: { title: '个人信息', activeMenu: '/system' },
            hidden: true
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
