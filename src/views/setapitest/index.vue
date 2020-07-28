<template>
  <div class="project-container">
    <div class="operation-container">
      <router-link :to="{name: 'Create'}">
        <el-button type="primary" icon="el-icon-plus" size="small" >新增</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
      @row-click="apiDetail"
      :row-style="{height: '20px'}"
      :cell-style="{padding:'5px'}"
    >
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="接口名称" align="center">
        <template slot-scope="scope">{{scope.row.apiName}}</template>
      </el-table-column>
      <el-table-column label="请求方式" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.apiMethod | formatStatus" effect="plain">
            {{scope.row.apiMethod}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="接口地址" align="center">
        <template slot-scope="scope">
          {{scope.row.apiPath}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.updateTime | formatDate}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
<!--        <template slot-scope="{row}">-->
<!--          <el-button-->
<!--            type="text"-->
<!--            @click="runSimpleCase(row)"-->
<!--            v-loading.fullscreen.lock="fullscreenLoading"-->
<!--            element-loading-text="用例执行中"-->
<!--          >执行</el-button>-->
<!--          <el-button type="text" @click="getLastCaseRecotd(row)">查看</el-button>-->
<!--          <el-button type="text" @click="handleUpdate(row)">编辑</el-button>-->
<!--          <el-button type="text" style="color: #f95359" @click="deleteProject(row)">删除</el-button>-->
<!--        </template>-->
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
import { apiinfoList } from '../../api/apiinfo'

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
        size: 10
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
    white-space: pre-line;/*保留换行符*/
  }
</style>
