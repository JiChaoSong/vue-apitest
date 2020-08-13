<template>
  <div class="right-menu">
    <el-row>
      <el-dropdown>
        <div class="avtor">
          <span class="title-name">你好, {{name}}</span>
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1"
            class="user-avtor"
          />
          <i class="el-icon-arrow-down el-icon--right right-icon"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
import { getName } from '../../../utils/user'

export default {
  name: 'info',
  data () {
    return {
    }
  },
  computed: {
    name () {
      return getName()
    }
  },
  created () {
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avtor {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  border-radius: 10px;
}
.right-icon {
  vertical-align: -10px;
}
.title-name {
  color: white;
  padding-right: 10px;
}
</style>
