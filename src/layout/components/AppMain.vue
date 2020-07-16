<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
  .app-main {
    margin-top: 15px;
    width: 100%;
    padding: 0 10% 0 10%;
  }

</style>
