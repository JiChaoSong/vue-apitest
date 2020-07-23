<template>
  <div>
    <div class="request-info">
      <span>请求信息</span>
      <el-tabs v-model="activeName1" >
        <el-tab-pane label="请求参数" name="requestParams">
          <JsonViewer :value="requestParams" :expand-depth="2" copyable />
        </el-tab-pane>
        <el-tab-pane label="请求头" name="requestHeader">
          <JsonViewer :value="requestHeader" :expand-depth="2" copyable />
        </el-tab-pane>
        <el-tab-pane label="请求体" name="requestBody">
          <JsonViewer :value="requestBody" :expand-depth="2" copyable />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="response-info">
      <span>响应信息</span>
      <el-tabs v-model="activeName2" >
        <el-tab-pane label="响应体" name="responseBody">
          <JsonViewer :value="responseBody" :expand-depth="2" copyable />
        </el-tab-pane>
        <el-tab-pane label="响应头" name="responseHeader">
          <JsonViewer :value="responseHeader" :expand-depth="2" copyable />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  name: 'apidetail',
  components: { JsonViewer },
  props: {
    caseresult: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeName1: 'requestParams',
      activeName2: 'responseBody',
      requestParams: null,
      requestHeader: null,
      requestBody: null,
      responseBody: null,
      responseHeader: null

    }
  },
  created () {
    this.checkData()
  },
  methods: {
    checkData () {
      try {
        this.requestParams = JSON.parse(this.caseresult.requestParams)
      } catch {
        this.requestParams = this.caseresult.requestParams
      }
      try {
        this.requestHeader = JSON.parse(this.caseresult.requestHeader)
      } catch {
        this.requestHeader = this.caseresult.requestHeader
      }
      try {
        this.requestBody = JSON.parse(this.caseresult.requestBody)
      } catch {
        this.requestBody = this.caseresult.requestBody
      }
      try {
        this.responseBody = JSON.parse(this.caseresult.responseBody)
      } catch {
        this.responseBody = this.caseresult.responseBody
      }
      try {
        this.responseHeader = JSON.parse(this.caseresult.responseHeader)
      } catch {
        this.responseHeader = this.caseresult.responseHeader
      }
    }
  }

}
</script>

<style scoped>

</style>
