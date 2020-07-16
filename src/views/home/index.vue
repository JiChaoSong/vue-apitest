<template>
  <div class="home-container">
    <h1>首页</h1>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {

      listQuery: {
        page: 1,
        size: 2147483647
      },
      list: null,
      listLoading: true
    }
  }
}
</script>

<style scoped>

</style>
