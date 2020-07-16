<template>
  <div class="navbar">
    <sidebar-item/>
  </div>
</template>

<script>
import SidebarItem from './sidebar'
export default {
  name: 'index',
  components: { SidebarItem }
}
</script>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
</style>
