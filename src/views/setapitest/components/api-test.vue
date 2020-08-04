<template>
  <div class="app-container">
    <div class="path-button">
      <el-row :gutter="10">
        <el-col :span="19">
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
        <el-col :span="5">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-button type="success" @click="handleCreateCase">新建用例</el-button>
            </el-col>
            <el-col :span="12">
              <el-dropdown split-button type="primary" @click="subcommit" @command="handleConmand">
                测试
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="save">保存并测试</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
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
        </el-tabs>
      </el-collapse-item>
    </el-collapse>

    <el-dialog
      title="测试用例"
      :visible.sync="dialogvisibleForm"
      width="1200px"
      class="create-case-dialog"
    >
      <el-form ref="caseDataForm" :model="caseData" :rules="caseDataRule" label-position="top">
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
            <el-tab-pane label="参数提取" name="four">
              <extraction :list="caseData.paramExtrat" />
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
                  :disabled="item.disabled"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </div>
            <div class="select-assert">
              <el-form-item label="http状态码" v-show="assertActive === 102">
                <el-select v-model="caseData.apiAssert.httpcode">
                  <el-option
                    v-for="item in httpcode"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="响应code" v-show="assertActive === 103">
                <el-select v-model="caseData.apiAssert.responsecode">
                  <el-option
                    v-for="item in respcode"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="匹配的值" v-show="assertActive===104">
                <el-input v-model="caseData.apiAssert.fullMatch" />
              </el-form-item>

              <el-form-item label="响应时间" v-show="assertActive===105">
                <el-input v-model="caseData.apiAssert.responseTime" />
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="text-align:  right">
          <el-button type="primary" @click="createCase">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import common from './common'
import extraction from './extraction'
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
  components: { common, JsonViewer, extraction },
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
            expression: null
          }
        ]
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
          this.$message({
            message: res.message,
            type: 'success'
          })
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
