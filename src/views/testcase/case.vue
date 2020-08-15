<template>
  <div class="project-container">
    <div class="operation-container">
      <!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate">新增</el-button> -->
      <!-- <el-button
        type="primary"
        icon="el-icon-caret-right"
        size="small"
        @click="handleMutCaseRun"
      >批量执行</el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      size="small"
      :row-style="{height: '20px'}"
      :cell-style="{padding:'5px'}"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" align="center" />
      <el-table-column align="center" label="#" width="65px  " :index="indexMethod" type="index" />
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">{{scope.row.caseName}}</template>
      </el-table-column>
      <el-table-column label="用例状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.caseStatus | formatStatus">{{scope.row.caseStatus | showStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联接口" align="center">
        <template slot-scope="scope">
          <!--          <el-button type="text" @click="getApiInfodetail(scope.row)">-->
          {{scope.row.apiInfo.apiName}}
          <!--          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column label="运行次数" align="center">
        <template slot-scope="scope">{{scope.row.runcount}}</template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">{{scope.row.createdUser.username}}</template>
      </el-table-column>
      <el-table-column label="修改人" align="center">
        <template slot-scope="scope">{{scope.row.updatedUser.username}}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="{row}">
          <router-link :to="{name: 'CaseRecord', query: {id: row.id}}" style="padding: 10px">
            <el-button type="text">查看</el-button>
          </router-link>
          <el-button type="text" @click="handleCaseTest(row)">执行</el-button>
          <el-button type="text" @click="handleCopyCase(row)">复制</el-button>
          <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="text" style="color: #f95359" @click="deleteProject(row)">删除</el-button>
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
      width="1200px"
    >
      <CaseView :case-data="caseData" @dialogStatus="handledialogstatus" />
    </el-dialog>

    <el-dialog title="关联接口" :visible.sync="dialogvisibleRelation" width="600px">
      <el-form label-width="100px" ref="apiinfoForm" :rules="apiinfoFormRule" :model="apiinfoForm">
        <el-form-item label="关联接口:" prop="apiinfoId">
          <el-select @change="handleSelectApi" v-model="apiinfoForm.apiinfoId" placeholder="请选择">
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
      <ApiAdd :apirequest="apirequest" :dialogtitle="dialogtitle" />
    </el-dialog>

    <el-dialog
      title="复制测试用例"
      :visible.sync="dialogvisibleCopy"
      width="800px"
      class="create-case-dialog"
    >
      <el-form :model="caseCopyData" ref="caseCopyData" :rules="caseDataRule">
        <el-form-item label="用例名称" prop="caseName">
          <el-input v-model="caseCopyData.caseName" />
        </el-form-item>
        <el-form-item style="text-align:  right">
          <el-button type="primary" @click="copyCase">保存</el-button>
          <el-button @click="handlecancelCopy">取消</el-button>
        </el-form-item>
      </el-form>
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
  caseCopy,
  caserecordInfo, simplecaserecordLast, simplecaseRun
} from '../../api/case'
import { apiinfoList } from '../../api/apiinfo'
import SimpleCase from '../../components/SimpleCase/index'
import ApiAdd from '../../views/apitest/components/apiadd'
import CaseView from '../../components/CaseVIew/index'

export default {
  name: 'project',
  inject: ['reload'],
  components: { SimpleCase, ApiAdd, CaseView },
  computed: {
    user () {
      return getUserId()
    }
  },
  filters: {
    formatStatus (val) {
      const tagColor = {
        101: null,
        102: 'success',
        103: 'danger',
        104: 'warning',
        105: 'info'
      }
      return tagColor[val]
    },
    showStatus (val) {
      const tagValue = {
        101: 'unexecuted',
        102: 'pass',
        103: 'fail',
        104: 'block',
        105: 'closed'
      }
      return tagValue[val]
    }
  },
  data () {
    return {
      methons: this.allEnums.requestMethod,
      assertype: this.allEnums.assertType,
      httpcode: this.allEnums.httpCode,
      respcode: this.allEnums.responseCode,

      caseActiveName: 'first',
      assertActive: 101,

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

      caseData: {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
        apiInfo: {
          apiMethod: null,
          apiPath: null
        },
        apiParams: null,
        apiHeaders: null,
        apiBody: null,
        paramExtrat: null,
        apiAssert: {
          type: this.assertActive,
          httpcode: null,
          responsecode: null,
          responseTime: null,
          // 全文匹配
          fullMatch: null
        },
        createdUser: this.user,
        updatedUser: this.user,
        interface: null
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
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      },
      caserecordId: null,
      // 报告详情
      caserecorddetail: null,

      caseCopyData: {
        id: undefined,
        caseNum: '',
        caseName: ''
      },
      dialogvisibleCopy: false,

      caseDataRule: {
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      },
      valId: null,

      // 多选选中列表
      multipleSelection: []
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.getCaseinfo(this.caseinformation.id)
  },
  methods: {
    async fetchData () {
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

    handledialogstatus (data) {
      this.dialogvisibleForm = data
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

    resetCaeData () {
      this.caseData = {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
        apiInfo: {
          apiMethod: null,
          apiPath: null
        },
        apiParams: null,
        apiHeaders: null,
        apiBody: null,
        paramExtrat: null,
        apiAssert: {
          type: this.assertActive,
          httpcode: null,
          responsecode: null,
          responseTime: null,
          // 全文匹配
          fullMatch: null
        },
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

    // 关联接口下拉选择改变事件
    handleSelectApi (val) {
      console.log('选择了', val)
    },

    // 新增用例
    handleCreate () {
      this.resetCaeData()
      this.getapiList()
      this.dialogvisibleTitle = 'created'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },

    createdProject () {
      this.$refs.ruleform.validate(valid => {
        if (valid) {
          caseAdd(this.caseData).then(_ => {
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

    handleUpdate (row) {
      this.resetprojectform()
      this.resetCaeData()
      this.caseData = Object.assign({}, row)
      console.log(this.assertActive)
      this.dialogvisibleTitle = 'updated'
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.ruleform.clearValidate()
      })
    },
    handleRadio (val) {
      this.assertActive = val
    },
    updatedProject () {
      this.$refs.ruleform.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.caseData)
          tempData.apiAssert.type = this.assertActive
          tempData.createdUser = tempData.createdUser.id
          tempData.updatedUser = this.user
          caseUpdate(tempData.id, tempData).then(_ => {
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
      })
        .then(_ => {
          caseDelete(row.id).then(res => {
            this.fetchData()
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
    },

    handleCaseTest (row) {
      console.log(row)

      simplecaseRun({ caseId: row.id }).then(res => {
        if (res.code === 20000) {
          this.fetchData()
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
      })
    },

    resetCaseCopy () {
      this.caseCopyData = {
        id: undefined,
        caseNum: '',
        caseName: ''
      }
    },

    handleCopyCase (row) {
      this.resetCaseCopy()
      this.caseCopyData = Object.assign({}, row)
      this.caseCopyData.caseName = '副本-' + row.caseName
      this.dialogvisibleCopy = true
      this.$nextTick(() => {
        this.$refs.caseCopyData.clearValidate()
      })
    },

    // 复制用例
    copyCase () {
      this.$refs.caseCopyData.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.caseCopyData)
          caseCopy(tempData).then(res => {
            if (res.code === 20000) {
              this.dialogvisibleCopy = false
              this.fetchData()
              this.$notify({
                title: '成功',
                message: '复制成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },

    // 取消
    handlecancelCopy () {
      this.resetCaseCopy()
      this.dialogvisibleCopy = false
    },

    // 确定唯一的key值
    getRowKeys (row) {
      return row.id // 每条数据的唯一识别值
    },

    // 列表多选事件
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },

    // 清空选择的值
    clearSelect () {
      this.$refs.multipleTable.clearSelection()
    },

    // 用例批量执行
    handleMutCaseRun () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择用例')
      }
    }
  }
}
</script>

<style scoped>
.tag-span {
  margin: 0 20px 0 20px;
  font-weight: bold;
}
.el-table .cell {
  text-align: center;
  white-space: pre-line; /*保留换行符*/
}
</style>
