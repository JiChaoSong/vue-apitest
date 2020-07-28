<template>
  <div class="app-container">
    <div class="path-button">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input v-model="requestData.apiPath">
            <el-select  :value="requestData.apiMethod" slot="prepend" class="select-method">
              <el-option v-for="item in methons" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="subcommit">
            测试
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ApiTest',
  props: {
    apiInfomation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      methons: this.allEnums.requestMethod,

      requestData: this.apiInfomation
    }
  },
  created () {

  },
  methods: {
    subcommit () {
      console.log(this.requestData)
    }
  }
}
</script>

<style scoped>
  .select-method {
    width: 100px;
  }
  .path-button {
    width: 100%;
  }
</style>
