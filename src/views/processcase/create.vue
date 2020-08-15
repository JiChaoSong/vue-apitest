<template>
  <div>
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
        <el-table
          :data="caseSetData.globleHeader"
          border
          v-if="caseSetData.isAllHeaders"
          size="small"
        >
          <el-table-column label="#" type="index" align="center" />
          <el-table-column label="变量名" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.param"
                filterable
                allow-create
                @blur="searchBlur(scope.row, $event)"
                class="elselect"
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
      <el-form-item label="流程列表">
        <el-table :data="caseSetData.caseList" border row-key="id">
          <el-table-column type="index" label="#" align="center" />
          <el-table-column label="用例名称" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.case" class="elselect" filterable>
                <el-option
                  v-for="item in caseListData"
                  :key="item.id"
                  :value="item.id"
                  :label="item.caseName"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="参数提取" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.extractValue" />
            </template>
          </el-table-column>
          <el-table-column label="是否为全局变量" align="center" width="150">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isGloble" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.case !== null"
                @click="handleUpdateCase(scope.row.case)"
              >编辑</el-button>
              <el-button
                type="text"
                v-if="scope.row.case !== null"
                @click="handleCaseTest(scope.row.case)"
              >测试</el-button>
              <el-button
                v-if="scope.$index === caseSetData.caseList.length -1"
                type="text"
                @click="addlineCase(caseSetData.caseList)"
              >新增</el-button>
              <el-button
                v-if="caseSetData.caseList.length !== 1"
                type="text"
                style="color: #f95359"
                @click="deleteline(scope.$index, caseSetData.caseList)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="handleCreated">保存</el-button>
      </el-form-item>
    </el-form>

    <!-- 用例编辑-->
    <el-drawer title="用例详情" :visible.sync="dialogvisibleForm" :with-header="false" size="30%">
      <CaseView :case-data="caseData" @dialogStatus="handledialogstatus" />
    </el-drawer>

    <el-dialog
      title="测试报告"
      :visible.sync="dialogvisibleReport"
      width="1000px"
      class="create-case-dialog"
      @close="handleClose"
    >
      <SimpleCase :apicase="recordCase" />
    </el-dialog>
  </div>
</template>

<script>
import { variableList } from '../../api/variable'
import { caseList, caseSetAdd, caseInfo, simplecaseRun } from '../../api/case'
import Sortable from 'sortablejs'
import CaseView from '../../components/CaseVIew/index'
import SimpleCase from '../../components/SimpleCase/index'

export default {
  name: 'create',
  components: { CaseView, SimpleCase },
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
        ],
        caseList: [
          {
            id: undefined,
            case: null,
            extractValue: null,
            isGloble: false
          }
        ]
      },
      caseListData: null,

      dialogvisibleForm: false,
      dialogvisibleReport: false,

      // 测试接口
      recordCase: null,
      caseData: null
    }
  },
  created () {
    this.getCaseListData()
    this.getVariableList()
  },

  mounted () {
    this.tableDrag()
  },
  methods: {

    // 测试集新增
    handleCreated () {
      caseSetAdd(this.caseSetData).then(res => {
        this.$message({
          message: '请求成功',
          type: 'success'
        })
      })
    },

    // 获取用例列表
    getCaseListData () {
      caseList({ page: 1, size: 1258546 }).then(res => {
        this.caseListData = res.data.results
      })
    },

    // 编辑用例
    handleUpdateCase (id) {
      caseInfo(id).then(res => {
        this.caseData = res.data
        this.dialogvisibleForm = true
      })
    },

    // 用例在线测试
    handleCaseTest (id) {
      simplecaseRun({ caseId: id }).then(res => {
        if (res.code === 20000) {
          this.dialogvisibleReport = true
          this.recordCase = res.data
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
      })
    },

    // 测试报告关闭回调
    handleClose () {
      this.recordCase = ''
    },

    handledialogstatus (data) {
      this.dialogvisibleForm = data
    },

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

    addlineCase (data) {
      data.push({
        id: undefined,
        case: null,
        extractValue: null,
        isGloble: false
      })
    },

    // 获取全局变量列表
    getVariableList (val) {
      if (this.caseSetData.isAllHeaders) {
        variableList({ page: 1, size: 2147483647 }).then(res => {
          this.variablilist = res.data.results
        })
      }
    },

    // el-table拖拽
    tableDrag () {
      const el = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.created(el, {
        onEnd ({ newIndex, oldIndex }) {
          const currRow = _this.caseSetData.caseList.splice(oldIndex, 1)[0]
          _this.caseSetData.caseList.splice(newIndex, 0, currRow)
        }
      })
    },

    handleMoveUp (index, row) {
      var that = this
      if (index > 0) {
        // 获取当前点击的上一条数据
        const upDate = that.caseSetData.caseList[index - 1]
        // 移除上一条数据
        that.caseSetData.caseList.splice(index - 1, 1)
        // 把上一条数据插入当前点击的位置
        that.newProcessRouteDtos.splice(index, 0, upDate)
      }
    },
    // 下移
    handleMoveDown (index, row) {
      var that = this
      const downDate = that.caseSetData.caseList[index + 1]
      that.caseSetData.caseList.splice(index + 1, 1)
      that.caseSetData.caseList.splice(index, 0, downDate)
    }
  }
}
</script>

<style scoped>
.elselect {
  width: 100%;
}
</style>
