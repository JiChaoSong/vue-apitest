<template>
  <div class="app-container>">
    <div>
      <navbar />
    </div>
    <app-main />
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>

</style>
