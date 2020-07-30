<template>
  <div class>
    <div class="operation-container">
      <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleImport">导入</el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading"
      size="samll"
      stripe
      :row-style="{height: '20px'}"
      :cell-style="{padding:'5px'}"
    >
      <el-table-column type="index" label="#" :index="indexMethod" />
      <el-table-column label="状态码" align="center">
        <template slot-scope="scope">{{scope.row.code}}</template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{scope.row.desc}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template>
          <el-button type="text">编辑</el-button>
          <el-button type="text" style="color: #f95359">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="sizes,prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      class="page"
    />

    <el-dialog title="导入状态码" :visible.sync="dialogvisibleImport" width="800px">
      <el-form
        :model="statucodeImport"
        ref="statucodeImport"
        :rules="statucodeimportRule"
        label-position="right"
      >
        <el-form-item label="url" prop="url">
          <el-input v-model="statucodeImport.url" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="statuImport">导入</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { statucodeImport, statucodeList } from '../../api/statucode'

export default {
  name: 'index',
  data () {
    return {
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      dialogvisibleImport: false,

      statucodeImport: {
        url: ''
      },
      statucodeimportRule: {
        url: [
          { required: true, message: 'url不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      statucodeList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },
    resetCode () {
      this.statucodeImport = {
        url: null
      }
    },

    handleImport () {
      this.resetCode()
      this.dialogvisibleImport = true
      this.$nextTick(() => {
        this.$refs.statucodeImport.clearValidate()
      })
    },

    statuImport () {
      this.$refs.statucodeImport.validate((valid) => {
        if (valid) {
          statucodeImport(this.statucodeImport).then(res => {
            this.dialogvisibleImport = false
            if (res.code === 20000) {
              this.$notify({
                title: '成功',
                message: '导入成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: res.message,
                type: 'danger',
                duration: 2000
              })
            }
          })
        }
      })
    },
    indexMethod (index) {
      return (this.listQuery.page - 1) * this.listQuery.size + (index + 1)
    },

    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchData()
    },

    handleSizeChange (val) {
      this.listQuery.size = val
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>
