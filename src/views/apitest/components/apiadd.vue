<template>
  <div class="add-container">
    <el-form :model="apirequest" ref="apirequest" :rules="apiinforule">
      <el-row :gutter="gutter">
        <el-col :span="span1">
          <el-form-item label="接口名称" prop="apiName">
            <el-input v-model="apirequest.apiName" />
          </el-form-item>
        </el-col>
        <el-col :span="span1">
          <el-form-item label="所属项目">
            <el-input v-model="project.projectName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :span="span1">
          <el-form-item label="Host">
            <el-input v-model="apirequest.apiHost">
              <el-select
                v-model="apirequest.apiMethod"
                slot="prepend"
                placeholder="请选择"
                class="method-select"
              >
                <el-option
                  v-for="(item, index) in requestMethod"
                  :key="item"
                  :label="index"
                  :value="item"
                />
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="span1">
          <el-form-item label="接口路径">
            <el-input v-model="apirequest.apiPath" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :span="span2">
          <el-tabs class="tags-title" value="1">
            <el-tab-pane label="Params" name="1">
              <Comoninput :listdata="apirequest.apiParams" />
            </el-tab-pane>
            <el-tab-pane label="Headers" name="2">
              <Comoninput :listdata="apirequest.apiHeaders" />
            </el-tab-pane>
            <el-tab-pane label="Body" name="3" v-if="apirequest.apiMethod !== 'GET'">
              <Comoninput :listdata="apirequest.apiBody" assert="body" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px" v-if="apiresponse !== null">
        <span style="color: #606266; font-weight: bold">Response</span>
        <JsonViewer :value="apiresponse" :expand-depth="20" copyable />
      </el-row>
      <div class="button-form">
        <el-row :gutter="gutter">
          <el-col :span="span2">
            <el-form-item style="margin-bottom: 0">
              <el-button
                type="primary"
                @click="dialogtitle==='created'?createdProject():updatedProject()"
              >提交</el-button>
              <el-button type="success" @click="runApiInfo">测试</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Comoninput from './comoninput'
import JsonViewer from 'vue-json-viewer'
import { apiinfoAdd, apiinfoRun, apiinfoUpdate } from '../../../api/apiinfo'
import { getProject } from '../../../utils/auth'
import { projectList } from '../../../api/project'
export default {
  name: 'apiadd',
  components: { Comoninput, JsonViewer },
  inject: ['reload'],
  props: {
    apirequest: {
      type: Object,
      require: true
    },
    dialogtitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      gutter: 12,
      span1: 12,
      span2: 24,

      listQuery: {
        id: getProject()
      },

      project: {
        projectName: '',
        projectUrl: ''
      },

      apiresponse: null,

      apiinforule: {
        apiName: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ]
      },

      requestMethod: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
        HEAD: 'HEAD',
        OPTIONS: 'OPTIONS'
      },
      apiId: undefined
    }
  },
  created () {
    this.fetchData()
    this.changeType()
  },
  methods: {
    commit () {
      console.log(this.apirequest)
    },

    fetchData () {
      this.listLoading = true
      projectList(this.listQuery).then(res => {
        this.listLoading = false
        this.project = res.data.results[0]
        this.apirequest.apiHost = res.data.results[0].projectUrl
      })
    },
    createdProject () {
      this.$refs.apirequest.validate((valid) => {
        if (valid) {
          apiinfoAdd(this.apirequest).then(res => {
            this.apiId = res.data.id
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
    updatedProject () {
      this.$refs.apirequest.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.apirequest)
          apiinfoUpdate(tempData.id, tempData).then(_ => {
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
    runApiInfo () {
      if (this.dialogtitle !== 'created') {
        apiinfoUpdate(this.apirequest.id, this.apirequest).then(_ => {

        })
      }

      apiinfoRun(this.apirequest).then(res => {
        try {
          const response = JSON.parse(res.data)
          this.apiresponse = response
        } catch {
          this.apiresponse = res.data
        }

        this.$notify({
          title: '成功',
          message: '请求成功',
          type: 'success',
          duration: 2000
        })
      })
    },

    changeType () {
      if (this.apirequest.apiHeaders === null) {
        this.apirequest.apiHeaders = [{ key: '', value: '', desc: '' }]
      }
      if (this.apirequest.apiParams === null) {
        this.apirequest.apiParams = [{ key: '', value: '', desc: '' }]
      }
      if (this.apirequest.apiBody === null || this.apirequest.apiBody.length === 0) {
        this.apirequest.apiBody = [{ key: '', value: '', desc: '' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-container {
  /*text-align: center;*/
  /*margin-left: 120px;*/
  margin: 20px 20px 0 20px;
}
.method-select {
  width: 120px;
  text-align: center;
}

.tags-title {
  /*margin-left: 50px;*/
}
.button-form {
  margin-top: 20px;
  text-align: right !important;
}
</style>
