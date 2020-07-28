<template>
  <div class="app-container">
    <div class="name">
      <h3><span>{{apiInfomation.apiName}}</span></h3>
    </div>

    <div class="path">
      <h4>{{apiInfomation.apiPath}}</h4>
    </div>

    <h4 class="title">请求参数</h4>
    <el-table :data="apiInfomation.apiBody" border>
      <el-table-column type="index" label="#"/>
      <el-table-column label="参数" align="center">
        <template slot-scope="scope">
          {{scope.row.param}}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>
      <el-table-column label="必填" align="center" width="80">
        <template slot-scope="scope">
          {{scope.row.isBoolean}}
        </template>
      </el-table-column>
      <el-table-column label="说明" align="center">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column label="示例" align="center">
        <template slot-scope="scope">
          {{scope.row.example}}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>
    </el-table>

    <h4 class="title">返回示例</h4>
    <div class="response">
      <span class="resp-name">
        <JsonViewer :value="response" :expand-depth="20" copyable font-size="20"/>
      </span>
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
export default {
  name: 'ApiDesc',
  components: { JsonViewer },
  props: {
    apiInfomation: {
      type: Object,
      required: true
    },
    response: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style scoped>

  .el-table {
    width: 70%;
  }
  .response {
    width: 70%;
  }

  .title {
    width: 100%;
    background-color: #FAFAFA;
    padding: 10px;
    color: #999999;
    /*border-left: 4px solid #1890ff;*/
  }
</style>
