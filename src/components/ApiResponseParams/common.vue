<template>
  <el-table :data="list" size="mini">
    <el-table-column label="#" type="index" width="50px"></el-table-column>
    <el-table-column label="参数" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.param" :size="inputsize"/>
      </template>
    </el-table-column>
    <el-table-column label="类型" align="center" width="120px">
      <template slot-scope="scope">
        <el-select v-model="scope.row.type" :size="inputsize" filterable allow-create>
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
    <el-table-column label="操作" align="center" width="150">
      <template slot="header">
        <el-button
          v-if="list.length === 0"
          type="text"
          @click="addline(list)"
        >
          新增
        </el-button>
      </template>
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
import { allEnums } from '../../utils/enum'

export default {
  name: 'common',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      inputsize: '',
      datatype: allEnums.paramType,

      isenble: [
        { value: '是', label: '是' },
        { value: '否', label: '否' }
      ],
      datalist: [
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
  },
  methods: {
    addline (data) {
      data.push({
        param: null,
        desc: null,
        type: 'String',
        isBoolean: '否',
        example: null,
        remark: null
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
