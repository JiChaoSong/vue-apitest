<template>
  <div class="project-container">
    <div class="filter-container">
      <el-form  :model="listQuery" size="small" label-position="left" inline="true">
        <el-row :gutter="1">
          <el-col :span="6">
            <el-form-item label="接口名称" prop="apiName">
              <el-input v-model="listQuery.apiNames" size="small" class="filter-input" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="接口地址" prop="apiPath">
              <el-input v-model="listQuery.apiPaths" size="small" class="filter-input" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="请求方法" prop="apiMethod">
              <el-select v-model="listQuery.apiMethods" size="small" class="filter-input">
                <el-option
                  v-for="item in Methods"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="fetchData" size="small">查询</el-button>
              <el-button @click="resetListQuery" size="small">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operation-container">
      <router-link :to="{name: 'Create'}" style="padding-right:20px;">
        <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
      </router-link>
      <el-button type="success" icon="el-icon-plus" size="small" @click="handleImport">导入</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" stripe size="small" @row-click="apiDetail">
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="接口名称" align="center">
        <template slot-scope="scope">{{scope.row.apiName}}</template>
      </el-table-column>
      <el-table-column label="请求方式" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.apiMethod | formatStatus" effect="plain">{{scope.row.apiMethod}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="接口地址" align="center">
        <template slot-scope="scope">{{scope.row.apiPath}}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{scope.row.updatedTime | formatDate}}</template>
      </el-table-column>
    </el-table>
    <el-dialog title="导入接口" :visible.sync="dialogvisibleImport" width="800px">
      <el-form ref="apiImport" :model="apiImport" :rules="apiImportRule" label-width="120px">
        <el-form-item label="接口文档地址" prop="url">
          <el-input v-model="apiImport.url" style="width: 80%" />
        </el-form-item>
        <el-form-item label="所属项目" prop="project">
          <el-input v-model="apiImport.project" style="width: 80%" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importApiInfo">提交</el-button>
          <el-button @click="hanlecancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { apiinfoList, apiinfoImport } from '../../api/apiinfo'
import { getProjectName } from '../../utils/auth'

export default {
  name: 'project',
  inject: ['reload'],

  filters: {
    formatStatus (val) {
      const tagColor = {
        GET: null,
        POST: 'success',
        PATCH: 'info',
        PUT: 'warning',
        DELETE: 'danger'
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
        apiNames: null,
        apiPath: null,
        apiMethod: null
      },
      Methods: this.allEnums.requestMethod,
      dialogvisibleImport: false,
      apiImport: {
        url: '',
        project: getProjectName()
      },
      apiImportRule: {
        url: [
          { required: true, message: '请输入接口文档地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
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
    resetapiImport () {
      this.apiImport = {
        url: '',
        project: getProjectName()
      }
    },

    handleImport () {
      this.resetapiImport()
      this.dialogvisibleImport = true
      this.$nextTick(() => {
        this.$refs.apiImport.clearValidate()
      })
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.fetchData()
    },
    indexMethod (index) {
      return (this.listQuery.page - 1) * this.listQuery.size + (index + 1)
    },
    apiDetail (row) {
      this.$router.push({
        name: 'Detail',
        query: { id: row.id }
      })
    },

    importApiInfo () {
      this.$refs.apiImport.validate((valid) => {
        if (valid) {
          apiinfoImport(this.apiImport).then(res => {
            this.dialogvisibleImport = false
            this.$notify({
              title: '成功',
              message: '导入成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    hanlecancel () {
      this.resetapiImport()
      this.dialogvisibleImport = false
    },

    resetListQuery () {
      this.listQuery = {
        page: 1,
        size: 10,
        apiNames: null,
        apiPaths: null,
        apiMethods: null
      }
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
}
.el-select {
  width: 400px;
}
.tag-span {
  margin: 0 20px 0 20px;
  font-weight: bold;
}
.el-table .cell {
  text-align: center;
  white-space: pre-line; /*保留换行符*/
}
.filter-input {
  width: 100%;
}
</style>
