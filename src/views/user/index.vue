<template>
  <div class="app-container">
    <el-form>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item/>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <span>key</span>
          </el-form-item>
        </el-col>
        <el-col :span="6"><el-form-item/></el-col>
        <el-col :span="6">
          <el-form-item>
            <span>value</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-for="(value,key) in listdata" :key="key">
        <el-col :span="12">
          <el-form-item>
            <el-input :value="key"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input :value="value"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      listdata: {
        101: '101',
        102: '101',
        103: '101',
        104: '101',
        105: '101'
      }
    }
  }
}
</script>

<style scoped>
  .el-input{
    width: 400px;
  }
</style>
