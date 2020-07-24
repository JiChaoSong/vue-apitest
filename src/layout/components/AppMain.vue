<template>
  <section class="app-main">
    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      console.log(this.$route.fullPath)
      return this.$route.fullPath
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
    background-color: #F2F6FC;
  }

</style>
