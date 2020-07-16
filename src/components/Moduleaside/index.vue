<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
      <el-button slot="append" icon="el-icon-plus"/>
    </el-input>
    <el-tree
      :data="data"
      node-key="id"
      icon-class="el-icon-folder-opened"
      :expand-on-click-node="false"
      :render-content="renderContent"
      @mouseover="mouseenter"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="buttonstatus"
        >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="() => append(data)">
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            style="color: #f95359"
            circle
            @click="() => remove(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'index',
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          children: [{
            id: 11,
            label: '三级 3-2-1'
          }, {
            id: 12,
            label: '三级 3-2-2'
          }, {
            id: 13,
            label: '三级 3-2-3'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      buttonstatus: false
    }
  },
  methods: {
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    mouseenter () {
      this.buttonstatus = true
    },
    mouseleave () {
      this.buttonstatus = false
    }
  }
}
</script>

<style scoped>
  .el-tree{
    margin-top: 10px;
    font-size: 20px !important;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    /*padding-right: 8px;*/
  }
  .el-button{
    margin-left: 0;
  }
</style>
