<template>
  <el-table :data="list" size="mini">
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column label="参数" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.param" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="类型" align="center" width="100px">
      <template slot-scope="scope">
        <el-select v-model="scope.row.type" :size="inputsize">
          <el-option v-for="item in datatype" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="必填" align="center" width="100px">
      <template slot-scope="scope">
        <el-select :size="inputsize" v-model="scope.row.isBoolean">
          <el-option v-for="item in isenble" :key="item.value" :value="item.value" :label="item.label"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="说明" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.desc" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="示例" align="center">
      <template slot-scope="scope">
        <el-input :value="scope.row.example" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="备注" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remark" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="text">新增</el-button>
        <el-button type="text" style="color: #f95359">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { allEnums } from '../../utils/enum'

export default {
  name: 'common',
  data () {
    return {
      inputsize: 'mini',
      datatype: allEnums.paramType,

      isenble: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],

      list: [
        {
          param: 'username',
          desc: '用户名',
          type: 'String',
          isBoolean: '是',
          example: '示例',
          remark: '备注'
        },
        {
          param: 'username',
          desc: '用户名',
          type: 'String',
          isBoolean: '是',
          example: '示例',
          remark: '备注'
        },
        {
          param: 'username',
          desc: '用户名',
          type: 'String',
          isBoolean: '是',
          example: '示例',
          remark: '备注'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
