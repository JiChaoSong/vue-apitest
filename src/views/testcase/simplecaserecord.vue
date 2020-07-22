<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" stripe size="small">
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">
          {{scope.row.case.caseName}}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" align="center">
        <template slot-scope="scope">{{scope.row.case.apiInfo.apiName}}</template>
      </el-table-column>
      <el-table-column label="结果" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{scope.row.createdTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{scope.row.updatedTime | formatDate}}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="text" style="color: #f95359" @click="deleteProject(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { caserecordList } from '../../api/case'

export default {
  name: 'simplecaserecord',
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
        case_id: this.$route.params.id
      }
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
    }
  }
}
</script>

<style scoped>

</style>
