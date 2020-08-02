<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="全局登录接口设置" name="1">
        <el-form>
          <el-table :data="list">
            <el-table-column type="expand" width="50" v-if="apiInfo !== null">
              <template slot-scope="props">
                <common :request-data="apiInfo.apiBody" lables="body" v-model="props.row.param" />
              </template>
            </el-table-column>
            <el-table-column label="请选择接口">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select v-model="scope.row.apiId" filterable @change="selectChange">
                    <el-option
                      v-for="item in apilist"
                      :key="item.id"
                      :value="item.id"
                      :label="item.apiName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="是否开启">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" />
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <el-button type="primary">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <!-- <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>

    <div v-if="isLogin">
      <h3>登录接口</h3>
      <el-select v-model="apiId" filterable>
        <el-option v-for="item in apilist" :key="item.id" :value="item.id" :label="item.apiName"></el-option>
      </el-select>
    </div>-->
  </div>
</template>

<script>
import { apiinfoList, getapiinfo } from '../../api/apiinfo'
import common from '../setapitest/components/common'
const cityOptions = ['全局登录接口', '请求头']
export default {
  name: 'setting',
  components: { common },
  data () {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      listQuery: {
        page: 1,
        size: 2147483647
      },
      list: [
        {
          apiId: null,
          status: true,
          param: null
        }
      ],
      globleSetting: [],

      apilist: null,
      moreshow: false,
      count: 1,
      apiInfo: null,

      activeNames: ['1']
    }
  },
  computed: {
    isLogin () {
      if (this.checkedCities.includes('全局登录接口')) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.getapilist()
  },
  mounted () {
    this.getmoreshow()// 避免点击两次才生效
  },
  methods: {
    getapilist () {
      apiinfoList(this.listQuery).then(res => {
        this.apilist = res.data.results
      })
    },

    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },

    getmoreshow () {
      if (this.count % 2 === 0) {
        this.moreshow = true
      } else {
        this.moreshow = false
      }
      this.count++
    },

    handleChange (val) {
      console.log(val)
    },
    selectChange (value) {
      getapiinfo(value).then(res => {
        this.apiInfo = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style lang="scss" >
.el-collapse {
  border: 0;
  margin-top: 20px;
}
.el-calendar__title {
  border: 0;
}
.el-collapse-item__wrap {
  border: 0;
  padding: 20px;
}
.el-collapse-item__header {
  height: 40px;
  background-color: #fafafa;
  border: 0;
  font-weight: bold;
  padding-left: 10px;
  color: #999999;
}
.el-select > .el-input {
  margin-top: 20px;
}
</style>
