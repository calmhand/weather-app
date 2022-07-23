<template>
    <div>
        <input id="search-bar" 
        type="text" placeholder="Enter Location" 
        inputmode="search"
        @click="pauseAnimation()"
        @blur="animatePlaceholder()"
        required/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cities: [
                    "London", "New York", "Los Angeles",
                    "Paris", "Phoenix", "Atlanta",
                    "Berlin", "Barcelona", "Rome",
                    "Chicago", "Shanghai", "Seoul",
                    "Tokyo", "Sydney", "Dallas",
                    "San Francisco", "Las Vegas", "Philadelphia"
                ],
                placeHolderCounter: 0,
                placeHolderAnimate: null,
            }
        },
        methods: {
            pauseAnimation() {
                clearInterval(this.placeHolderAnimate)
                document.getElementById('search-bar').placeholder = ""
                document.getElementById('search-bar').inputMode = "search"
            },
            getNextCity() {
                if (this.placeHolderCounter != 17) {
                    this.placeHolderCounter++
                    return this.cities[(this.placeHolderCounter)]
                } else {
                    this.placeHolderCounter = 0
                    return this.cities[(this.placeHolderCounter)]
                }
            },
             async animatePlaceholder() {
                document.getElementById('search-bar').inputMode = "none"
                if (document.getElementById('search-bar').placeholder == "") {
                    document.getElementById('search-bar').placeholder = "Enter Location"
                } else {
                    this.placeHolderAnimate = setInterval(() => {
                        document.getElementById('search-bar').placeholder = this.getNextCity()
                    }, 3000)
                }

            }
        },
        mounted() {
            this.animatePlaceholder()
        },
        unmounted() {
            clearInterval(this.placeHolderAnimate)
        }
    }
</script>

<style scoped>
    #search-bar {
        height: 25px;
        width: 250px;
        margin: 15px 0px 20px 0px;
        border: 1px solid grey;
        border-radius: 25px;
        outline: none;
        text-align: center;
    }

    #search-bar::placeholder {
        font-style: italic;
        opacity: 0.7;
        
    }
</style>