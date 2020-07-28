<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Query参数" name="first">
      <common :list="requestparams.apiParams"/>
    </el-tab-pane>
    <el-tab-pane label="请求头" name="second">
      <Header/>
    </el-tab-pane>
    <el-tab-pane label="请求体" name="third">
      <common :list="requestparams.apiBody"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import common from './common'
import Header from './header'
export default {
  name: 'index',
  props: {
    requestparams: {
      type: Object,
      required: true
    }
  },
  components: { common, Header },
  data () {
    return {
      activeName: 'first'

    }
  }
}
</script>

<style scoped>

</style>
