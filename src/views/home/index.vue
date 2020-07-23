<template>
  <div class="app-container">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="span1">
          <div class="card-content">
            项目总数: {{list.projectCount}}
          </div>
        </el-col>
        <el-col :span="span1">
          <div class="card-content">
            接口总数: {{list.apiCount}}
          </div>
        </el-col>
        <el-col :span="span1">
          <div class="card-content">
            用例总数: {{list.caseCount}}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { statisticCount } from '../../api/statistic'
import { getUserId } from '../../utils/user'

export default {
  name: 'index',
  data () {
    return {
      span1: 8,

      listQuery: {
        page: 1,
        size: 2147483647
      },
      list: null,
      listLoading: true,

      post: {
        userId: getUserId()
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      statisticCount(this.post).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 830px;
    /*padding: 20px;*/
  }
  .card-content {
    padding: 20px;
    height: 150px;
    background-color: white;
    border-radius: 5px ;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

</style>
