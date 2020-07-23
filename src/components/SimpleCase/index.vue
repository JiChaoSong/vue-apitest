<template>
  <div class="app-container">
    <h2 class="report_title">*{{ apicase.case.caseName }}*</h2>
    <h1 class="report_title">测试用例报告单</h1>
    <div class="info_table">
      <div class="result_table_title">用例信息</div>
      <div class="table-box info-table">
        <table :cellpadding="0" :cellspacing="0">
          <tr>
            <td>
              <el-row :gutter="1">
                <el-col :span="col1">用例编号</el-col>
                <el-col :span="col2">{{ apicase.case.caseNum }}</el-col>
              </el-row>
            </td>
            <td rowspan="4"></td>
          </tr>
          <tr>
            <td>
              <el-row :gutter="1">
                <el-col :span="col1">用例名称</el-col>
                <el-col :span="col2">{{ apicase.case.caseName }}</el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td>
              <el-row :gutter="1">
                <el-col :span="col1">开始时间</el-col>
                <el-col :span="col2">{{ apicase.startTime | formatDate }}</el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td>
              <el-row :gutter="1">
                <el-col :span="col1">运行时长</el-col>
                <el-col :span="col2">{{ apicase.responseTime }}s</el-col>
              </el-row>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="result_table_title">接口信息</div>
      <el-table
        :data="apiInfo"
        border
        ref="table"
        size="small"
      >
        <el-table-column type="expand">
          <template>
            <ApiDetail :caseresult="apicase"  />
          </template>
        </el-table-column>
        <el-table-column label="#" align="center" width="50px">
          <template slot-scope="scope">{{scope.$index}}</template>
        </el-table-column>
        <el-table-column label="接口名称" align="center" width="100px">
          <template slot-scope="scope">{{scope.row.apiName}}</template>
        </el-table-column>
        <el-table-column label="请求方法" align="center" width="100px">
          <template slot-scope="scope">{{scope.row.apiMethod}}</template>
        </el-table-column>
        <el-table-column label="接口路径" align="center">
          <template slot-scope="scope">{{scope.row.apiPath}}</template>
        </el-table-column>
        <el-table-column label="结果" align="center">
          <template slot-scope="props">
            <el-button type="text" @click="toogleExpand(props.row)">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import ApiDetail from './components/apidetail'
export default {
  name: 'Index',
  components: { ApiDetail },
  props: {
    // apicasereport: {
    //   type: Object,
    //   required: true
    // },
    apicase: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      col1: 11,
      col2: 13,
      apiInfo: [this.apicase.case.apiInfo],
      caseresult: null
    }
  },
  methods: {
    tableCellStyle () {
      return 'border-color: #868686; border-bottom: 1px solid #868686; border-right: 1px solid #868686;'
    },
    tableHeaderCellStyle () {
      return 'border-color: #868686; color: #606266;'
    },
    toogleExpand (row) {
      this.$refs.table.toggleRowExpansion(row)
      this.$refs.table.toggleRowSelection(row)
      try {
        this.caseresult = JSON.parse(this.apicase.responseBody)
      } catch {
        this.caseresult = this.apicase.responseBody
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
/*h1, h2 {*/
/*    color: rgb(27, 180, 149);*/
/*}*/

.report_title {
  text-align: center;
}
.result_table_title {
  width: 108px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  /* background-color: rgb(27, 180, 149); */
  background-color: #409eff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: white;
}
.info-table {
  margin: 15px 0 20px 0;
}

table {
  width: 100%;
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
table th,
table td {
  border-left: 1px solid #EBEEF5;
  border-top: 1px solid #EBEEF5;
  font-weight: normal;
  font-size: 15px;
  padding: 0 20px 0 20px;
  height: 45px;
  color: #333333;
}
table td {
  width: 50%;
}
.table-box {
  text-align: justify;
}

.el-table {
  /*border: 1px solid #868686;*/
}
.cell-class-name {
  border-color: #868686;
}
</style>
