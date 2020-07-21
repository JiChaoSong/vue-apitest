<template>
  <div>
    <el :gutter="10">
      <el-col :span="16">
        <el-form :model="caseData" label-width="100px">
          <el-form-item label="用例编号:">
      <span>{{ caseData.caseNum }}</span>
    </el-form-item>
    <el-form-item label="用例名称:">
      <span>{{ caseData.caseName }}</span>
    </el-form-item>
    <el-form-item label="开始时间:">
      <span>{{ caseData.startTime }}</span>
    </el-form-item>
    <el-form-item label="耗时:">
      <span>{{ caseData.runcost }}s</span>
    </el-form-item>
    <el-form-item label="状态:">
      <span>{{ caseData.caseStatus }}s</span>
    </el-form-item>
        </el-form>
      </el-col>
    </el - row >
  <el>
    <el-table
        :data="apiInfo"
        size="small"
        :row-style="{height: '20px' }"
        :cell-style="{padding: '5px' }"
      >
        <el-table-column label="#" width="50px" align="center">
      <template slot-scope="scope">{{ scope.$index }}</template>
    </el-table-column>
    <el-table-column label="接口名称" width="100px" align="center">
      <template slot-scope="scope">{{ scope.row.apiName }}</template>
    </el-table-column>
    <el-table-column label="请求方法" width="100px" align="center">
      <template slot-scope="scope">{{ scope.row.apiMethod }}</template>
    </el-table-column>
    <el-table-column label="请求URL" align="center">
      <template slot-scope="scope">{{
        scope.row.apiHost + scope.row.apiPath
      }}</template>
    </el-table-column>
      </el-table>
    </el - row >
  </div >
</template >

  <script>
    export default {
      name: 'SimpleCaseRecord',
  props: {
      caseData: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      apiInfo: [this.caseData.apiInfo]
    }
  }
}
</script>

  <style scoped></style>
