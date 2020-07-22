<template>
  <div class="system-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="menu-li">
          <el-menu
            :default-active="activemenu"
            router
          >
            <div v-for="route in routers" :key="route.path">
              <el-menu-item v-if="!route.hidden"  :index="resolepath(route.path)" :route="resolepath(route.path)"  >
                {{route.meta.title}}
              </el-menu-item>
            </div>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="main-view">
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'index',
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
  .system-container {
    padding: 20px;
  }
  .menu-li {
    text-align: center;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .main-view {
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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
</style>
