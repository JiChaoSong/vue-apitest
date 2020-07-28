<template>
  <div class="app-container">
    <el-form label-position="top">
      <el-form-item label="接口名称">
        <el-input/>
      </el-form-item>
      <el-form-item label="接口地址">
        <el-input>
          <el-select v-model="apiData.methon" slot="prepend" class="select-method">
            <el-option v-for="item in methons" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="请求参数">
        <ApiResponseParams/>
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
        methon: 'GET'
      }
    }
  }
}
</script>

<style scoped>
  .select-method {
    width: 150px;
  }
</style>
