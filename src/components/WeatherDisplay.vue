<template>
    <div class="display-container">
        <div class="display-weather"></div>
        <Toolbar />
    </div>
</template>

<script>
    import Toolbar from './ToolbarDisplay.vue'

    export default {
        data() {
            return {
                API_URL: "https://api.weatherapi.com/v1/current.json?key=eba659c2c78e47aa8c0182048222106&q=",
                toggleTemp: false // false - farenheit; true - celcius
            }
        },
        components: {
            Toolbar,
        },
        methods: {
            fetchWeather() {
                fetch(this.API_URL)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    document.getElementById("json-show").innerHTML = data
                })
            }
        },
    }
</script>

<style scoped>
    .display-container {
        display: grid;
        height: 100vh;
        grid-template-columns: 70% 30%;
        column-gap: 1px;
        overflow: hidden;
    }

    .display-weather {
        /* display: grid; */
        background-color: black;
    }

</style>