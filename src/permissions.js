import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getProject, getToken, removeToken } from './utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasproject = getProject()
      if (hasproject === undefined) {
        store.dispatch('user/getInfo').then(resp => {
          next({
            ...to,
            replace: true
          })
        }).catch(() => {
          removeToken()
          next()
        })
      } else {
        next()
      }
    }
  } else {
    console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
