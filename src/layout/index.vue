<template>
  <el-container style="height: 100%;">
    <el-header>
      <Navbar/>
    </el-header>
    <el-container>
      <el-aside v-if="path !== indexpath" width="250px">
        <SidebarItem/>
      </el-aside>
      <el-container>
        <el-main>
          <AppMain/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, AppMain } from './components'
import SidebarItem from './components/sider'
export default {
  name: 'Layout',
  components: {
    SidebarItem,
    Navbar,
    // SidebarItem,
    AppMain
  },
  data () {
    return {
      indexpath: '/home/index',
      title: 'Vue Admin Template',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
  }
  .el-header, .el-footer {
    color: #333;
    padding: 0!important;
    text-align: center;
    height: 56px !important;
  }

  .el-aside {
    color: #333;
    text-align: left;
    line-height: 200px;
    overflow-y: hidden;
  }
  .el-container {
    width: 100%;
  }
  .siders {
    height: 100%;

  }
  .sidebar-logo-link {
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }

</style>
