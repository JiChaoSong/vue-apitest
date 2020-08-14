<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>

export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },

  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  background-color: #f2f6fc;
  min-width: 1340px;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
