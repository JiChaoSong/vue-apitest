<template>
  <div class="apitest-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
      :row-style="{height: '20px'}"
      :cell-style="{padding:'5px'}"
      :header-cell-style="{'background':'#FAFAFA'}"
      @selection-change="handleSelectionChange"
      :max-height="560"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="接口名称" align="center" >
        <template slot-scope="scope">
          {{scope.row.apiName}}
        </template>
      </el-table-column>
      <el-table-column label="请求方法" align="center" width="80px">
        <template slot-scope="scope">
          {{scope.row.apiMethod}}
        </template>
      </el-table-column>
      <el-table-column label="请求地址" align="center" >
        <template slot-scope="scope">
          {{scope.row.apiPath}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="150px">
        <template slot-scope="scope">
          {{scope.row.createdTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="150px">
        <template slot-scope="scope">
          {{scope.row.updatedTime | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px" fixed="right">
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
      layout="sizes,prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      class="page"
    />

  </div>
</template>

<script>
import { apiinfoDelete, apiinfoUpdate } from '../../../api/apiinfo'

export default {
  name: 'apilist',
  props: {
    list: {
      type: Array,
      require: true
    },
    total: {
      type: Number,
      require: true
    },
    listLoading: {
      type: Boolean,
      require: true,
      default: true
    },
    listQuery: {
      type: Object,
      require: true
    },
    fetchData: {
      type: Function,
      require: true
    },
    addTab: {
      type: Function,
      require: true
    }
  },
  data () {
    return {

      editableTabsValue: '1',
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
      },
      multipleSelection: []
    }
  },
  methods: {

    resetprojectform () {
      this.projectForm = {
        id: undefined,
        projectName: '',
        projectDesc: ''
      }
    },

    handleUpdate (row) {
      this.projectForm = Object.assign({}, row)
      this.addTab(this.editableTabsValue, row)
      this.$emit('getdata', this.projectForm)
      this.dialogvisibleTitle = 'updated'
      this.dialogvisibleForm = true
      // this.$nextTick(() => {
      //   this.$refs.ruleform.clearValidate()
      // })
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

    handleSizeChange (val) {
      this.listQuery.size = val
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
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    }
  }
}
</script>

<style scoped>
  .apitest-container{
    padding: 0 20px 10px 20px;
  }
  .page {
    padding-top: 10px;
  }
</style>
