<template>
  <el-form :model="apiAssert">
    <el-form-item >
      <div class="assert-style">
        <div class="radio-style">
          <el-radio-group v-model="apiAssert.type">
            <el-radio
              v-for="item in assertype"
              :label="item.value"
              :key="item.value"
              :disabled="item.disabled"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </div>
        <div class="select-assert">
          <el-form-item label="http状态码" v-show="apiAssert.type === 102">
            <el-select v-model="apiAssert.httpcode">
              <el-option
                v-for="item in httpcode"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="响应code" v-show="apiAssert.type === 103">
            <el-select v-model="apiAssert.responsecode">
              <el-option
                v-for="item in respcode"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="匹配的值" v-show="apiAssert.type===104">
            <el-input v-model="apiAssert.fullMatch" />
          </el-form-item>

          <el-form-item label="响应时间" v-show="apiAssert.type===105">
            <el-input v-model="apiAssert.responseTime" />
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'assertions',
  props: {
    apiAssert: Object
  },
  data () {
    return {
      assertype: this.allEnums.assertType,
      httpcode: this.allEnums.httpCode,
      respcode: this.allEnums.responseCode,
      assertActive: 101
    }
  }
}
</script>

<style scoped>
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
