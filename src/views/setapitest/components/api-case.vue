<template>
  <div class="app-container">
    <div class="operation-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreateCase">新增</el-button>
    </div>
    <el-table :data="list" size="small">
      <el-table-column type="index" :index="indexMethod" label="#" />
      <el-table-column label="用例名称" align="center">
        <template slot-scope="scope">{{scope.row.caseName}}</template>
      </el-table-column>
      <el-table-column label="用例转台" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.caseStatus | formatStatus">{{scope.row.caseStatus | showStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="测试时间" align="center">
        <template slot-scope="scope">{{scope.row.startTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="创建者" align="center">
        <template slot-scope="scope">{{scope.row.created_User}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCaseTest(scope.row)">测试</el-button>
          <el-button type="text" @click="handleCopyCase(scope.row)">复制</el-button>
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

    <el-dialog
      title="测试用例"
      :visible.sync="dialogvisibleForm"
      width="1200px"
      class="create-case-dialog"
    >
      <el-form ref="caseDataForm" :model="caseData" :rules="caseDataRule" label-position="top">
        <el-form-item label="用例编号" prop="caseNum">
          <el-input v-model="caseData.caseNum" />
        </el-form-item>
        <el-form-item label="用例名称" prop="caseName">
          <el-input v-model="caseData.caseName" />
        </el-form-item>

        <el-form-item label="ApiPath">
          <el-input v-model="requestData.apiPath">
            <el-select v-model="requestData.apiMethod" slot="prepend" class="select-method">
              <el-option
                v-for="item in methons"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-tabs v-model="caseActiveName" type="card">
            <el-tab-pane label="Query参数" name="first">
              <common :request-data="caseData.apiParams" />
            </el-tab-pane>
            <el-tab-pane label="请求头" name="second">
              <common :request-data="caseData.apiHeaders" lables="header" />
            </el-tab-pane>
            <el-tab-pane label="请求体" name="third">
              <common :request-data="caseData.apiBody" lables="body" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>

        <el-form-item label="断言">
          <div class="assert-style">
            <div class="radio-style">
              <el-radio-group v-model="assertActive">
                <el-radio
                  v-for="item in assertype"
                  :label="item.value"
                  :key="item.value"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </div>
            <div class="select-assert">
              <el-form-item label="http状态码" v-show="assertActive === 101">
                <el-select v-model="caseData.apiAssert.httpcode">
                  <el-option
                    v-for="item in httpcode"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="响应code" v-show="assertActive === 102">
                <el-select v-model="caseData.apiAssert.responsecode">
                  <el-option
                    v-for="item in respcode"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="匹配的值" v-show="assertActive===103">
                <el-input v-model="caseData.apiAssert.fullMatch" />
              </el-form-item>

              <el-form-item label="响应时间" v-show="assertActive===104">
                <el-input v-model="caseData.apiAssert.responseTime" />
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="text-align:  right">
          <el-button type="primary" @click="createCase">保存</el-button>
          <el-button @click="handlecancelData">取消</el-button>
        </el-form-item>
      </el-form>
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
import { getUserId } from '../../../utils/user'
import { caseAdd, caseCopy, simplecaseRun } from '../../../api/case'

export default {
  name: 'ApiCase',
  props: {
    list: Array,
    listQuery: Object,
    total: Number,
    fetchData: Function,
    testapiinfo: {
      type: Object,
      required: true
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
      assertActive: 101,
      activeName: 'first',
      caseActiveName: 'first',
      responseName: 'first',
      testResult: {},
      caseData: {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
        apiParams: null,
        apiHeaders: null,
        apiBody: null,
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
        interface: this.$route.query.id
      },

      caseDataRule: {
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      },

      caseCopyData: {
        id: undefined,
        caseNum: '',
        caseName: ''
      },

      dialogvisibleForm: false,
      dialogvisibleCopy: false
    }
  },
  computed: {
    requestData () {
      var info = this.testapiinfo
      if (info.apiParams === null) {
        info.apiParams = [{
          param: null,
          desc: null,
          type: 'String',
          value: null
        }]
      } if (info.apiHeaders === null) {
        info.apiHeaders = [
          {
            param: null,
            desc: null,
            type: 'String',
            value: null
          }
        ]
      } if (info.apiBody === null) {
        info.apiBody = [{
          param: null,
          desc: null,
          type: 'String',
          value: null
        }]
      }
      return info
    },
    user () {
      return getUserId()
    }
  },
  created () {
  },
  methods: {
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
    resetCaeData () {
      this.caseData = {
        id: undefined,
        caseNum: '',
        caseName: this.requestData.apiName,
        caseDesc: '',
        apiParams: this.requestData.apiParams,
        apiHeaders: this.requestData.apiHeaders,
        apiBody: this.requestData.apiBody,
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
        interface: this.$route.query.id
      }
    },

    resetCaseCopy () {
      this.caseCopyData = {
        id: undefined,
        caseNum: '',
        caseName: ''
      }
    },

    handleCreateCase () {
      this.resetCaeData()
      this.dialogvisibleForm = true
      this.$nextTick(() => {
        this.$refs.caseDataForm.clearValidate()
      })
    },

    createCase () {
      this.$refs.caseDataForm.validate((valid) => {
        if (valid) {
          caseAdd(this.caseData).then(res => {
            if (res.code === 20000) {
              this.dialogvisibleForm = false
              this.fetchData()
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },

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

    handleCopyCase (row) {
      this.caseCopyData = Object.assign({}, row)
      this.caseCopyData.caseName = '副本-' + row.caseName
      this.dialogvisibleCopy = true
      this.$nextTick(() => {
        this.$refs.caseCopyData.clearValidate()
      })
    },

    handlecancelCopy () {
      this.resetCaseCopy()
      this.dialogvisibleCopy = false
    },
    handlecancelData () {
      this.resetCaeData()
      this.dialogvisibleForm = false
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
    }

  }
}
</script>

<style scoped>
</style>
