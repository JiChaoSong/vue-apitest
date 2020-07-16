import Cookies from 'js-cookie'

const Project = 'project'
const ProjectName = 'projectname'
const Token = 'token'

export function getProject () {
  return Cookies.get(Project)
}

export function setProject (project) {
  return Cookies.set(Project, project)
}

export function removeProject () {
  return Cookies.remove(Project)
}

export function getProjectName () {
  return Cookies.get(ProjectName)
}

export function setProjectName (project) {
  return Cookies.set(ProjectName, project)
}

export function removeProjectName () {
  return Cookies.remove(ProjectName)
}

export function getToken () {
  return Cookies.get(Token)
}

export function setToken (token) {
  return Cookies.set(Token, token)
}

export function removeToken () {
  return Cookies.remove(Token)
}
