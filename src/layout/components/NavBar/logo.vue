<template>
  <div class="logo">
    <el-row :gutter="30">
      <el-col :span="4">
        <div>
          <img :src="logo" class="sidebar-logo-link" />
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <span class="project-title">{{title}}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <el-dropdown>
          <div class="project-title">
            <span class="span-title">{{titlename}}</span>
            <i class="el-icon-arrow-down el-icon--right right-icon"></i>
          </div>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in projectlist"
              :key="item.id"
              @click.native="handlesetProjects(item.id, item.projectName)"
            >{{item.projectName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      'projectname',
      'projectlist'
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
      this.reload()
      // location.reload()
    },

    handlechange () {
      console.log('test')
      console.log(this.user.project)
    }
  }
}
</script>

<style lang="less">
.sidebar-logo-link {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.logo {
  color: white;
  width: 100%;
}
.project-title {
  color: white;
  font-size: 16px;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  .span-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.sidebar-logo-container {
  width: 100%;
  /*height: 50px;*/
}
</style>
