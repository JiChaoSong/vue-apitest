<template>
  <div>
    <div class="operation-container">
      <router-link :to="{name: 'ProcessCreate'}">
        <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
</style>
