<template>
  <div class="project-container">
    <div class="operation-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
    >
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="用例编号" align="center" >
        <template slot-scope="scope">
          {{scope.row.caseNum}}
        </template>
      </el-table-column>
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">
          {{scope.row.caseName}}
        </template>
      </el-table-column>
      <el-table-column label="用例状态" align="center">
        <template slot-scope="scope">
          {{scope.row.caseStatus}}
        </template>
      </el-table-column>
      <el-table-column label="所属接口" align="center">
        <template slot-scope="scope">
          {{scope.row.interface}}
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

    <el-dialog :title="titleMap[dialogvisibleTitle]" :visible.sync="dialogvisibleForm" width="800px">
      <el-form ref="ruleform" :model="projectForm" :rules="projectrule" label-width="100px">
        <el-form-item label="用例编号:" prop="projectName">
          <el-input v-model="projectForm.caseNum" placeholder="请输入用例编号"/>
        </el-form-item>
        <el-form-item label="用例名称:" prop="projectUrl">
          <el-input v-model="projectForm.caseName" placeholder="请输入用例名称"/>
        </el-form-item>
        <el-form-item label="用例描述:" prop="projectDesc">
          <el-input
            v-model="projectForm.caseDesc"
            type="textarea" placeholder="请输入用例描述"
            autosize
            style="width: 400px"
          />
        </el-form-item>
        <el-form-item style="text-align: left">
          <el-button type="primary" @click="dialogvisibleTitle==='created'?createdProject():updatedProject()">保存</el-button>
          <el-button @click="handlecancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserId } from '../../utils/user'
import { caseAdd, caseDelete, caseList, caseUpdate } from '../../api/case'

export default {
  name: 'project',
  inject: ['reload'],
  computed: {
    user () {
      return getUserId()
    }
  },
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
        updated: '编辑项目',
        created: '创建项目'
      },

      projectForm: {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseStatus: '',
        caseDesc: '',
        createdUser: this.user,
        updatedUser: this.user,
        interface: ''

      },
      projectrule: {
        caseNum: [
          { required: true, message: '请输入用例编号', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
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
      caseList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    resetprojectform () {
      this.projectForm = {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseStatus: '',
        caseDesc: '',
        createdUser: this.user,
        updatedUser: this.user,
        interface: ''
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
          caseAdd(this.projectForm).then(_ => {
            this.dialogvisibleForm = false
            this.fetchData()
            location.reload()
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
          caseUpdate(tempData.id, tempData).then(_ => {
            this.dialogvisibleForm = false
            this.fetchData()
            location.reload()
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
        caseDelete(row.id).then(res => {
          this.fetchData()
          location.reload()
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

  .el-input{
    width: 400px;
  }
  .project-container {

  }
  .tag-span {
    margin:0 20px 0 20px;
    font-weight: bold;
  }

</style>
