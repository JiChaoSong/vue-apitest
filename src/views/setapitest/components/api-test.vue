<template>
  <div class="app-container">
    <div class="path-button">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input v-model="requestData.apiPath">
            <el-select v-model="requestData.apiMethod" slot="prepend" class="select-method">
              <el-option
                v-for="item in methons"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="!item.isEnble"
              />
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="8">
            <el-button type="success" @click="handleCreateCase" style="margin-right: 5px">新建用例</el-button>
            <el-dropdown split-button type="primary" @click="subcommit" @command="handleConmand">
              测试
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="save">保存并测试</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

        </el-col>
      </el-row>
    </div>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="Request" name="1">
        <el-tabs v-model="activeName1" type="card">
          <el-tab-pane label="Query参数" name="first">
            <common :request-data="requestData.apiParams" />
          </el-tab-pane>
          <el-tab-pane label="请求头" name="second">
            <common :request-data="requestData.apiHeaders" lables="header" />
          </el-tab-pane>
          <el-tab-pane label="请求体" name="third">
            <common :request-data="requestData.apiBody" lables="body" />
          </el-tab-pane>
          <el-tab-pane label="参数提取" name="four">
            <extraction :list="requestData.paramExtrat" />
          </el-tab-pane>
          <el-tab-pane label="断言" name="six">
            <assertions :api-assert="requestData.apiAssert" />
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="Response" name="2">
        <el-tabs v-model="responseName" type="card">
          <el-tab-pane label="响应头" name="first">
            <JsonViewer
              :value="testResult.responseHeader"
              style="width: 70%"
              :expand-depth="20"
              copyable
              :font-size="20"
            />
          </el-tab-pane>
          <el-tab-pane label="响应体" name="second">
            <JsonViewer
              :value="testResult.responseBody"
              :expand-depth="20"
              copyable
              :font-size="20"
            />
          </el-tab-pane>
          <el-tab-pane label="请求头" name="third">
            <JsonViewer
              :value="testResult.requestHeader"
              :expand-depth="20"
              copyable
              :font-size="20"
            />
          </el-tab-pane>
          <el-tab-pane label="请求体" name="four">
            <JsonViewer
              :value="testResult.requestBody"
              :expand-depth="20"
              copyable
              :font-size="20"
            />
          </el-tab-pane>
          <el-tab-pane label="参数提取结果" name="fine">
            <JsonViewer
              :value="testResult.extrationResult"
              :expand-depth="20"
              :font-size="20"
              copyable
            />
          </el-tab-pane>
          <el-tab-pane label="断言结果" name="six">
            <p style="color:#999999;">* 0:成功, 1:失败, 2: 错误*</p>
            <span>{{testResult.assertRestlt}}</span>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
      title="测试用例"
      :visible.sync="dialogvisibleForm"
      width="1200px"
      class="create-case-dialog"
    >
      <CaseView :case-data="caseData" @dialogStatus="handledialogstatus"/>
    </el-dialog>
  </div>
</template>

<script>
import common from './common'
import extraction from './extraction'
import assertions from './assertions'
import CaseView from '../../../components/CaseVIew/index'

import JsonViewer from 'vue-json-viewer'
import { apiinfoTest, apiinfoUpdate } from '../../../api/apiinfo'
import { getUserId } from '../../../utils/user'
import { caseAdd } from '../../../api/case'
export default {
  name: 'ApiTest',
  props: {
    testapiinfo: {
      type: Object,
      required: true
    }
  },
  components: { common, JsonViewer, extraction, assertions, CaseView },
  data () {
    return {
      methons: this.allEnums.requestMethod,
      assertype: this.allEnums.assertType,
      httpcode: this.allEnums.httpCode,
      respcode: this.allEnums.responseCode,
      assertActive: 101,
      activeName1: 'third',
      caseActiveName: 'first',
      responseName: 'second',
      testResult: {},
      caseData: {
        id: undefined,
        caseNum: '',
        caseName: '',
        caseDesc: '',
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
        interface: this.$route.query.id
      },

      caseDataRule: {
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      },

      dialogvisibleForm: false,
      activeNames: ['1', '2']

    }
  },
  created () {
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
      } if (info.paramExtrat === null) {
        info.paramExtrat = [
          {
            type: 101,
            label: null,
            isGloble: false,
            expression: null
          }
        ]
      } if (info.apiAssert === null) {
        info.apiAssert = {
          type: 101,
          httpcode: null,
          responsecode: null,
          responseTime: null,
          // 全文匹配
          fullMatch: null
        }
      }
      return info
    },
    user () {
      return getUserId()
    }
  },
  methods: {
    subcommit () {
      apiinfoTest(this.requestData).then(res => {
        this.testResult = res.data
        try {
          this.testResult.responseBody = JSON.parse(this.testResult.responseBody)
        } catch {
        }
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: '请求成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: res.message,
            type: 'danger',
            duration: 2000
          })
        }
      })
    },

    testAndUpdate () {
      apiinfoTest(this.requestData).then(res => {
        if (res.code === 20000) {
          this.testResult = res.data
          try {
            this.testResult.responseBody = JSON.parse(this.testResult.responseBody)
          } catch {
          }
          apiinfoUpdate(this.$route.query.id, this.requestData).then(ret => {
            if (ret.code === 20000) {
              this.$message({
                message: ret.message,
                type: 'success'
              })
            } else {
              this.$message.error(ret.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
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
        paramExtrat: this.requestData.paramExtrat,
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
    handleConmand (command) {
      if (command === 'save') {
        this.testAndUpdate()
      }
    },
    handleRadio (val) {
      this.assertActive = val
    }

  }
}
</script>

<style lang="scss">
.select-method {
  width: 100px;
}
.path-button {
  width: 100%;
  margin-bottom: 20px;
}
.title {
  width: 100%;
  background-color: #f8f8f8;
  padding: 10px;
  color: #999999;
}

.assert-style {
  border: 1px solid #dcdfe6;
}

.radio-style {
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.select-assert {
  padding: 10px;
}
</style>
