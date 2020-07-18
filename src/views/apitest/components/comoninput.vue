<template>
  <div>
    <el-table
      :data="listdata"
      size="mini"
      v-model="listdata"
    >
      <el-table-column label="#" width="40px">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="TYPE" align="center" v-if="assert === 'assert'" width="150px">
        <template>
          <el-select v-model="scope.row.type">
            <el-option v-for="item in assertlist" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="TYPE" align="center" v-if="assert === 'body'" width="150px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type">
            <el-option v-for="item in bodylist" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="KEY"  align="center">
        <template slot-scope="scope">
          <el-input class="table-input" v-model="scope.row.key" :value="scope.row.key"/>
        </template>
      </el-table-column>
      <el-table-column label="VALUE" align="center">
        <template slot-scope="scope">
          <el-input class="table-input-url" v-model="scope.row.value" :value="scope.row.value"/>
        </template>
      </el-table-column>
      <el-table-column label="DESC" align="center">
        <template slot-scope="scope">
          <el-input class="table-input-url" v-model="scope.row.desc" :value="scope.row.desc"/>
        </template>
      </el-table-column>
      <el-table-column label="" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index === listdata.length-1"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            circle
            @click="addline(listdata)"
          />
          <el-button
            v-if="listdata.length !== 1"
            type="danger"
            size="mini"
            circle
            icon="el-icon-minus"
            @click="deleteline(scope.$index,listdata)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'comoninput',
  props: {
    listdata: {
      type: Array,
      required: true
    },
    assert: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      list: [
        {
          type: 101,
          key: '',
          value: '',
          desc: ''
        }
      ],

      headerskey: {},
      assertlist: this.allEnums.asserttype,
      bodylist: this.allEnums.bodytype
    }
  },
  created () {
  },
  methods: {
    addline (data) {
      data.push({
        key: '',
        value: '',
        desc: ''
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
