<template>
  <div class="app-container">
    <el-form ref="ruleform" :model="caseData" :rules="caseDataRule" label-position="top">
      <el-form-item label="用例名称:" prop="caseName">
        <el-input v-model="caseData.caseName" placeholder="请输入用例名称" />
      </el-form-item>
      <el-form-item label="接口路径">
        <el-input v-model="caseData.apiInfo.apiPath" :disabled="true">
          <el-select
            v-model="caseData.apiInfo.apiMethod"
            slot="prepend"
            class="select-method"
            :disabled="true"
          >
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
          <el-tab-pane label="断言" name="fine">
            <assertions :api-assert="caseData.apiAssert"/>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button
          type="primary"
          @click="updatedProject()"
        >保存</el-button>
        <el-button @click="handlecancel">取消</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import common from '../../views/setapitest/components/common'
import extraction from '../../views/setapitest/components/extraction'
import { caseUpdate } from '../../api/case'
import { getUserId } from '../../utils/user'
import Assertions from '../../views/setapitest/components/assertions'

export default {
  name: 'index',
  components: { Assertions, common, extraction },
  inject: ['reload'],
  props: {
    caseData: {
      type: Object,
      require: true
    }
  },
  computed: {
    user () {
      return getUserId()
    }
  },
  data () {
    return {
      methons: this.allEnums.requestMethod,
      assertype: this.allEnums.assertType,
      httpcode: this.allEnums.httpCode,
      respcode: this.allEnums.responseCode,

      caseActiveName: 'first',

      dialogvisibleForm: false,

      caseDataRule: {
        caseName: [
          { required: true, message: '请输入用例名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatedProject () {
      this.$refs.ruleform.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.caseData)
          tempData.createdUser = tempData.createdUser.id
          tempData.updatedUser = this.user
          caseUpdate(tempData.id, tempData).then(_ => {
            this.dialogvisibleForm = false
            this.$emit('dialogStatus', this.dialogvisibleForm)
            this.reload()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      })
    },

    handlecancel () {
      this.dialogvisibleForm = false
      this.$emit('dialogStatus', this.dialogvisibleForm)
    },

    handledialogstatus (data) {
      this.dialogvisibleForm = data
    }
  }
}
</script>

<style scoped>
  .select-method {
    width: 150px;
  }
</style>
