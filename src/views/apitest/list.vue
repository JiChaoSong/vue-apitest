<template>
  <div class>
    <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" type="border-card">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
        <div class="filter-container" v-if="item.name === '1'">
          <el-form inline :model="listQuery">
            <el-form-item label="接口名称" prop="apiName">
              <el-input v-model="listQuery.apiNames" size="small" />
            </el-form-item>
            <el-form-item label="接口地址" prop="apiPath">
              <el-input v-model="listQuery.apiPaths" size="small" />
            </el-form-item>
            <el-form-item label="请求方法" prop="apiMethod">
              <el-select v-model="listQuery.apiMethods" size="small">
                <el-option
                  v-for="item in Methods"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="fetchData" size="small">查询</el-button>
              <el-button @click="resetListQuery" size="small">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="operation-container" v-if="item.name === '1'">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="addTab(editableTabsValue)"
          >新增</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="handleImport">导入</el-button>
        </div>
        <Apilist
          v-if="item.name === '1'"
          :list="list"
          :total="total"
          :list-loading="listLoading"
          :list-query="listQuery"
          :fetch-data="fetchData"
          :add-tab="editTab"
          @getdata="getapirequest"
        />
        <Apiadd v-else :apirequest="apirequest" :dialogtitle="dialogtitle" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="导入接口" :visible.sync="dialogvisibleImport" width="800px">
      <el-form ref="apiImport" :model="apiImport" :rules="apiImportRule" label-width="120px">
        <el-form-item label="接口文档地址" prop="url">
          <el-input v-model="apiImport.url" style="width: 80%" />
        </el-form-item>
        <el-form-item label="所属项目" prop="project">
          <el-input v-model="apiImport.project" style="width: 80%" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importApiInfo">提交</el-button>
          <el-button @click="hanlecancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Apilist from './components/apilist'
import Apiadd from './components/apiadd'
import { apiinfoImport, apiinfoList } from '../../api/apiinfo'
import { getProjectName } from '../../utils/auth'
export default {
  name: 'apitest',
  components: { Apiadd, Apilist },
  data () {
    return {
      editableTabsValue: '1',
      dialogvisibleImport: false,

      listQuery: {
        page: 1,
        size: 10,
        apiNames: null,
        apiPaths: null,
        apiMethods: null
      },

      list: null,
      total: 0,
      listLoading: true,

      Methods: this.allEnums.requestMethod,

      editableTabs: [{
        title: '接口列表',
        name: '1',
        closable: false
      }],
      tabIndex: 1,
      apiImport: {
        url: '',
        project: getProjectName()
      },
      apiImportRule: {
        url: [
          { required: true, message: '请输入接口文档地址', trigger: 'blur' }
        ]
      },
      apirequest: {
        apiName: '',
        apiParams: [
          {
            type: 103,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiHeaders: [
          {
            type: 103,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiBody: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiAssert: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        regular: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiMethod: 'GET',
        apiPath: '',
        apiHost: ''
      },

      dialogtitle: '',

      titleMap: {
        create: '新增接口',
        update: '编辑接口'
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      apiinfoList(this.listQuery).then(res => {
        this.list = res.data.results
        this.total = res.data.count
        this.listLoading = false
      })
    },

    addTab (targetName) {
      const newTabName = ++this.tabIndex + ''
      this.dialogtitle = 'created'
      this.editableTabs.push({
        title: '新增接口',
        name: newTabName,
        closable: true,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },

    editTab (targetName, row) {
      const newTabName = ++this.tabIndex + ''
      this.dialogtitle = 'updated'
      this.editableTabs.push({
        title: row.apiName,
        name: newTabName,
        closable: true,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },

    resetapiImport () {
      this.apiImport = {
        url: '',
        project: getProjectName()
      }
    },

    handleImport () {
      this.resetapiImport()
      this.dialogvisibleImport = true
      this.$nextTick(() => {
        this.$refs.apiImport.clearValidate()
      })
    },

    importApiInfo () {
      this.$refs.apiImport.validate((valid) => {
        if (valid) { }
        apiinfoImport(this.apiImport).then(res => {
          this.dialogvisibleImport = false
          this.$notify({
            title: '成功',
            message: '导入成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },

    hanlecancel () {
      this.resetapiImport()
      this.dialogvisibleImport = false
    },

    resetListQuery () {
      this.listQuery = {
        page: 1,
        size: 10,
        apiNames: null,
        apiPaths: null,
        apiMethods: null
      }
      this.fetchData()
    },

    resetApiResquest () {
      this.apirequest = {
        apiName: '',
        apiParams: [
          {
            type: 103,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiHeaders: [
          {
            type: 103,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiBody: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiAssert: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        regular: [
          {
            type: 101,
            key: '',
            value: '',
            desc: ''
          }
        ],
        apiMethod: 'GET',
        apiPath: '',
        apiHost: ''

      }
    },

    removeTab (targetName) {
      const tabs = this.editableTabs
      this.resetApiResquest()
      this.resetListQuery()
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      location.reload()
    },

    getapirequest (data) {
      this.apirequest = data
    }
  }
}
</script>

<style scoped>
.apitest-container {
  width: 100%;
  padding: 20px;
}
.el-tabs {
  border-radius: 5px !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}
.filter-container {
  padding: 0 20px 0 20px;
}
.operation-container {
  padding: 0 20px 0 20px;
}
</style>
