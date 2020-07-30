<template>
  <el-menu :default-active="activemenu" router>
    <div v-for="route in routers" :key="route.path" class="menutitle">
      <el-menu-item
        v-if="!route.hidden"
        :index="resolepath(route.path)"
        :route="resolepath(route.path)"
      >{{route.meta.title}}</el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import path from 'path'

export default {
  name: 'sider',
  data () {
    return {
      routes: this.$router.options.routes,
      // basepath: '/testcase/index',
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
      // this.basepath = routes.meta.parentPath
      return routes.children
    },
    basepath () {
      var routes = {
        children: this.$router.options.routes
      }

      var route = this.$route.matched

      for (var i = 0; i < route.length - 1; i++) {
        routes = routes.children.find((e) => (e.name === route[i].name))
      }
      return routes.meta.parentPath
    },
    activemenu () {
      var indexroute = null
      var route = this.$route.matched
      for (var i = 0; i < route.length; i++) {
        if (route[i].path === this.$route.path && route[i].meta.index) {
          indexroute = route[i].meta.index
        }
      }
      if (indexroute === null) {
        return this.$route.path
      } else {
        return indexroute
      }
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
.el-menu {
  font-size: 20px;
  line-height: 80%;
}
.menutitle {
  /*width: 100%;*/
}
/*.el-menu-item.is-active {*/
/*  color: white !important;*/
/*  !*border-right: 5px solid #1890ff !important;*!*/
/*  background-color: #1890ff !important;*/
/*}*/
/*.el-menu-item:not(.is-disabled):hover {*/
/*  background-color: #1890ff !important;*/
/*}*/
/*.el-menu-item:focus {*/
/*  background-color: #1890ff !important;*/
/*}*/
/*.el-submenu:hover.el-submenu__title {*/
/*  background-color: #1890ff !important;*/
/*}*/
.el-menu-item {
  font-size: 16px !important;
  /*width: 100px !important;*/
  text-align: center !important;
}
</style>
