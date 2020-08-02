<template>
  <section class="app-main">
    <div class="pagetitle" v-if="title !== '首页'">
      <span>{{title}}</span>
    </div>
    <router-view />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      console.log(this.$route.fullPath)
      return this.$route.fullPath
    },
    title () {
      return this.$route.meta.title
    }
  }
}
</script>

<style scoped>
.app-main {
  height: 100%;
  /*line-height: 100%;*/
  width: 100%;
  /*padding: 0 10% 0 10%;*/
  background-color: #f2f6fc;
}
.pagetitle {
  background-color: white;
  padding: 10px 10px 10px 20px;
  margin-bottom: 20px;
  /*border-radius: 5px;*/
  border-left: 4px solid #1890ff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
