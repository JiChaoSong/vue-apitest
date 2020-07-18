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
      <el-table-column label="项目名称" align="center" >
        <template slot-scope="scope">
          <span @click="handlerowclick(scope.row)">{{scope.row.projectName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目地址" align="center">
        <template slot-scope="scope">
          {{scope.row.projectUrl}}
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
        <el-form-item label="项目名称:" prop="projectName">
          <el-input v-model="projectForm.projectName" placeholder="请输入项目名称"/>
        </el-form-item>
        <el-form-item label="项目地址:" prop="projectUrl">
          <el-input v-model="projectForm.projectUrl" placeholder="请输入项目地址"/>
        </el-form-item>
        <el-form-item label="项目描述:" prop="projectDesc">
          <el-input
            v-model="projectForm.projectDesc"
            type="textarea" placeholder="请输入项目描述"
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
import { projectAdd, projectDelete, projectList, projectUpdate } from '../../api/project'
import { getUserId } from '../../utils/user'

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
        projectName: '',
        projectDesc: '',
        projectUrl: '',
        projectEnv: '',
        user: this.user
      },
      projectrule: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projectUrl: [
          { required: true, message: '请输入项目地址', trigger: 'blur' }
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
      projectList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    resetprojectform () {
      this.projectForm = {
        id: undefined,
        projectName: '',
        projectDesc: '',
        projectUrl: '',
        projectEnv: '',
        user: this.user
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
          projectAdd(this.projectForm).then(_ => {
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
          projectUpdate(tempData.id, tempData).then(_ => {
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
        projectDelete(row.id).then(res => {
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
