<template>
    <div class="weather-info">
        <h2>{{name}}</h2>
        <h4>{{num_value}}</h4>
        <h4>{{str_value}}</h4>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            num_value: Number,
            str_value: String,
        }
    }
</script>

<style>
    .weather-info {
        color: beige;
        text-align: center;
        margin: auto;
    }
</style>