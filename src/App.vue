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
  overflow: hidden;
  box-sizing: border-box;
}

</style>
