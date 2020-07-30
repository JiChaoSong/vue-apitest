<template>
  <div class="api-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="API详情" name="first">
        <api-desc :api-infomation="apiInfomation" :response="response" />
      </el-tab-pane>
      <el-tab-pane label="在线调试" name="second">
        <api-test :testapiinfo="testapiinfo" />
      </el-tab-pane>
      <el-tab-pane label="测试用例" name="third">
        <api-case
          :list="list"
          :list-query="listQuery"
          :total="total"
          :fetch-data="fetchData"
          :testapiinfo="testapiinfo"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ApiDesc from './components/api-desc'
import ApiTest from './components/api-test'
import ApiCase from './components/api-case'
import { getapiinfo } from '../../api/apiinfo'
import { caseList } from '../../api/case'
export default {
  name: 'detail',
  components: { ApiDesc, ApiTest, ApiCase },
  data () {
    return {
      apiInfomation: {},
      apiId: this.$route.query.id,
      activeName: 'first',
      response: {},

      testapiinfo: {},
      funccase: null,
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        interface: this.$route.query.id
      }
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
    },

    fetchData () {
      this.listLoading = true
      caseList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    getcaseinfo (func) {
      this.funccase = func
    },

    testApiInfo () {
      getapiinfo(this.apiId).then(res => {
        this.testapiinfo = res.data
        console.log(this.testapiinfo)
      })
    },

    handleClick (tab, event) {
      if (tab.name === 'first') {
        this.getApiInfo()
      } else if (tab.name === 'second') {
        this.testApiInfo()
      } else if (tab.name === 'third') {
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
</style>
