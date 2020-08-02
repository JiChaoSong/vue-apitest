<template>
  <div class="app-container">
    <div class="name">
      <h3>
        <span>{{apiInfomation.apiName}}</span>
      </h3>
    </div>

    <div class="path">
      <h4>{{apiInfomation.apiPath}}</h4>
    </div>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="请求参数" name="1">
        <el-table :data="apiInfomation.apiBody" border>
          <el-table-column type="index" label="#" />
          <el-table-column label="参数" align="center">
            <template slot-scope="scope">{{scope.row.param}}</template>
          </el-table-column>
          <el-table-column label="类型" align="center" width="100">
            <template slot-scope="scope">{{scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="必填" align="center" width="80">
            <template slot-scope="scope">{{scope.row.isBoolean}}</template>
          </el-table-column>
          <el-table-column label="说明" align="center">
            <template slot-scope="scope">{{scope.row.desc}}</template>
          </el-table-column>
          <el-table-column label="示例" align="center">
            <template slot-scope="scope">{{scope.row.example}}</template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">{{scope.row.remark}}</template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="返回示例" name="2">
        <div class="response">
          <span class="resp-name">
            <JsonViewer :value="response" :expand-depth="20" copyable :font-size="20" />
          </span>
        </div>
      </el-collapse-item>
    </el-collapse>
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
      activeNames: ['1']
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style>
.el-table {
  width: 100%;
}
.response {
  width: 100%;
}

.title {
  width: 100%;
  background-color: #fafafa;
  padding: 10px;
  color: #999999;
  /*border-left: 4px solid #1890ff;*/
}

.el-collapse {
  border: 0;
  margin-top: 10px;
}
.el-calendar__title {
  border: 0;
}
.el-collapse-item__wrap {
  border: 0;
  /* margin-top: 10px; */
}
.el-collapse-item__header {
  height: 40px;
  background-color: #fafafa;
  border: 0 !important;
  padding-left: 10px;
  border-bottom: 0;
  font-size: 16px;
  color: #999999;
  font-weight: bold;
}
</style>
