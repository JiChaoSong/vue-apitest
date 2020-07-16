<template>
  <div class="system-container">
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
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span @click="handlerowclick(scope.row)">{{scope.row.systemName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="环境">
        <template slot-scope="scope">
          {{scope.row.systemName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="URL">
        <template slot-scope="scope">
          {{scope.row.systemName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
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
      <el-form ref="ruleform" :model="systemForm" :rules="projectrule" label-width="100px">
        <el-form-item label="系统名称:" prop="systemName">
          <el-input v-model="systemForm.systemName" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="系统环境:">
          <el-table
            v-if="env.length !==0 "
            :data="env"
            size="mini"
            style="width: 550px"
            v-model="systemForm.systemEnv"
          >
            <el-table-column label="#" width="40px">
              <template slot-scope="scope">
                {{scope.$index}}
              </template>
            </el-table-column>
            <el-table-column label="环境" width="100px" align="center">
              <template slot-scope="scope">
                <el-input class="table-input" v-model="scope.row.env" :value="scope.row.env"/>
              </template>
            </el-table-column>
            <el-table-column label="url" width="280px" align="center">
              <template slot-scope="scope">
                <el-input class="table-input-url" v-model="scope.row.url" :value="scope.row.url"/>
              </template>
            </el-table-column>
            <el-table-column label="" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.$index === env.length-1"
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="addline(env)"
                />
                <el-button
                  v-if="env.length !== 1"
                  type="danger"
                  size="mini"
                  circle
                  icon="el-icon-minus"
                  @click="deleteline(scope.$index,env)"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-button
            v-else
            type="primary"
            size="mini"
            icon="el-icon-plus"
            circle
            @click="addline(env)"/>
        </el-form-item>

        <el-form-item label="系统描述:" prop="systemDesc">
          <el-input
            v-model="systemForm.systemDesc"
            type="textarea" placeholder="请输入描述"
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
import { systemAdd, systemDelete, systemList, systemUpdate } from '../../../api/system'

export default {
  name: 'system',
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
      systemList(this.listQuery).then(res => {
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
      this.systemForm.systemEnv = this.env
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
          systemAdd(this.systemForm).then(_ => {
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
          systemUpdate(tempData.id, tempData).then(_ => {
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
        systemDelete(row.id).then(res => {
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
    padding: 0 20px 10px 20px;
  }
  .el-input{
    width: 550px;
  }
  .table-input{
    width: 80px;
  }
  .table-input-url {
    width: 260px;
  }

</style>
