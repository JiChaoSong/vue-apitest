<template>
  <div class="system-container">
    <el-container>
      <el-aside width="250px" class="module-aside">
        <Moduleaside/>
      </el-aside>
      <el-main>
        内容
      </el-main>
    </el-container>
  </div>
</template>

<script>

import { moduleAdd, moduleDelete, moduleList, moduleUpdate } from '../../../api/module'
import Moduleaside from '../../../components/Moduleaside/index'
export default {
  name: 'system',
  components: { Moduleaside },
  data () {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        size: 10,
        project_id: this.$route.query.id
      },

      dialogvisibleTitle: null,
      dialogvisibleForm: false,
      titleMap: {
        updated: '编辑',
        created: '创建'
      },

      env: [
        { env: 'dev', url: null },
        { env: 'test', url: null },
        { env: 'pre', url: null },
        { env: 'pro', url: null }
      ],

      options: [this.$route.query],

      systemForm: {
        id: undefined,
        project: this.$route.query.id,
        systemName: '',
        systemEnv: [],
        systemDesc: ''
      },

      projectrule: {
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
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
      moduleList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    resetprojectform () {
      this.env = [
        { env: 'dev', url: null },
        { env: 'test', url: null },
        { env: 'pre', url: null },
        { env: 'pro', url: null }
      ]
      this.systemForm = {
        id: undefined,
        project: this.$route.query.id,
        systemName: '',
        systemEnv: [],
        systemDesc: ''
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
      this.systemForm = Object.assign({}, row)
      this.env = this.systemForm.systemEnv
      this.dialogvisibleTitle = 'updated'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },
    createdProject () {
      this.$refs.ruleform.validate((valid) => {
        if (valid) {
          moduleAdd(this.systemForm).then(_ => {
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
          const tempData = Object.assign({}, this.systemForm)
          moduleUpdate(tempData.id, tempData).then(_ => {
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
        moduleDelete(row.id).then(res => {
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
    // 新增一行
    addline (data) {
      data.push({
        env: '',
        url: ''
      })
    },
    deleteline (index, data) {
      data.splice(index, 1)
    },
    handlerowclick (row) {
      this.$router.push({
        name: 'Module',
        query: { id: row.id, name: row.systemName }
      })
    }
  }
}
</script>

<style scoped>
  .system-container {
    /*padding: 0 20px 10px 20px;*/
    height: 100%;
  }
  .module-aside {
    height: 700px;
    border-right:1px solid rgb(220, 223, 230);
    padding-right: 10px;
    /*background-color: white;*/
    /*font-size: 15px;*/
    /*border-radius: 2px;*/
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/

  }
</style>
