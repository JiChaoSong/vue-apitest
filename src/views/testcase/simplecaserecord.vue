<template>
  <div>
    <el-table v-loading="listLoading" :data="list" stripe size="small">
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">{{scope.row.case.caseName}}</template>
      </el-table-column>
      <el-table-column label="接口名称" align="center">
        <template slot-scope="scope">{{scope.row.case.apiInfo.apiName}}</template>
      </el-table-column>
      <el-table-column label="耗时/s" align="center">
        <template slot-scope="scope">{{scope.row.spendTime}}</template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">{{scope.row.startTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{scope.row.updatedTime | formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleView(row)">查看</el-button>
          <el-button type="text" style="color: #f95359" @click="deleteProject(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      title="测试报告"
      :visible.sync="dialogvisibleReport"
      width="1000px"
      class="create-case-dialog"
      @close="handleClose"
    >
      <SimpleCase :apicase="recordCase" />
    </el-dialog>
  </div>
</template>

<script>
import { caserecordDelete, caserecordList } from '../../api/case'
import SimpleCase from '../../components/SimpleCase/index'
export default {
  name: 'simplecaserecord',
  components: { SimpleCase },
  filters: {
    formatStatus (val) {
      const tagColor = {
        101: 'unexecuted',
        102: 'pass',
        103: 'fail',
        104: 'errpr'
      }
      return tagColor[val]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
        case_id: this.$route.query.id
      },

      recordCase: null,

      dialogvisibleReport: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      caserecordList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    // 报告删除
    deleteProject (row) {
      this.$confirm('确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          caserecordDelete(row.id).then(res => {
            this.fetchData()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
        .catch(_ => { })
    },

    handleClose () {
      this.recordCase = {}
    },

    handleView (row) {
      this.recordCase = {}
      this.recordCase = Object.assign({}, row)
      this.dialogvisibleReport = true
      console.log(this.recordCase)
    },

    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchData()
    },

    indexMethod (index) {
      return (this.listQuery.page - 1) * this.listQuery.size + (index + 1)
    }
  }
}
</script>

<style scoped>
</style>
