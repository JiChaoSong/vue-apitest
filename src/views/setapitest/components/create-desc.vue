<template>
  <div class="app-container">
    <el-form label-position="top">
      <el-form-item label="接口名称" class="formLabel">
        <el-input/>
      </el-form-item>
      <el-form-item label="接口地址" class="formLabel">
        <el-input>
          <el-select v-model="apiData.apiMethod" slot="prepend" class="select-method">
            <el-option v-for="item in methons" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="请求参数" class="formLabel">
        <ApiResponseParams :requestparams="apiData"/>
      </el-form-item>
      <el-form-item label="返回示例" class="formLabel">

      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="subcommit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ApiResponseParams from '../../../components/ApiResponseParams/index'
export default {
  name: 'CreateDesc',
  components: { ApiResponseParams },
  data () {
    return {
      methons: this.allEnums.requestMethod,
      apiData: {
        apiName: null,
        apiMethod: 'GET',
        apiParams: [
          {
            param: null,
            desc: null,
            type: 'String',
            isBoolean: '否',
            example: null,
            remark: null
          }
        ],
        apiHeaders: [
          {
            param: null,
            desc: null,
            example: null,
            isBoolean: '否'
          }
        ],
        apiBody: [
          {
            param: null,
            desc: null,
            type: 'String',
            isBoolean: '否',
            example: null,
            remark: null
          }
        ]
      }
    }
  },
  comments: {
  },
  methods: {
    subcommit () {
      console.log(this.apiData)
    }
  }
}
</script>

<style lang="scss">
  .select-method {
    width: 150px;
  }

  .formLabel {
    .el-form-item__label {
      /*width: 100%;*/
      /*background-color: #FAFAFA;*/
       border-left:4px solid rgb(24,144,255);
      padding: 0 0 0 10px;
     }
    .el-form-item__content {
      padding-top: 10px;
    }
  }

</style>
