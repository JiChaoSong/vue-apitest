<template>
  <el-table :data="list" border>
    <el-table-column type="index" label="#" width="50" />
    <el-table-column label="类型" align="center" width="180">
      <template slot-scope="scope">
        <el-select v-model="scope.row.type">
          <el-option
            v-for="item in paramextrat"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            :disabled="!item.isEnble"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="变量名" align="center" width="220">
      <template slot-scope="scope">
        <el-input v-model="scope.row.label" />
      </template>
    </el-table-column>
    <el-table-column label="表达式" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.expression" />
      </template>
    </el-table-column>
    <!-- <el-table-column label="" -->
    <el-table-column label="是否为全局变量" align="center" width="150">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.isGloble" />
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="150">
      <template slot-scope="scope">
        <el-button v-if="scope.$index === list.length -1" type="text" @click="addline(list)">新增</el-button>
        <el-button
          v-if="list.length !== 1"
          type="text"
          style="color: #f95359"
          @click="deleteline(scope.$index, list)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Extration',
  props: {
    list: Array
  },
  data () {
    return {
      // list: [
      //   {
      //     type: 101,
      //     label: null,
      //     expression: null
      //   }
      // ],
      paramextrat: this.allEnums.patamExtraction,

      jsonpath_expression: '$..变量名',
      regular_expression: '参考python的正则表达式'
    }
  },
  methods: {
    addline (data) {
      data.push({
        type: 101,
        label: null,
        isGloble: false,
        expression: null
      })
    },
    deleteline (index, data) {
      data.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
