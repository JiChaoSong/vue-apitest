<template>
  <div class="system-container">
    <router-view/>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'index',
  data () {
    return {
      routes: this.$router.options.routes,
      name: 'Apitest',
      basepath: '/apitest/index',
      childrenroter: null
    }
  },
  computed: {
    // 获取当前路由的子路由
    routers () {
      var routes = {
        children: this.$router.options.routes
      }

      var route = this.$route.matched

      for (var i = 0; i < route.length - 1; i++) {
        routes = routes.children.find((e) => (e.name === route[i].name))
      }
      return routes.children
    },
    activemenu () {
      return this.$route.path
    }
  },
  created () {
  },
  methods: {
    resolepath (paths) {
      return path.resolve(this.basepath, paths)
    }
  }
}
</script>

<style scoped>
  .system-container {
    /*padding: 20px;*/
    /*height: 100%;*/
  }
  .menu-li {
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .main-view {
    /*padding: 20px;*/
    /*background-color: white;*/
    /*border-radius: 5px;*/
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
  }

  .el-menu-item.is-active {
    color: #1890ff !important;
  }
  .el-menu-item:not(.is-disabled):hover {
  }
  .el-menu-item {
    font-size: 20px !important;
    text-align: center !important;
  }

  .el-menu {
  height: 100%;
  }

  .el-aside{
    /*height: 100%;*/
    line-height: 100%;
    background-color: #d3dce6;
    color: #333;
  }
</style>
