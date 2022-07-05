<template>
    <div class="weather-info">
        <h2 class="info-title">{{name}}</h2>
        <h4 class="info-styles">{{num_value}}{{unit_value}}</h4>
        <h4 v-if="num_value==null" class="info-styles">{{str_value}}{{unit_value}}</h4>
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            num_value: Number,
            str_value: String,
            unit_value: String
        },
        methods: {

        },
    }
</script>

<style>
    .weather-info{
        color: beige;
        text-align: center;
        margin: auto;
    }

    .info-title {
        font-size: 20px;
    }

    .info-styles {
        font-size: 15px;
    }
</style>