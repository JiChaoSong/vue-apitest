<template>
  <div class="menu-container">
    <el-menu
      :default-active="activemenu"
      class="header-sidebar"
      mode="horizontal"
      text-color="#fffaff"
      background-color="rgb(0, 21, 41)"
      active-text-color="#1890ff"
      router
    >
      <div class="header-logo">
        <logo />
      </div>
      <div v-for="route in routes" :key="route.path" class="menu-item">
        <el-menu-item
          v-if="!route.hidden"
          :index="route.path"
          :route="route.path"
        >{{route.meta.title}}</el-menu-item>
      </div>
      <div class="header-info">
        <info />
      </div>
    </el-menu>
  </div>
</template>

<script>

import Info from './info'
import Logo from './logo'
export default {
  name: 'SidebarItem',
  components: { Logo, Info },
  computed: {
    activemenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  data () {
    return {
      routes: this.$router.options.routes

    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  display: inline-block;
}
.header-sidebar {
  width: 100%;
  padding: 0 20px 0 20px;
  position: relative;
}
.header-logo {
  float: left;
  margin: 0 auto;
  top: 50%;
  transform: translateY(65%);
  width: 20%;
}
.header-info {
  /*position: fixed;*/
  float: right;
  text-align: right;
  margin-top: 10px;
  width: 20%;
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
.el-menu-item:focus {
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
