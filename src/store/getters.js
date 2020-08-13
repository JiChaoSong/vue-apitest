const getters = {
  name: state => state.user.name,
  token: state => state.user.token,
  user: state => state.user.user,
  projects: state => state.user.project,
  projectname: state => state.user.projectName,
  projectlist: state => state.user.projectlist

}
export default getters
