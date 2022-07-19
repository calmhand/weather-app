<template>
    <div id="display-toolbar">
        <div class="title-search-container">
            <img class="title-img" src="../assets/sun.png"/>
            <br/>
            <br/>
            <form name="search-form" @submit="submitCity()" onsubmit="return false">
                <SearchBar/>
                <br/>
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
        <div id="api-usage">Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></div>
        <Footer />
    </div>
</template>

<script>
    import SearchBar from './SearchBar.vue'
    import Footer from './AppFooter.vue'

    export default {
        data() {
            return {

            }
        },
        components: {
            SearchBar,
            Footer
        },
        methods: {
            getCity() {
                return document.getElementById('search-bar').value
            },
            submitCity() {
                // console.log(this.getCity());
                this.$emit('getLocation', this.getCity())
            },
        },
        emits: ['getLocation']
    }
</script>

<style scoped>
    .title-img {
        height: 50px;
        width: 50px;
    }

    #display-toolbar {
        background-image: url('../assets/toolbar-bg.gif') ;
        background-size: cover;
        text-align: center;
        opacity: 1;
    }

    #display-toolbar::before {
        transition: opacity 1 1s;
    }

    .btn {
        width: 100px;
        background-color: whitesmoke;
        border: none;
        text-align: center;
        color: black;
    }

    .btn:hover {
        background-color: lightgray;
        opacity: 70%;
        color: black;
    }

    #title-header {
        color: white;
        margin: 0;
    }

    .title-search-container {
        margin: 35vh auto;
    }

    #api-usage {
        color: beige;
    }
</style>