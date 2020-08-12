<template>
  <div class>
    <el-table :data="requestData" border>
      <el-table-column type="index" label="#" />
      <el-table-column label="参数名" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.param" v-if="lables !== 'header'" />
          <el-select
            v-else
            v-model="scope.row.param"
            filterable
            allow-create
            @blur="searchBlur(scope.row, $event)"
          >
            <el-option
              v-for="item in headerSelect"
              :key="item.value"
              :value="item.value"
              :label="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column v-if="lables === 'body'" label="类型" align="center" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" filterable allow-create>
            <el-option
              v-for="item in datatype"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="参数值" align="center">
        <template slot-scope="scope">
<!--          <el-input v-model="scope.row.value" />-->
          <el-select v-model="scope.row.value" filterable allow-create>
            <el-option
              v-for="item in variablilist"
              :key="item.id"
              :value="item.variableName"
              :label="item.variableName"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="说明" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.desc" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index === requestData.length -1"
            type="text"
            @click="addline(requestData)"
          >新增</el-button>
          <el-button
            v-if="requestData.length !== 1"
            type="text"
            style="color: #f95359"
            @click="deleteline(scope.$index, requestData)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allEnums } from '../../../utils/enum'
import { variableList } from '../../../api/variable'

export default {
  name: 'common',
  props: {
    requestData: {
      type: Array,
      require: true
    },
    lables: String
  },
  data () {
    return {
      datatype: allEnums.paramType,
      headerSelect: this.allEnums.requestHeader,
      list: this.requestData,

      variablilist: null
    }
  },
  created () {
    // console.log(this.requestData)
    this.getVariableList()
  },
  methods: {
    searchBlur (row, e) {
      row.param = e.target.value
    },
    addline (data) {
      data.push({
        param: null,
        desc: null,
        type: 'String',
        value: null
      })
    },
    deleteline (index, data) {
      data.splice(index, 1)
    },

    // 获取全局变量列表
    getVariableList () {
      variableList({ page: 1, size: 2147483647 }).then(res => {
        this.variablilist = res.data.results
      })
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
