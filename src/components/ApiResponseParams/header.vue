<template>
  <el-table :data="list">
    <el-table-column label="#" type="index" width="50px"></el-table-column>
    <el-table-column label="参数" align="center" width="250">
      <template slot-scope="scope">
        <el-select v-model="scope.row.param" filterable allow-create @blur="searchBlur(scope.row, $event)" :size="inputsize">
          <el-option v-for="item in headerSelect" :key="item.value" :value="item.value" :label="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="必填" align="center" width="100">
      <template slot-scope="scope">
        <el-select :size="inputsize" v-model="scope.row.isBoolean">
          <el-option v-for="item in isenble" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="示例" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.example" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="说明" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.desc" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="150">
      <template slot-scope="scope">
        <el-button
          v-if="scope.$index === list.length -1"
          type="text"
          @click="addline(list)"
        >
          新增
        </el-button>
        <el-button
          v-if="list.length !== 1"
          type="text"
          style="color: #f95359"
          @click="deleteline(scope.$index, list)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      inputsize: '',
      list: [
        {
          param: null,
          desc: null,
          example: null,
          isBoolean: '否'
        }
      ],
      isenble: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      headerSelect: this.allEnums.requestHeader
    }
  },
  methods: {
    searchBlur (row, e) {
      row.param = e.target.value
    },
    addline (data) {
      data.push({
        param: null,
        desc: null,
        example: null,
        isBoolean: '否'
      })
    },
    deleteline (index, data) {
      data.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
