<template>
    <div id="display-toolbar">
        <div class="title-search-container">
            <img class="title-img" src="../assets/sun.png"/>
            <form name="search-form" @submit="submitCity()" onsubmit="return false">
                <SearchBar/>
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
                scroll(0,0)
                return document.getElementById('search-bar').value
            },
            submitCity() {
                document.getElementById('search-bar').inputMode = "none"
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
        transition: background-image 2s ease-in-out;
        background-image: url('../assets/toolbar-bg.gif') ;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-left: 1px solid white;
        text-align: center;
        overflow: hidden;
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

    @media (min-width: 320px) and (max-width: 480px) {
        .title-search-container {
            margin: 35px 0 10px 0;
        }

        #display-toolbar {
            position: absolute;
            top: 60%;
            bottom: 0;
            left: 0;
            right: 0;
            overflow-x: hidden;
            border: none;
            border-top: 1px solid white;
            height: 100%;
            min-height: 900px;
        }
    }
</style>