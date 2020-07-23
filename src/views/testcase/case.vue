<template>
  <div class="project-container">
    <div class="operation-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
      :row-style="{height: '20px'}"
      :cell-style="{padding:'5px'}"
    >
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="用例编号" align="center">
        <template slot-scope="scope">{{scope.row.caseNum}}</template>
      </el-table-column>
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">{{scope.row.caseName}}</template>
      </el-table-column>
      <el-table-column label="用例状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.caseStatus | formatStatus">{{scope.row.caseStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联接口" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="getApiInfodetail(scope.row)">
            {{scope.row.apiInfo.apiName}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">{{scope.row.created_User}}</template>
      </el-table-column>
      <el-table-column label="修改人" align="center">
        <template slot-scope="scope">{{scope.row.updated_User}}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <el-row>

<!--            <el-button type="text" @click="handleRelationApi(row)">关联接口</el-button>-->
          </el-row>
          <el-row>
            <el-button
              type="text"
              @click="runSimpleCase(row)"
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="用例执行中"
            >执行</el-button>
            <el-button type="text" @click="getLastCaseRecotd(row)">查看</el-button>
            <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
            <el-button type="text" style="color: #f95359" @click="deleteProject(row)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      :title="titleMap[dialogvisibleTitle]"
      :visible.sync="dialogvisibleForm"
      width="800px"
    >
      <el-form ref="ruleform" :model="projectForm" :rules="projectrule" label-width="100px">
        <el-form-item label="用例编号:" prop="projectName">
          <el-input v-model="projectForm.caseNum" placeholder="请输入用例编号" />
        </el-form-item>
        <el-form-item label="用例名称:" prop="projectUrl">
          <el-input v-model="projectForm.caseName" placeholder="请输入用例名称" />
        </el-form-item>
        <el-form-item label="关联接口:" prop="interface">
          <el-select v-model="projectForm.interface" filterable placeholder="请选择">
            <el-option
              v-for="item in apiinfolist"
              :key="item.id"
              :value="item.id"
              :label="item.apiName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用例描述:" prop="projectDesc">
          <el-input
            v-model="projectForm.caseDesc"
            type="textarea"
            placeholder="请输入用例描述"
            autosize
            style="width: 400px"
          />
        </el-form-item>
        <el-form-item style="text-align: left">
          <el-button
            type="primary"
            @click="dialogvisibleTitle==='created'?createdProject():updatedProject()"
          >保存</el-button>
          <el-button @click="handlecancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="关联接口" :visible.sync="dialogvisibleRelation" width="600px">
      <el-form label-width="100px" ref="apiinfoForm" :rules="apiinfoFormRule" :model="apiinfoForm">
        <el-form-item label="关联接口:" prop="apiinfoId">
          <el-select v-model="apiinfoForm.apiinfoId" filterable placeholder="请选择">
            <el-option
              v-for="item in apiinfolist"
              :key="item.id"
              :value="item.id"
              :label="item.apiName"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateApiinfo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="测试报告" :visible.sync="dialogvisibleReport" width="1000px">
      <SimpleCase :apicase="caseinformation" />
    </el-dialog>

    <el-dialog :title="dialogtitle" :visible.sync="dialogvisibleApiInfo" width="1000px">
      <ApiAdd :apirequest="apirequest" :dialogtitle="dialogtitle"/>
    </el-dialog>
  </div>
</template>

<script>
import { getUserId } from '../../utils/user'
import {
  caseAdd,
  caseDelete,
  caseList,
  caseUpdate,
  caseInfo,
  simplecaserecordRun,
  caserecordAdd,
  caserecordInfo, simplecaserecordLast
} from '../../api/case'
import { apiinfoList } from '../../api/apiinfo'
import SimpleCase from '../../components/SimpleCase/index'
import ApiAdd from '../../views/apitest/components/apiadd'

export default {
  name: 'project',
  inject: ['reload'],
  components: { SimpleCase, ApiAdd },
  computed: {
    user () {
      return getUserId()
    }
  },
  filters: {
    formatStatus (val) {
      const tagColor = {
        unexecuted: null,
        pass: 'success',
        fail: 'danger',
        block: 'warning',
        closed: 'info'
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
      },

      dialogtitle: null,
      dialogvisibleApiInfo: false,
      apirequest: null,

      // 用例执行时的loading
      fullscreenLoading: false,
      timer: '',
      dialogvisibleReport: false,
      caseinformation: null,

      success: false,

      // api列表
      apiinfolist: null,

      dialogvisibleRelation: false,
      apiinfoForm: {
        apiinfoId: null
      },

      apiinfoFormRule: {
        apiinfoId: [
          { required: true, message: '请选择关联接口', trigger: 'blur' }
        ]
      },

      dialogvisibleTitle: null,
      dialogvisibleForm: false,
      titleMap: {
        updated: '编辑用例',
        created: '创建用例'
      },

      projectForm: {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
        createdUser: this.user,
        updatedUser: this.user,
        interface: null
      },
      projectrule: {
        caseNum: [
          { required: true, message: '请输入用例编号', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      },
      caserecordId: null,
      // 报告详情
      caserecorddetail: null
    }
  },
  created () {
    this.fetchData()
    this.getapiList()
  },
  mounted () {
    this.getCaseinfo(this.caseinformation.id)
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

    getapiList () {
      apiinfoList({ page: 1, size: 2147483647 }).then(res => {
        this.apiinfolist = res.data.results
      })
    },

    getCaseRecordinfo (id) {
      this.fullscreenLoading = true
      caseInfo(id).then(res => {
        this.success = res.data.success
        this.caseinformation = res.data
      })
      if (!this.success) {
        const _this = this
        this.timer = setTimeout(function () { _this.getCaseRecordinfo(id) }, 1000)
      }
      if (this.success) {
        this.fullscreenLoading = false
        clearTimeout(this.timer)
      }
    },

    // 点击接口详情
    getApiInfodetail (row) {
      this.apirequest = row.apiInfo
      this.dialogtitle = row.apiInfo.apiName
      this.dialogvisibleApiInfo = true
    },

    // 获取最新一条测试报告
    getLastCaseRecotd (row) {
      simplecaserecordLast({ caseId: row.id }).then(res => {
        this.caseinformation = res.data
        this.dialogvisibleReport = true
      })
    },

    // 单场景测试用例执行
    runSimpleCase (row) {
      caserecordAdd({ case: row.id }).then(response => {
        this.caserecordId = response.data.id
        simplecaserecordRun({ caserecordId: this.caserecordId }).then(res => {
          if (res.code === 20000) {
            this.fetchData()
            location.reload()
            this.$notify({
              title: '成功',
              message: '请求成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    },

    lookcaseRecord () {
      caserecordInfo(this.caserecordId).then(res => {
        this.caserecorddetail = res.data
        this.dialogvisibleReport = true
      })
    },

    resetprojectform () {
      this.projectForm = {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
        createdUser: this.user,
        updatedUser: this.user,
        interface: null
      }
    },

    // 关联接口
    handleRelationApi (row) {
      this.projectForm = Object.assign({}, row)
      this.apiinfoForm = { apiinfoId: this.projectForm.interface }
      this.dialogvisibleRelation = true
      this.$nextTick(() => {
        this.$refs.apiinfoForm.clearValidate()
      })
    },

    updateApiinfo () {
      this.$refs.apiinfoForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.projectForm)
          tempData.interface = this.apiinfoForm.apiinfoId
          console.log(tempData.interface)
          caseUpdate(tempData.id, tempData).then(_ => {
            this.dialogvisibleRelation = false
            this.fetchData()
            this.$notify({
              title: '成功',
              message: '关联成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    handleCreate () {
      this.resetprojectform()
      this.dialogvisibleTitle = 'created'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },

    createdProject () {
      this.$refs.ruleform.validate(valid => {
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

    handleUpdate (row) {
      this.projectForm = Object.assign({}, row)
      this.dialogvisibleTitle = 'updated'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },

    updatedProject () {
      this.$refs.ruleform.validate(valid => {
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
      })
        .then(_ => {
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
        })
        .catch(_ => { })
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
