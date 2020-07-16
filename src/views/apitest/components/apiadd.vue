<template>
  <div class="add-container">
    <el-form :model="apirequest" ref="apirequest" :rules="apiinforule">

      <el-row :gutter="gutter">
        <el-col :span="span1">
          <el-form-item label="接口名称" prop="apiName">
          <el-input v-model="apirequest.apiName"/>
          </el-form-item>
        </el-col>
        <el-col :span="span1">
          <el-form-item label="所属项目">
            <el-input :value="name" :disabled="true"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :span="span2">
          <el-form-item label="请求地址">
          <el-input v-model="apirequest.apiPath">
            <el-select v-model="apirequest.apiMethod" slot="prepend" placeholder="请选择" class="method-select">
              <el-option v-for="(item, index) in requestMethod" :key="item" :label=index :value=item />
            </el-select>
          </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="gutter">
        <el-col :span="span2">
          <el-tabs class="tags-title" value="1">
            <el-tab-pane label="Params" name="1">
              <Comoninput :listdata="apirequest.apiParams"/>
            </el-tab-pane>
            <el-tab-pane label="Headers" name="2">
              <Comoninput :listdata="apirequest.apiHeaders"/>
            </el-tab-pane>
            <el-tab-pane label="Body" name="3" v-if="apirequest.apiMethod !== 'GET'">
              <Comoninput :listdata="apirequest.apiBody" assert="body"/>
            </el-tab-pane>
<!--            <el-tab-pane label="断言" name="4">-->
<!--              <Comoninput :listdata="apirequest.assert" assert="assert"/>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane label="提取" name="5">-->
<!--              <Comoninput :listdata="apirequest.regular"/>-->
<!--            </el-tab-pane>-->
          </el-tabs>
        </el-col>
      </el-row>
      <div class="button-form">
        <el-row :gutter="gutter">
          <el-col :span="span2">
            <el-form-item style="margin-bottom: 0">
              <el-button type="primary" @click="createdProject">
                提交
              </el-button>
              <el-button type="success" @click="commit">
                测试
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Comoninput from './comoninput'
import { apiinfoAdd } from '../../../api/apiinfo'
import { getProjectName } from '../../../utils/auth'
export default {
  name: 'apiadd',
  components: { Comoninput },
  inject: ['reload'],
  data () {
    return {
      gutter: 12,
      span1: 12,
      span2: 24,

      name: getProjectName(),

      apirequest: {
        apiName: '',
        apiParams: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiHeaders: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiBody: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        assert: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        regular: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiMethod: 'GET',
        apiPath: ''
      },
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
  methods: {
    commit () {
      console.log(this.apirequest)
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
    }
  }
}
</script>

<style scoped>
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
    text-align: right!important;
  }
</style>
