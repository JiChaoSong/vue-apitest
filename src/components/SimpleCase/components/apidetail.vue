<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="请求信息" name="1">
        <el-tabs v-model="activeName1">
          <el-tab-pane label="请求体" name="requestBody">
            <JsonViewer :value="requestBody" :expand-depth="2" copyable />
          </el-tab-pane>
          <el-tab-pane label="请求头" name="requestHeader">
            <JsonViewer :value="requestHeader" :expand-depth="2" copyable />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="响应信息" name="2">
        <el-tabs v-model="activeName2">
          <el-tab-pane label="响应体" name="responseBody">
            <JsonViewer :value="responseBody" :expand-depth="2" copyable />
          </el-tab-pane>
          <el-tab-pane label="响应头" name="responseHeader">
            <JsonViewer :value="responseHeader" :expand-depth="2" copyable />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
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
      activeName1: 'requestBody',
      activeName2: 'responseBody',
      requestParams: null,
      requestHeader: null,
      requestBody: null,
      responseBody: null,
      responseHeader: null,

      activeNames: ['1']
    }
  },
  created () {
    this.checkData()
  },
  methods: {
    checkData () {
      const info = this.caseresult
      try {
        this.requestParams = JSON.parse(info.requestParams)
      } catch {
        this.requestParams = info.requestParams
      }
      try {
        this.requestHeader = JSON.parse(info.requestHeader)
      } catch {
        this.requestHeader = info.requestHeader
      }
      try {
        this.requestBody = JSON.parse(info.requestBody)
      } catch {
        this.requestBody = info.requestBody
      }
      try {
        this.responseBody = JSON.parse(info.responseBody)
      } catch {
        this.responseBody = info.responseBody
      }
      try {
        this.responseHeader = JSON.parse(info.responseHeader)
      } catch {
        this.responseHeader = info.responseHeader
      }
    }
  }

}
</script>

<style scoped>
</style>
