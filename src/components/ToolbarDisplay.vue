<template>
    <div class="display-toolbar">
        <div class="title-search-container">
            <!-- <h2 id="title-header">My Weather</h2> -->
            <img class="title-img" src="../assets/sun.png"/>
            <br/>
            <br/>
            <form name="search-form" @submit="test()" onsubmit="return false">
                <SearchBar/>
                <br/>
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>

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
            
        },
    }
</script>

<style scoped>
    .title-img {
        height: 50px;
        width: 50px;
    }

    .display-toolbar {
        background-image: url('../assets/toolbar-bg.gif') ;
        background-size: cover;
        text-align: center;
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
        margin: 37vh auto;
    }
</style>