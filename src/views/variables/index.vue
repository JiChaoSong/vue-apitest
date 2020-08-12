<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
    >
      <el-table-column type="index" label="#"/>
      <el-table-column label="变量名称" align="center">
        <template slot-scope="scope">
          {{scope.row.variableName}}
        </template>
      </el-table-column>
      <el-table-column label="变量值" align="center">
        <template slot-scope="scope">
          {{scope.row.variableValue}}
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | formatDate}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { variableList } from '../../api/variable'

export default {
  name: 'index',
  data () {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      }

    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      variableList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchData()
    }

  }
}
</script>

<style scoped>

</style>
