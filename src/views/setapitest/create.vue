<template>
  <div class="api-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="接口信息" name="first">
        <CreateDesc/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateDesc from './components/create-desc'
export default {
  name: 'create',
  components: { CreateDesc },
  data () {
    return {
      activeName: 'first'

    }
  }
}
</script>

<style scoped>
</style>
