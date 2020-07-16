import {
  getProject,
  getProjectName,
  getToken,
  removeProject, removeProjectName, removeToken,
  setProject,
  setProjectName,
  setToken
} from '../../utils/auth'
import { getinfo, login, logout } from '../../api/user'
import { getUserId, removeUserId, setUserId } from '../../utils/user'

const getDefaultState = () => {
  return {
    token: getToken(),
    projectlist: null,
    project: getProject(),
    projectname: getProjectName(),
    userid: getUserId()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_Project: (state, project) => {
    state.project = project
  },
  SET_PROJECTLIST: (state, list) => {
    state.projectlist = list
  },
  SET_NAME: (state, name) => {
    state.projectname = name
  },
  SET_USER: (state, userid) => {
    state.userid = userid
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (!data.accesstoken) {
          reject(new Error('登陆失败'))
        }
        commit('SET_TOKEN', data.accesstoken)
        setToken(data.accesstoken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getinfo(state.token).then(response => {
        const { data } = response
        if (data.length === 0) {
          reject(new Error('登陆失败, 请重新登陆'))
        }
        commit('SET_USER', data[0].id)
        setUserId(data[0].id)
        const projectlsit = data[0].project
        const project = projectlsit[0].id
        const projectname = projectlsit[0].projectName
        commit('SET_PROJECTLIST', projectlsit)
        commit('SET_Project', project)
        setProject(project)
        commit('SET_NAME', projectname)
        setProjectName(projectname)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeProject()
        removeProjectName()
        removeToken() // must remove  token  first
        removeUserId()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeProject()
      removeProjectName()
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
