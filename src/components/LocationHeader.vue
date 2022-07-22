<template>
    <div class="place-text">
        <h2>{{place}}</h2>
        <h6>{{region}}</h6>
        <h6>{{country}}</h6>
    </div>
</template>

<script>
    export default {
        props: {
            place: String,
            country: String,
            region: String,
        },
    }
</script>

<style scoped>
    .place-text {
        text-align: center;
        margin: auto;
        grid-column: 1/3;
    }
</style>