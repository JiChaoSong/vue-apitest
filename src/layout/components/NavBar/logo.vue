<template>
  <div class="logo">
    <router-link to="/">
      <img :src="logo" class="sidebar-logo-link"/>
    </router-link>
    <el-dropdown>
      <div class="project-title">
        {{titlename}}
        <i class="el-icon-arrow-down el-icon--right right-icon"></i>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in list" :key="item.id" @click.native="handlesetProjects(item.id, item.projectName)">{{item.projectName}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getProjectName, setProject, setProjectName } from '../../../utils/auth'
import { projectList } from '../../../api/project'
import { getUserId } from '../../../utils/user'

export default {
  name: 'logo',
  computed: {
    ...mapGetters([
      'projects',
      'projectname'
    ]),
    titlename () {
      return getProjectName()
    },
    user () {
      return getUserId()
    }
  },
  inject: ['reload'],
  data () {
    return {
      title: 'Vue Admin Template',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 2147483647,
        user_id: this.user
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      projectList(this.listQuery).then(res => {
        this.list = res.data.results
        console.log(this.list)
      })
    },
    handlesetProjects (id, name) {
      setProject(id)
      setProjectName(name)
      location.reload()
    }
  }
}
</script>

<style scoped>
  .sidebar-logo-link {
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
  .logo {
    color: white;
  }
  .project-title {
    width: 100px;
    color: white;
    font-size: 18px;
    margin: 6px 20px 0 20px;
    vertical-align: middle;
    white-space: nowrap;
  }

</style>
