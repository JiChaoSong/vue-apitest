<template>
  <div class="api-container">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="API详情" name="first">
        <api-desc :api-infomation="apiInfomation" :response="response"/>
      </el-tab-pane>
      <el-tab-pane label="在线调试" name="second">
        <api-test :api-infomation="apiInfomation"/>
      </el-tab-pane>
      <el-tab-pane label="测试用例" name="third">
        测试用例
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApiDesc from './components/api-desc'
import ApiTest from './components/api-test'
import { getapiinfo } from '../../api/apiinfo'
export default {
  name: 'detail',
  components: { ApiDesc, ApiTest },
  data () {
    return {
      apiInfomation: {},
      apiId: this.$route.query.id,
      activeName: 'first',
      response: null
    }
  },
  created () {
    this.getApiInfo()
  },
  methods: {
    getApiInfo () {
      getapiinfo(this.apiId).then(res => {
        this.apiInfomation = res.data
        try {
          this.response = JSON.parse(this.apiInfomation.apiResponse)
        } catch {
          this.response = this.apiInfomation.apiResponse
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
