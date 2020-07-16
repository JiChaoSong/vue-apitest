<template>
  <div class="app-container>">
    <el-menu
      :default-active="activemenu"
      class="header-sidebar"
      mode="horizontal"
      text-color="#fffaff"
      @select="handleSelect"
      background-color="rgb(0, 21, 41)"
      active-text-color="#1890ff"
      router
    >
      <div class="header-logo">
        <logo/>
      </div>
      <div v-for="route in routes" :key="route.path" class="menu-item">
        <el-menu-item v-if="!route.hidden" :index="route.path" :route="route.path">
          {{route.meta.title}}
        </el-menu-item>
      </div>
      <div class="header-info">
        <info/>
      </div>
    </el-menu>

    <el-container class="main-container">
      <el-main>
        <router-view v-if="isRouterAlive"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Logo from './components/NavBar/logo'
import Info from './components/NavBar/info'
export default {
  name: 'Layout',
  components: { Info, Logo },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      listQuery: {
        page: 1,
        size: 2147483647
      },
      list: null,
      listLoading: true,
      routes: this.$router.options.routes,
      isRouterAlive: true
    }
  },
  computed: {
    activemenu () {
      const route = this.$route
      console.log(route)
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData () {
      this.listLoading = true
      this.$store.dispatch('projects/getProject', this.listQuery).then(res => {
        this.list = res.data.results
        this.listLoading = false
      })
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .header-container {
    width: 100%;
    background-color: rgb(0, 21, 41);
    padding: 0 10% 0 10%;
    text-align: center;
  }
  .header{
    width: 100%;
    background-color: rgb(0, 21, 41);
    text-align: left;
    line-height: 60px;
    padding: 0 20px 0 20px;
  }

  .header-logo{
    float: left;
    margin-top: 10px;
    width: 15%;
  }
  .header-info {
    /*position: fixed;*/
    float: right;
    text-align: right;
    margin-top: 10px;
    width: 20%;
  }

  .header-sidebar {
    width: 100%;
    padding: 0 10% 0 10%;
    position: relative;
  }

  .main-container {
    padding: 0 10% 0 10%;
    width: 100%;
  }
  .breadcrumb-container {
    padding: 0 10% 0 10%;
    margin-top: 5px;
  }
  .el-main {
    margin-top: 5px;
  }
  .modulemain {
    width: 100%;
    height: 820px ;
    padding: 20px;
    margin-top: 15px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .module-breadcrumd{
    width: 100%;
    height: 60px;
    padding-top: 15px;
    padding-bottom: 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  .menu-item {
    white-space: nowrap;
    display: inline-block;
  }
  .el-menu-item.is-active {
    color: white !important;
    border-bottom: 5px solid #1890ff !important;
  }
  .el-menu-item:not(.is-disabled):hover {
    background-color: #1890ff !important;
  }
  .el-submenu:hover.el-submenu__title {
    background-color: #1890ff !important;
  }
  .el-menu-item {
    font-size: 16px !important;
    width: 100px !important;
    text-align: center !important;
  }

</style>
