<template>
  <div class="apitest-container">
    <div class="operation-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">
        新增
      </el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">
        导入
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
    >
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="接口名称" align="center" >
        <template slot-scope="scope">
<!--          <span @click="handlerowclick(scope.row)">{{scope.row.projectName}}</span>-->
          {{scope.row.apiName}}
        </template>
      </el-table-column>
      <el-table-column label="请求方法" align="center">
        <template slot-scope="scope">
          {{scope.apiMethod}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.createdTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updatedTime | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="text" style="color: #f95359" @click="deleteProject(row)">
            删除
          </el-button>
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
import { apiinfoAdd, apiinfoDelete, apiinfoList, apiinfoUpdate } from '../../api/apiinfo'

export default {
  name: 'apitest',
  data () {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },

      dialogvisibleTitle: null,
      dialogvisibleForm: false,
      titleMap: {
        updated: '编辑产品',
        created: '创建产品'
      },

      projectForm: {
        id: undefined,
        projectName: '',
        projectDesc: ''
      },
      projectrule: {
        projectName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
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
      apiinfoList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    resetprojectform () {
      this.projectForm = {
        id: undefined,
        projectName: '',
        projectDesc: ''
      }
    },

    handleCreate () {
      this.resetprojectform()
      this.dialogvisibleTitle = 'created'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },
    handleUpdate (row) {
      this.projectForm = Object.assign({}, row)
      this.dialogvisibleTitle = 'updated'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },

    createdProject () {
      this.$refs.ruleform.validate((valid) => {
        if (valid) {
          apiinfoAdd(this.projectForm).then(_ => {
            this.dialogvisibleForm = false
            this.fetchData()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updatedProject () {
      this.$refs.ruleform.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.projectForm)
          apiinfoUpdate(tempData.id, tempData).then(_ => {
            this.dialogvisibleForm = false
            this.fetchData()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    deleteProject (row) {
      this.$confirm('确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apiinfoDelete(row.id).then(res => {
          this.fetchData()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }).catch(_ => {})
    },

    indexMethod (index) {
      return (this.listQuery.page - 1) * this.listQuery.size + (index + 1)
    },

    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchData()
    },

    handlecancel () {
      this.resetprojectform()
      this.dialogvisibleForm = false
    },

    handlerowclick (row) {
      this.$router.push({
        name: 'System',
        query: { id: row.id, name: row.projectName }
      })
    }
  }
}
</script>

<style scoped>

</style>
