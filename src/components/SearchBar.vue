<template>
    <div>
        <input id="search-bar" 
        type="text" placeholder="Enter Location" 
        @click="pauseAnimation()" 
        @blur="animatePlaceholder()"
        required/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                placeHolderLocations: [
                    "London", "New York", "Los Angeles",
                    "Paris", "Phoenix", "Atlanta",
                    "Berlin", "Barcelona", "Rome",
                    "Chicago", "Shanghai", "Seoul",
                    "Tokyo", "Sydney", "Dallas",
                    "San Francisco", "Las Vegas", "Philadelphia"
                ],
                placeHolderCounter: 0,
                placeHolderAnimate: '',
            }
        },
        methods: {
            pauseAnimation() {
                clearInterval(this.placeHolderAnimate)
                document.getElementById('search-bar').placeholder = ""
            },
            getNextCity() {
                if (this.placeHolderCounter != 17) {
                    this.placeHolderCounter++
                    return this.placeHolderLocations[(this.placeHolderCounter)]
                } else {
                    this.placeHolderCounter = 0
                    return this.placeHolderLocations[(this.placeHolderCounter)]
                }
            },
             async animatePlaceholder() {
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
        width: 300px;
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