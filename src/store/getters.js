const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  projects: state => state.user.project,
  projectname: state => state.user.name,
  projectlist: state => state.user.projectlist

}
export default getters
