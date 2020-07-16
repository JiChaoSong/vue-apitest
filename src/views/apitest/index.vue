<template>
  <el-tabs v-model="editableTabsValue"  @tab-remove="removeTab" type=border-card>
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="item.closable"
    >
      <div class="operation-container" v-if="item.name === '1'">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addTab(editableTabsValue)">
          新增
        </el-button>
        <el-button type="primary" icon="el-icon-plus" size="small">
          导入
        </el-button>
      </div>
      <Apilist v-if="item.name === '1'"/>
      <Apiadd v-else/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Apilist from './components/apilist'
import Apiadd from './components/apiadd'
export default {
  name: 'apitest',
  components: { Apiadd, Apilist },
  data () {
    return {
      editableTabsValue: '1',
      editableTabs: [{
        title: '接口列表',
        name: '1',
        closable: false
      }],
      tabIndex: 1
    }
  },
  methods: {
    addTab (targetName) {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: '新增接口',
        name: newTabName,
        closable: true,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    removeTab (targetName) {
      const tabs = this.editableTabs
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
    }
  }
}
</script>

<style scoped>
  .testcase-container {
    padding: 20px;
    background-color: white ;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .el-tabs {
    border-radius: 5px !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
</style>
