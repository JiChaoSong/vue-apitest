<template>
  <div class="logo">
    <el-row :gutter="0">
      <el-col :span="14">
        <div class="sidebar-logo-container">
          <el-row>
            <el-col :span="6">
              <router-link to="/">
                <img :src="logo" class="sidebar-logo-link"/>
              </router-link>
            </el-col>
            <el-col :span="18">
              <router-link to="/">
                <p class="project-title">{{ title }} </p>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="projectsitem">
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
      </el-col>
    </el-row>
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
      title: '接口测试平台',
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
    width: 100%;
  }
  .project-title {
    width: auto;
    color: white;
    font-size: 18px;
    margin: 6px 20px 0 20px;
    vertical-align: middle;
    white-space: nowrap;
  }
  .sidebar-logo-container {
    width: 100%;
    /*height: 50px;*/
  }

</style>
