<template>
  <el-form label-position="top" size="small" :model="caseSetData">
    <el-form-item label="用例集名称">
      <el-input v-model="caseSetData.caseName" />
    </el-form-item>
    <el-form-item label="全局请求头设置">
      <el-switch
        v-model="caseSetData.isAllHeaders"
        style="margin-bottom: 10px"
        @change="getVariableList"
      />
      <el-table :data="caseSetData.globleHeader" border v-if="caseSetData.isAllHeaders">
        <el-table-column label="#" type="index" align="center" />
        <el-table-column label="变量名" align="center">
          <template slot-scope="scope">
            <!--            <el-input v-model="scope.row.param"/>-->
            <el-select
              v-model="scope.row.param"
              filterable
              allow-create
              @blur="searchBlur(scope.row, $event)"
              style="width: 100%;"
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
        <el-table-column label="变量值" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.value" filterable allow-create style="width: 100%">
              <el-option
                v-for="item in variablilist"
                :key="item.id"
                :value="item.variableName"
                :label="item.variableName"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.$index === caseSetData.globleHeader.length -1"
              type="text"
              @click="addline(caseSetData.globleHeader)"
            >新增</el-button>
            <el-button
              v-if="caseSetData.globleHeader.length !== 1"
              type="text"
              style="color: #f95359"
              @click="deleteline(scope.$index, caseSetData.globleHeader)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
import { variableList } from '../../api/variable'

export default {
  name: 'create',
  props: {
  },
  data () {
    return {

      headerSelect: this.allEnums.requestHeader,
      variablilist: null,

      // 用例集信息
      caseSetData: {
        id: undefined,
        caseName: null,
        isAllHeaders: true,
        globleHeader: [
          {
            param: null,
            desc: null,
            type: 'String',
            value: null
          }
        ]
      }
    }
  },
  created () {
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
    getVariableList (val) {
      if (this.caseSetData.isAllHeaders) {
        variableList({ page: 1, size: 2147483647 }).then(res => {
          this.variablilist = res.data.results
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
