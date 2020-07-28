<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Query参数" name="first">
      <common/>
    </el-tab-pane>
    <el-tab-pane label="请求头" name="second">
      <header/>
    </el-tab-pane>
    <el-tab-pane label="请求体" name="third">
      <common/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import common from './common'
import header from './header'
export default {
  name: 'index',
  components: { common, header },
  data () {
    return {
      activeName: 'first'

    }
  }
}
</script>

<style scoped>

</style>
