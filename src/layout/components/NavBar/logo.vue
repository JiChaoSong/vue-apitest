<template>
  <div class="logo">
    <el-row :gutter="10">
      <!-- <el-col :span="14">
        <div class="sidebar-logo-container">
          <el-row>
            <el-col :span="6">
              <router-link to="/">
                <img :src="logo" class="sidebar-logo-link" />
              </router-link>
            </el-col>
            <el-col :span="18">
              <router-link to="/">
                <span class="project-title">{{ title }}</span>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>-->
      <el-col :span="10">
        <span class="title">{{title}}</span>
      </el-col>
      <el-col :span="10">
        <div class="projectsitem">
          <el-dropdown>
            <div class="project-title">
              {{titlename}}
              <i class="el-icon-arrow-down el-icon--right right-icon"></i>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in user.project"
                :key="item.id"
                @click.native="handlesetProjects(item.id, item.projectName)"
              >{{item.projectName}}</el-dropdown-item>
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
import { getUserInfo } from '../../../utils/user'

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
      return JSON.parse(getUserInfo())
    }
  },
  inject: ['reload'],
  data () {
    return {
      title: '接口测试平台',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      // list: this.user.project,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 2147483647
      },
      id: '',
      name: ''
    }
  },
  methods: {
    handlesetProjects (id, name) {
      setProject(id)
      setProjectName(name)
      location.reload()
    },

    handlechange () {
      console.log('test')
      console.log(this.user.project)
    }
  }
}
</script>

<style>
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
  margin: 0 auto;
  vertical-align: middle;
  white-space: nowrap;
}
.sidebar-logo-container {
  width: 100%;
  /*height: 50px;*/
}

.title {
  width: auto;
  color: white;
  font-size: 18px;
  /* margin: 0 auto; */
  /* vertical-align: middle; */
  /* white-space: nowrap; */
  /* top: 50%; */
}
</style>
