<template>
  <Display />
</template>

<script>
import Display from './components/WeatherDisplay.vue'

export default {
  name: 'App',
  components: {
    Display,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

</style>
